<p align="center">
  <img src="src/assets/geonote-logo.png" alt="GeoNote" width="200" />
</p>

# GeoNote

Vite + React + TypeScript の Web アプリケーション雛形です。

## 技術スタック

- **モジュールバンドラー**: Vite
- **言語**: TypeScript
- **SPA ライブラリ**: React
- **コードチェック**: ESLint
- **コード整形**: Prettier

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

開発サーバーが起動し、ブラウザで http://localhost:5173 を開いて確認できます。

## ビルド

```bash
npm run build
```

`dist` フォルダに本番用ビルドが出力されます。

## プレビュー

```bash
npm run preview
```

ビルド結果をローカルでプレビューします。

## リント・整形

```bash
# ESLint でチェック
npm run lint

# ESLint で自動修正
npm run lint:fix

# Prettier で整形
npm run format

# Prettier でチェックのみ
npm run format:check
```

## プロジェクト構成

```
geonote/
├── public/          # 静的ファイル
├── src/
│   ├── assets/      # 画像などのアセット
│   ├── App.tsx      # ルートコンポーネント
│   ├── App.css
│   ├── main.tsx     # エントリポイント
│   ├── index.css    # グローバルスタイル
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
└── package.json
```
