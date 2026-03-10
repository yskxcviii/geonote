import { useCallback, useEffect, useRef, useState } from 'react'
import type { GeoJsonLayer, LayerGroup } from '../types/layer'
import { cachePut, cacheDelete, cacheGetAll, cacheClearAll } from '../services/geojsonCache'

const LAYER_COLORS = [
  '#4285F4',
  '#EA4335',
  '#34A853',
  '#FBBC04',
  '#FF6D01',
  '#46BDC6',
  '#7B1FA2',
  '#C2185B',
  '#00897B',
  '#5C6BC0',
  '#F4511E',
  '#039BE5',
]

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error(`ファイルの読み込みに失敗しました: ${file.name}`))
    reader.readAsText(file)
  })
}

function countFeatures(geojson: unknown): number {
  const obj = geojson as { type?: string; features?: unknown[] }
  if (obj?.type === 'FeatureCollection' && Array.isArray(obj.features)) {
    return obj.features.length
  }
  if (obj?.type === 'Feature') return 1
  return 0
}

function deriveGroupName(fileNames: string[]): string {
  const names = fileNames.map((n) => n.replace(/\.[^.]+$/, ''))
  let prefix = names[0]
  for (let i = 1; i < names.length; i++) {
    while (!names[i].startsWith(prefix) && prefix.length > 0) {
      prefix = prefix.slice(0, -1)
    }
  }
  prefix = prefix.replace(/[-_ ]+$/, '')
  if (prefix.length > 2) return prefix
  return `${fileNames.length} ファイル`
}

export function useLayers() {
  const [layers, setLayers] = useState<GeoJsonLayer[]>([])
  const [groups, setGroups] = useState<LayerGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const geojsonStore = useRef(new Map<string, object>())
  const colorIndexRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const cached = await cacheGetAll()
        if (cancelled) return

        cached.sort((a, b) => a.cachedAt - b.cachedAt)
        const restoredLayers: GeoJsonLayer[] = []
        const restoredGroups = new Map<string, LayerGroup>()

        for (const record of cached) {
          try {
            const parsed = JSON.parse(record.geojsonText) as object
            geojsonStore.current.set(record.id, parsed)

            const groupId = record.groupId ?? null
            if (groupId && record.groupName && !restoredGroups.has(groupId)) {
              restoredGroups.set(groupId, {
                id: groupId,
                name: record.groupName,
                visible: true,
                expanded: true,
              })
            }

            restoredLayers.push({
              id: record.id,
              name: record.name,
              visible: true,
              color: LAYER_COLORS[colorIndexRef.current % LAYER_COLORS.length],
              featureCount: countFeatures(parsed),
              groupId,
            })
            colorIndexRef.current++
          } catch {
            console.warn(`キャッシュのパースに失敗: ${record.name}`)
          }
        }

        if (!cancelled) {
          setLayers(restoredLayers)
          setGroups(Array.from(restoredGroups.values()))
        }
      } catch (e) {
        console.warn('キャッシュの読み込みに失敗:', e)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const addLayersFromFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files)
    const useGroup = fileArray.length > 1
    const groupId = useGroup ? crypto.randomUUID() : null
    const groupName = useGroup ? deriveGroupName(fileArray.map((f) => f.name)) : null

    const newLayers: GeoJsonLayer[] = []

    for (const file of fileArray) {
      try {
        const text = await readFileAsText(file)
        const parsed = JSON.parse(text) as object
        const id = crypto.randomUUID()
        const color = LAYER_COLORS[colorIndexRef.current % LAYER_COLORS.length]
        colorIndexRef.current++

        geojsonStore.current.set(id, parsed)

        newLayers.push({
          id,
          name: file.name,
          visible: true,
          color,
          featureCount: countFeatures(parsed),
          groupId,
        })

        cachePut({
          id,
          name: file.name,
          geojsonText: text,
          cachedAt: Date.now(),
          groupId,
          groupName,
        }).catch(console.error)
      } catch (e) {
        console.error(`インポートに失敗 (${file.name}):`, e)
      }
    }

    if (newLayers.length > 0) {
      setLayers((prev) => [...prev, ...newLayers])
      if (groupId && groupName) {
        setGroups((prev) => [...prev, { id: groupId, name: groupName, visible: true, expanded: true }])
      }
    }
  }, [])

  const removeLayer = useCallback((id: string) => {
    setLayers((prev) => {
      const target = prev.find((l) => l.id === id)
      const next = prev.filter((l) => l.id !== id)
      if (target?.groupId) {
        const remaining = next.filter((l) => l.groupId === target.groupId)
        if (remaining.length === 0) {
          setGroups((g) => g.filter((grp) => grp.id !== target.groupId))
        }
      }
      return next
    })
    geojsonStore.current.delete(id)
    cacheDelete(id).catch(console.error)
  }, [])

  const removeGroup = useCallback((groupId: string) => {
    setLayers((prev) => {
      const removed = prev.filter((l) => l.groupId === groupId)
      for (const layer of removed) {
        geojsonStore.current.delete(layer.id)
        cacheDelete(layer.id).catch(console.error)
      }
      return prev.filter((l) => l.groupId !== groupId)
    })
    setGroups((prev) => prev.filter((g) => g.id !== groupId))
  }, [])

  const toggleLayerVisibility = useCallback((id: string) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)))
  }, [])

  const toggleGroupVisibility = useCallback((groupId: string) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, visible: !g.visible } : g)))
  }, [])

  const toggleGroupExpanded = useCallback((groupId: string) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, expanded: !g.expanded } : g)))
  }, [])

  const setLayerColor = useCallback((id: string, color: string) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, color } : l)))
  }, [])

  const removeAllLayers = useCallback(() => {
    setLayers([])
    setGroups([])
    geojsonStore.current.clear()
    colorIndexRef.current = 0
    cacheClearAll().catch(console.error)
  }, [])

  const getGeoJsonData = useCallback((id: string): object | undefined => {
    return geojsonStore.current.get(id)
  }, [])

  return {
    layers,
    groups,
    isLoading,
    addLayersFromFiles,
    removeLayer,
    removeGroup,
    toggleLayerVisibility,
    toggleGroupVisibility,
    toggleGroupExpanded,
    setLayerColor,
    removeAllLayers,
    getGeoJsonData,
  }
}
