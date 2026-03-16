declare namespace GeoNote {
  /** コンポーネントスタイル定義 */
  type ComponentStyles<Name extends string> = Record<Name, import('react').CSSProperties>
  /** コンポーネントパススルー定義 (PrimeReactコンポーネント向け) */
  type ComponentPt<T extends { name: string; component: keyof import('primereact/api').PrimeReactPTOptions }> = {
    [K in T as K['name']]: import('primereact/api').PrimeReactPTOptions[K['component']]
  }
}
