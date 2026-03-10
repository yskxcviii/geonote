import { useGoogleMap } from '../hooks/useGoogleMap'
import { useMapLayers } from '../hooks/useMapLayers'
import type { GeoJsonLayer, LayerGroup } from '../types/layer'

export type GoogleMapProps = {
  /** ダークモードの場合は true、ライトモードの場合は false */
  darkMode?: boolean
  /** マップの幅 ( CSS で指定、省略時は 100% ) */
  width?: string | number
  /** マップの高さ ( CSS で指定、省略時は 100% ) */
  height?: string | number
  /** 読み込み中に表示する要素 ( 省略時は「読み込み中…」テキスト ) */
  loadingFallback?: React.ReactNode
  /** エラー時に表示する要素 ( 省略時はエラーメッセージ ) */
  errorFallback?: (error: Error) => React.ReactNode
  /** 表示する GeoJSON レイヤーの配列 */
  layers?: GeoJsonLayer[]
  /** レイヤーグループの配列 */
  groups?: LayerGroup[]
  /** レイヤー ID から GeoJSON データを取得する関数 */
  getGeoJsonData?: (id: string) => object | undefined
}

const emptyLayers: GeoJsonLayer[] = []
const emptyGroups: LayerGroup[] = []
const noopGetGeoJson = () => undefined

/**
 * Google マップを表示するコンポーネント。
 * UI に関するロジックのみを持ち、マップの初期化・スタイルは useGoogleMap に委譲する。
 * GeoJSON レイヤーの描画は useMapLayers に委譲する。
 */
export function GoogleMap({
  darkMode = false,
  width = '100%',
  height = '100%',
  loadingFallback = '読み込み中…',
  errorFallback,
  layers = emptyLayers,
  groups = emptyGroups,
  getGeoJsonData = noopGetGeoJson,
}: GoogleMapProps) {
  const { mapRef, map, isLoading, error } = useGoogleMap({ darkMode })
  useMapLayers(map, layers, groups, getGeoJsonData)

  const sizeStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  if (error) {
    return (
      <div style={{ ...sizeStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {errorFallback ? errorFallback(error) : <span>{error.message}</span>}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', ...sizeStyle }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: 200 }} aria-label="地図" />
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--surface-100)',
          }}
        >
          {loadingFallback}
        </div>
      )}
    </div>
  )
}
