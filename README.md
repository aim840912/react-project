# 🧩 React Admin Dashboard

一個基於 React 18、Redux Toolkit、TypeScript、Ant Design 和 ECharts 的現代化後台管理系統，支援多角色權限控制、數據可視化、Excel 匯出等功能。

[![CI](https://github.com/aim840912/react-project/actions/workflows/test.yml/badge.svg)](https://github.com/aim840912/react-project/actions/workflows/test.yml)
[![Vercel](https://vercelbadge.vercel.app/api/aim840912/react-project)](https://react-project-git-main-tienchihchengs-projects.vercel.app/login)

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
- 🧱 Vercel 自動部署支援
- 🌍 i18n 做多語系支援

---

## 🧱 技術棧

- **React 18** + **TypeScript**
- **Redux Toolkit** + **React-Redux**
- **React Router v6**
- **Ant Design** + **ECharts**
- **Axios**（API 請求）
- **Vite**（建構工具）
- **Vercel**（部署平台）
- **i18n**

---

## 📦 安裝與啟動

```bash
# 1. 克隆專案
git clone https://github.com/aim840912/react-project.git
cd react-project

# 2. 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 開啟瀏覽器訪問
http://localhost:5173
```

---

## 🧪 測試與覆蓋率

```bash
# 執行所有測試
npx vitest run

# 執行測試並產生覆蓋率報告
npx vitest run --coverage
```

- 測試框架：Vitest + React Testing Library
- 覆蓋率報告：`./coverage/lcov-report/index.html`

---

## ⚙️ CI/CD 自動化流程

本專案使用 GitHub Actions 自動化測試流程，設定檔位於 `.github/workflows/test.yml`。

- 每次 push 或 PR 到 `main` 分支時，自動執行：
  - 安裝依賴
  - 執行測試與覆蓋率檢查
  - （可選）部署至 Vercel

---

## 🌐 自動部署

已透過 Vercel 進行自動部署，部署連結如下：

🔗 [https://react-project-git-main-tienchihchengs-projects.vercel.app/login](https://react-project-git-main-tienchihchengs-projects.vercel.app/login)

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
│   ├── i18n/             # 國際化
│   ├── mocks/            # 模擬後臺給資料
│   ├── pages/            # 頁面組件
│   ├── router/           # React Router 路由設定
│   ├── store/            # RTK
│   ├── utils/            # 工具方法
│   ├── test/
│   ├── types/            # 類型
│   ├── App.tsx           # 主組件
│   └── index.tsx         # 入口檔案
├── .eslint.config.js     # ESLint 設定
├── .vercel.json          # vercel 設定
├── .prettierrc           # Prettier 設定
├── .vercel.json          # 部署設定
├── tsconfig.json
├── package.json
├── vite.config.ts
└── README.md

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

本專案著重於前端工程化與模組化設計，透過抽象公共邏輯、權限控制、高效渲染等手段提升開發效率與專案可維護性。

---

```mermaid
flowchart TB
  subgraph Frontend
    direction TB
    UI[Browser UI<br/>(React 18 + Ant Design)]
    Router[React Router v6]
    Store[Redux Toolkit]
    Hooks[Custom Hooks<br/>(useDataList, useAppRouter…)]
    Charts[ECharts Components]
    Export[Excel Export Service]
    I18n[i18n / 多語系]
  end

  subgraph API Layer
    direction TB
    Axios[Axios 封裝]
    AuthAPI[認證 API<br/>(login/logout)]
    DataAPI[後端資料 API]
  end

  subgraph Infrastructure
    direction TB
    Vite[Vite / Dev Server]
    CI[GitHub Actions<br/>Vitest + ESLint + Prettier]
    Deploy[Vercel 部署]
  end

  UI -->|Route 匹配| Router
  Router -->|Outlet / ProtectedRoute| UI
  UI -->|dispatch action| Store
  Store -->|thunk / createAsyncThunk| Axios
  Axios --> AuthAPI & DataAPI
  Store --> UI
  UI --> Charts
  UI --> Export
  UI --> I18n

  Vite --> UI
  CI -->|push → test / lint| Deploy
  Deploy --> UI
```
