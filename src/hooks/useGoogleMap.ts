import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { UseGoogleMapOptions, UseGoogleMapResult } from '../types/map'

const GOOGLE_MAPS_SCRIPT_BASE = 'https://maps.googleapis.com/maps/api/js'

/** プレーン地図用スタイル ( geonote-proto を参考 ) */
const PLAIN_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f0f0f0' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#d4e4f1' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#e0e0e0' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
]

/** ダークモード時のプレーン地図用スタイル ( PLAIN_MAP_STYLES のダーク版 ) */
const PLAIN_DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#2f3542' }],
  },
]

export type { UseGoogleMapOptions, UseGoogleMapResult } from '../types/map'

/**
 * Google Maps API のスクリプト読み込み・マップ生成・ダーク/ライト切替を行うフック。
 * ビジネスロジックを集約する。
 */
export function useGoogleMap(options: UseGoogleMapOptions = {}): UseGoogleMapResult {
  const { darkMode = false, center = { lat: 35.6812, lng: 139.7671 }, zoom = 10 } = options
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [containerReady, setContainerReady] = useState(false)

  // コンポーネントマウント後、ref が付与されたタイミングで初期化可能にする
  useLayoutEffect(() => {
    if (mapRef.current && !containerReady) {
      setContainerReady(true)
    }
  }, [containerReady])

  // スクリプトの読み込みとマップの初回作成 ( container が利用可能になってから )
  useEffect(() => {
    if (!containerReady) return

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
    if (!apiKey) {
      setError(new Error('VITE_GOOGLE_MAPS_API_KEY が設定されていません。.env を確認してください。'))
      setIsLoading(false)
      return
    }

    const container = mapRef.current
    if (!container) {
      setIsLoading(false)
      return
    }

    const applyStyle = (map: google.maps.Map, isDark: boolean) => {
      map.setOptions({
        styles: isDark ? PLAIN_DARK_MAP_STYLES : PLAIN_MAP_STYLES,
      })
    }

    const initMap = () => {
      if (!window.google?.maps?.Map || !container) return
      try {
        const map = new google.maps.Map(container, {
          center: { lat: center.lat, lng: center.lng },
          zoom,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: true,
        })
        applyStyle(map, darkMode)
        mapInstanceRef.current = map
        setMap(map)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e : new Error('マップの初期化に失敗しました。'))
      } finally {
        setIsLoading(false)
      }
    }

    if (window.google?.maps?.Map) {
      initMap()
      return
    }

    const existing = document.querySelector(`script[src^="${GOOGLE_MAPS_SCRIPT_BASE}"]`)
    if (existing) {
      const checkReady = () => {
        if (window.google?.maps?.Map) {
          initMap()
        } else {
          requestAnimationFrame(checkReady)
        }
      }
      checkReady()
      return
    }

    const script = document.createElement('script')
    script.src = `${GOOGLE_MAPS_SCRIPT_BASE}?key=${encodeURIComponent(apiKey)}&callback=Function.prototype`
    script.async = true
    script.defer = true
    script.onload = () => {
      script.onload = null
      script.onerror = null
      initMap()
    }
    script.onerror = () => {
      setError(new Error('Google Maps スクリプトの読み込みに失敗しました。'))
      setIsLoading(false)
    }
    document.head.appendChild(script)

    return () => {
      script.onload = null
      script.onerror = null
      if (script.parentNode) script.parentNode.removeChild(script)
      mapInstanceRef.current = null
      setMap(null)
    }
    // 初回マウント時のみ実行したいため center/zoom/darkMode は依存に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerReady])

  // darkMode 変更時にスタイルのみ更新
  useEffect(() => {
    const map = mapInstanceRef.current
    if (map) {
      map.setOptions({ styles: darkMode ? PLAIN_DARK_MAP_STYLES : PLAIN_MAP_STYLES })
    }
  }, [darkMode])

  return {
    mapRef,
    map,
    isLoading,
    error,
  }
}
