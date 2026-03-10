/**
 * 地図関連の型定義
 */

import type { RefObject } from 'react'

/** useGoogleMap フックのオプション */
export type UseGoogleMapOptions = {
  /** ダークモードの場合は true */
  darkMode?: boolean
  /** 初期の中心座標 ( 緯度, 経度 ) */
  center?: { lat: number; lng: number }
  /** 初期ズームレベル ( 0–22 ) */
  zoom?: number
}

/** useGoogleMap フックの戻り値 */
export type UseGoogleMapResult = {
  /** マップのコンテナに渡す ref */
  mapRef: RefObject<HTMLDivElement | null>
  /** マップインスタンス ( 読み込み完了後のみ存在 ) */
  map: google.maps.Map | null
  /** スクリプト読み込み・マップ初期化中 */
  isLoading: boolean
  /** スクリプト読み込みまたはマップ初期化のエラー */
  error: Error | null
}
