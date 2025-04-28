# Seating
座席表管理システム

# 使用技術
* Node.js
* Next.js
* Google App Script

# 環境設定
1. Node.jsをインストールしてください
2. next.js環境開発  
npx create-next-app "アプリ名"
3. 以下の質問に答える(著者のおすすめ)  
```bash
Would you like to use TypeScript? > Yes  
Would you like to use ESLint? > Yes  
Would you like to use Tailwind CSS? > No  
Would you like your code inside a `src/` directory? > Yes  
Would you like to use App Router? (recommended) > No  
Would you like to use Turbopack for `next dev`? > No  
Would you like to customize the import alias (`@/*` by default)? > Yes  
What import alias would you like configured? › @/*
```
4. 各種パッケージインストール
```bash
npm install next-auth
npm install microcms-js-sdk
```

# 使用方法
* 開発サーバで起動
```bash
npm run dev
```
* ビルド
```bash
npm run build
```
* production modeで実行
```bash
npm run start
```