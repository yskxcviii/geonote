/**
 * GeoNote アプリケーションの型定義ルート
 * GeoNote.Layer.GeoJsonLayer / GeoNote.Map.UseGoogleMapOptions のように参照する
 */

import type * as LayerTypes from './layer'
import type * as MapTypes from './map'

/** レイヤー・グループ関連の型群 */
export interface GeoNoteLayer {
  GeoJsonLayer: LayerTypes.GeoJsonLayer
  LayerGroup: LayerTypes.LayerGroup
  CachedLayer: LayerTypes.CachedLayer
}

/** 地図・マップ関連の型群 */
export interface GeoNoteMap {
  UseGoogleMapOptions: MapTypes.UseGoogleMapOptions
  UseGoogleMapResult: MapTypes.UseGoogleMapResult
}

/** ルート名前空間 ( GeoNote.Layer.* / GeoNote.Map.* で参照 ) */
export interface GeoNote {
  Layer: GeoNoteLayer
  Map: GeoNoteMap
}

// 従来の import 用に個別 re-export ( 必要に応じて削除可能 )
export type { GeoJsonLayer, LayerGroup, CachedLayer } from './layer'
export type { UseGoogleMapOptions, UseGoogleMapResult } from './map'
