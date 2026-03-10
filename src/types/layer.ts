export interface GeoJsonLayer {
  id: string
  name: string
  visible: boolean
  color: string
  featureCount: number
  groupId: string | null
}

export interface LayerGroup {
  id: string
  name: string
  visible: boolean
  expanded: boolean
}

export interface CachedLayer {
  id: string
  name: string
  geojsonText: string
  cachedAt: number
  groupId: string | null
  groupName: string | null
}
