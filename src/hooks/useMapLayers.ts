import { useEffect, useRef } from 'react'
import type { GeoJsonLayer, LayerGroup } from '../types/layer'

export function useMapLayers(
  map: google.maps.Map | null,
  layers: GeoJsonLayer[],
  groups: LayerGroup[],
  getGeoJsonData: (id: string) => object | undefined
) {
  const dataLayersRef = useRef(new Map<string, google.maps.Data>())

  useEffect(() => {
    if (!map) return

    const groupMap = new Map(groups.map((g) => [g.id, g]))
    const currentIds = new Set(layers.map((l) => l.id))

    for (const [id, dataLayer] of dataLayersRef.current) {
      if (!currentIds.has(id)) {
        dataLayer.setMap(null)
        dataLayersRef.current.delete(id)
      }
    }

    for (const layer of layers) {
      let dataLayer = dataLayersRef.current.get(layer.id)

      if (!dataLayer) {
        const geojson = getGeoJsonData(layer.id)
        if (!geojson) continue

        dataLayer = new google.maps.Data()
        try {
          dataLayer.addGeoJson(geojson)
        } catch (e) {
          console.error(`GeoJSON の追加に失敗 (${layer.name}):`, e)
          continue
        }
        dataLayer.setMap(map)
        dataLayersRef.current.set(layer.id, dataLayer)
      }

      const groupVisible = layer.groupId ? (groupMap.get(layer.groupId)?.visible ?? true) : true
      const effectiveVisible = layer.visible && groupVisible
      const { color } = layer

      dataLayer.setStyle((feature) => {
        if (!effectiveVisible) return { visible: false }

        const geomType = feature.getGeometry()?.getType()

        if (geomType === 'Point' || geomType === 'MultiPoint') {
          return {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: 0.8,
              strokeColor: color,
              strokeWeight: 1,
              scale: 6,
            },
          }
        }

        const hasFill = geomType === 'Polygon' || geomType === 'MultiPolygon'
        return {
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          ...(hasFill ? { fillColor: color, fillOpacity: 0.3 } : {}),
        }
      })
    }
  }, [map, layers, groups, getGeoJsonData])

  useEffect(() => {
    const ref = dataLayersRef.current
    return () => {
      for (const dataLayer of ref.values()) {
        dataLayer.setMap(null)
      }
      ref.clear()
    }
  }, [])
}
