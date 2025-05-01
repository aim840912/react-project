# 🧩 React Admin Dashboard
[![CI](https://github.com/aim840912/react-project/actions/workflows/ci.yml/badge.svg)](https://github.com/aim840912/react-project/actions/workflows/ci.yml) [![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&labelColor=black)](https://react-project-git-main-tienchihchengs-projects.vercel.app/login)

一個基於 React 18、Redux Toolkit、TypeScript、Ant Design 和 ECharts 的現代化後台管理系統，支援多角色權限控制、數據可視化、Excel 導出等功能。

---

## 🚀 功能特色

- 🔐 多角色登入與權限控制
- 📊 ECharts 數據圖表
- 📁 Excel 匯出功能
- 🧩 自定義 React Hooks 與組件封裝
- 🧭 React Router v6 路由管理
- 🎨 Ant Design UI 元件庫
- 🛠️ TypeScript 強型別開發
- 📦 Redux Toolkit 狀態管理
- 🌐 Vercel 自動部署支援

---

## 🧱 技術棧

- **React 18** + **TypeScript**
- **Redux Toolkit** + **React-Redux**
- **React Router v6**
- **Ant Design** + **ECharts**
- **Axios**（API 請求）
- **Create React App (CRA)**（建構工具）
- **Vercel**（部署平台）

---

## 📦 安裝與啟動

```bash
# 1. 克隆專案
git clone https://github.com/aim840912/react-project.git
cd react-project

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm start
```

---

## 🧪 測試與建構
```bash
# 執行 ESLint 檢查
npm run lint

# 執行測試（使用 CRA 內建的測試框架）
npm test

# 建構生產環境版本
npm run build
```

---


## 🧹 程式碼風格與檢查
本專案使用 ESLint 搭配 Prettier 統一程式碼風格與語法規範：

ESLint：使用 airbnb 規則搭配 @typescript-eslint

Prettier：自動格式化程式碼（縮排、分號、引號等）

```bash
npm run lint    # 檢查語法錯誤
npm run format  # 自動格式化程式碼
```

---

##　📁 專案結構
```csharp
react-project/
├── public/               # 公共資源
├── src/
│   ├── assets/           # 靜態資源
│   ├── components/       # 可重用組件
│   ├── hooks/            # 自定義 Hooks
│   ├── pages/            # 頁面組件
│   ├── redux/            # Redux 狀態管理
│   ├── router/           # React Router 路由設定
│   ├── utils/            # 工具方法
│   ├── App.tsx           # 主組件
│   └── index.tsx         # 入口檔案
├── .eslintrc.js          # ESLint 設定
├── .prettierrc           # Prettier 設定
├── .vercel.json          # 部署設定
├── package.json
└── tsconfig.json

```

---

## 📁 功能詳解（點擊可看原始碼）

### 📊 數據可視化（ECharts 整合）
- [`Dashboard`](src/page/dashboard/index.tsx)

### 🔐 權限控制（角色分頁與按鈕權限）
- [`authSlice`](src/store/login/authSlice.ts)
- [`withPermissions`](src/utils/withPermissions.tsx)

### 📁 表格導出 Excel（支援跨頁選擇）
- [`exportToExcel.ts`](src/utils/exportToExcel.ts)

### 🧠 列表緩存與返回保留狀態
- [`contract.tsx`](src/page/finance/contract.tsx)

### ♻️ 通用組件與自定義 Hook 封裝
- [`useDataList`](src/hooks/useDataList.ts)

### 🧮 動態菜單遞歸渲染
- [`generatesRoutes.tsx`](src/utils/generatesRoutes.tsx)

---

## ⚙️ 性能優化實作

| 技術                         | 位置                                          |
| ---------------------------- | --------------------------------------------- |
| 懶加載（Lazy Loading）       | [`router/index.tsx`](src/router/index.tsx)    |
| `React.memo` + `useCallback` | [`users/index.tsx`](src/page/users/index.tsx) |
| `React.memo` 應用            | [`bill.tsx`](src/page/finance/bill.tsx)       |

---

## 🔚 總結

本專案著重於前端工程化與模組化設計，透過抽象公共邏輯、權限控制、高效渲染等手段提升開發效率與專案可維護性，適合作為中大型 React 專案的參考模板。

---
