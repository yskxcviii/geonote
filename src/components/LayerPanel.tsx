import { useRef } from 'react'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { ColorPicker, type ColorPickerChangeEvent } from 'primereact/colorpicker'
import type { GeoJsonLayer, LayerGroup } from '../types/layer'

export type LayerPanelProps = {
  layers: GeoJsonLayer[]
  groups: LayerGroup[]
  isLoading: boolean
  onImport: (files: FileList) => void
  onToggleVisibility: (id: string) => void
  onToggleGroupVisibility: (groupId: string) => void
  onToggleGroupExpanded: (groupId: string) => void
  onColorChange: (id: string, color: string) => void
  onRemove: (id: string) => void
  onRemoveGroup: (groupId: string) => void
  onRemoveAll: () => void
}

const layerItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
  borderRadius: '6px',
  backgroundColor: 'var(--surface-50)',
}

const layerNameStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

function LayerItem({
  layer,
  onToggleVisibility,
  onColorChange,
  onRemove,
}: {
  layer: GeoJsonLayer
  onToggleVisibility: (id: string) => void
  onColorChange: (id: string, color: string) => void
  onRemove: (id: string) => void
}) {
  const handleColor = (e: ColorPickerChangeEvent) => {
    if (e.value && typeof e.value === 'string') {
      onColorChange(layer.id, `#${e.value}`)
    }
  }

  return (
    <div style={layerItemStyle}>
      <InputSwitch checked={layer.visible} onChange={() => onToggleVisibility(layer.id)} style={{ flexShrink: 0 }} />
      <ColorPicker format="hex" value={layer.color.replace('#', '')} onChange={handleColor} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={layerNameStyle} title={layer.name}>
          {layer.name}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-color-secondary)' }}>
          {layer.featureCount.toLocaleString()} フィーチャー
        </div>
      </div>
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        size="small"
        onClick={() => onRemove(layer.id)}
        aria-label={`${layer.name} を削除`}
      />
    </div>
  )
}

function LayerGroupSection({
  group,
  layers,
  onToggleGroupVisibility,
  onToggleGroupExpanded,
  onToggleVisibility,
  onColorChange,
  onRemove,
  onRemoveGroup,
}: {
  group: LayerGroup
  layers: GeoJsonLayer[]
  onToggleGroupVisibility: (groupId: string) => void
  onToggleGroupExpanded: (groupId: string) => void
  onToggleVisibility: (id: string) => void
  onColorChange: (id: string, color: string) => void
  onRemove: (id: string) => void
  onRemoveGroup: (groupId: string) => void
}) {
  const totalFeatures = layers.reduce((sum, l) => sum + l.featureCount, 0)

  return (
    <div
      style={{
        borderRadius: '6px',
        border: '1px solid var(--surface-200)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          backgroundColor: 'var(--surface-100)',
        }}
      >
        <Button
          icon={group.expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'}
          rounded
          text
          size="small"
          onClick={() => onToggleGroupExpanded(group.id)}
          aria-label={group.expanded ? '折りたたむ' : '展開する'}
          style={{ flexShrink: 0, width: '1.75rem', height: '1.75rem' }}
        />
        <InputSwitch
          checked={group.visible}
          onChange={() => onToggleGroupVisibility(group.id)}
          style={{ flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={layerNameStyle} title={group.name}>
            {group.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-color-secondary)' }}>
            {layers.length} レイヤー / {totalFeatures.toLocaleString()} フィーチャー
          </div>
        </div>
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          size="small"
          onClick={() => onRemoveGroup(group.id)}
          aria-label={`${group.name} を削除`}
        />
      </div>

      {group.expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.25rem' }}>
          {layers.map((layer) => (
            <LayerItem
              key={layer.id}
              layer={layer}
              onToggleVisibility={onToggleVisibility}
              onColorChange={onColorChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function LayerPanel({
  layers,
  groups,
  isLoading,
  onImport,
  onToggleVisibility,
  onToggleGroupVisibility,
  onToggleGroupExpanded,
  onColorChange,
  onRemove,
  onRemoveGroup,
  onRemoveAll,
}: LayerPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onImport(files)
    }
    e.target.value = ''
  }

  const standaloneLayers = layers.filter((l) => l.groupId === null)
  const hasItems = layers.length > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".geojson,.json"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Button
        label="GeoJSON をインポート"
        icon="pi pi-upload"
        size="small"
        onClick={() => fileInputRef.current?.click()}
        style={{ width: '100%' }}
      />

      {isLoading && (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-color-secondary)' }}>キャッシュから読み込み中...</div>
      )}

      {!hasItems && !isLoading && (
        <div
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-color-secondary)',
            padding: '0.5rem 0',
          }}
        >
          GeoJSON ファイルをインポートしてください
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {groups.map((group) => (
          <LayerGroupSection
            key={group.id}
            group={group}
            layers={layers.filter((l) => l.groupId === group.id)}
            onToggleGroupVisibility={onToggleGroupVisibility}
            onToggleGroupExpanded={onToggleGroupExpanded}
            onToggleVisibility={onToggleVisibility}
            onColorChange={onColorChange}
            onRemove={onRemove}
            onRemoveGroup={onRemoveGroup}
          />
        ))}

        {standaloneLayers.map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            onToggleVisibility={onToggleVisibility}
            onColorChange={onColorChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {hasItems && (
        <Button
          label="すべて削除"
          icon="pi pi-trash"
          size="small"
          severity="danger"
          text
          onClick={onRemoveAll}
          style={{ alignSelf: 'flex-start' }}
        />
      )}
    </div>
  )
}
