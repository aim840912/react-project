# 🧩 React Admin Dashboard

一個基於 React 18、Redux Toolkit、TypeScript、Ant Design 和 ECharts 的現代化後台管理系統，支援多角色權限控制、數據可視化、Excel 匯出等功能。

[![CI](https://github.com/aim840912/react-project/actions/workflows/test.yml/badge.svg)](https://github.com/aim840912/react-project/actions/workflows/test.yml)
[![Vercel](https://vercelbadge.vercel.app/api/aim840912/react-project)](https://react-project-git-main-tienchihchengs-projects.vercel.app/login)

---

## ✨ 核心功能 (Core Features)

* **權限管理**：
    * **登入驗證**：區分 `admin`、`manager`、`user` 三種角色。
    * **動態路由**：根據使用者權限，從後端獲取菜單資料，動態生成可訪問的頁面路由。
    * **路由守衛**：透過高階元件保護需要登入才能訪問的頁面。
    * **按鈕級權限**：控制頁面中特定按鈕（如：刪除、修改權限）的顯示與否。
* **數據可視化**：整合 `ECharts`，提供豐富的圖表類型（折線圖、長條圖、南丁格爾玫瑰圖）用於儀表板和數據分析頁面。
* **表格功能**：
    * **通用列表邏輯**: 透過自定義 Hook (`useDataList`) 封裝分頁、搜尋、重置等通用表格操作。
    * **數據匯出**: 實現將表格數據匯出為 Excel 檔案的功能。
* **國際化 (i18n)**：整合 `i18next`，支援中英文雙語切換。
* **前端工程化**：
    * **API Mocking**: 開發環境下使用 `MSW` 模擬後端 API，實現前後端分離開發。
    * **CI/CD**: 透過 `GitHub Actions` 自動執行測試，並部署到 `Vercel`。
    * **程式碼品質**: 使用 `ESLint` 和 `Prettier` 進行程式碼風格檢查與自動格式化。

---

## 🛠️ 技術棧 (Technology Stack)

| 類別          | 技術                          | 說明                                                               |
| :------------ | :---------------------------- | :----------------------------------------------------------------- |
| **核心框架**  | React 18, React DOM 19        | 使用最新的 React 版本，充分利用其特性。                            |
| **建構工具**  | Vite                          | 提供極速的開發伺服器啟動和熱更新體驗。                             |
| **程式語言**  | TypeScript                    | 為專案提供強型別支持，增加程式碼的穩健性。                         |
| **狀態管理**  | Redux Toolkit, React-Redux    | 作為全域狀態管理中心，包含 `authSlice`, `permissionSlice` 等。     |
| **路由管理**  | React Router v6               | 負責應用的頁面導航和動態路由生成。                                 |
| **UI 元件庫** | Ant Design 5.x                | 提供高品質、開箱即用的 UI 元件。                                   |
| **數據請求**  | Axios, RTK Query              | 封裝 Axios 攔截器處理 Token 和錯誤；使用 RTK Query 管理 API 快取。 |
| **數據圖表**  | ECharts for React             | 用於數據可視化圖表的繪製。                                         |
| **測試**      | Vitest, React Testing Library | 用於單元測試和元件測試。                                           |
| **樣式方案**  | Sass/SCSS                     | 提供更強大的 CSS 編寫能力。                                        |
| **部署**      | Vercel                        | 整合 GitHub 實現 CI/CD，自動部署。                                 |

---

## 🚀 快速開始 (Getting Started)

### 環境準備

* Node.js (建議版本 `v18.x` 或更高)
* `npm` 或 `yarn`, `pnpm`

### 安裝與啟動

1.  **克隆專案**
    ```bash
    git clone [https://github.com/aim840912/react-project.git](https://github.com/aim840912/react-project.git)
    cd react-project
    ```

2.  **安裝依賴**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```
    應用將在 `http://localhost:5173` (預設) 上運行。

### 測試帳號

專案使用 MSW 模擬了登入 API，您可以使用以下帳號進行測試：

| 角色         | 用戶名    | 密碼      | 權限                         |
| :----------- | :-------- | :-------- | :--------------------------- |
| **管理員**   | `admin`   | `admin`   | 擁有所有頁面和按鈕權限。     |
| **經理**     | `manager` | `manager` | 擁有部分頁面和按鈕權限。     |
| **普通用戶** | `user`    | `user`    | 權限最少，只能訪問部分頁面。 |

---

## 🧪 測試與品質保證

* **執行單元測試**:
    ```bash
    npm test
    # 或使用 Vitest CLI
    npx vitest run
    ```

* **執行測試並產出覆蓋率報告**:
    ```bash
    npx vitest run --coverage
    ```
    覆蓋率報告將生成在 `coverage/` 目錄下。

* **程式碼風格檢查**:
    ```bash
    npm run lint
    ```

---

##　📁 專案結構

```csharp
react-project/
├── api/                  # Vercel Serverless Functions
├── public/               # 公共靜態資源
├── src/
│   ├── api/              # API 請求函式封裝
│   ├── app/              # Redux Store 設定
│   ├── assets/           # 圖片、字體等本地資源
│   ├── components/       # 通用、可重用的 UI 元件 (如 Header, Breadcrumb)
│   ├── features/         # 按功能模組劃分的程式碼 (核心業務邏輯)
│   ├── guard/            # 路由守衛 (如 RequireAuth)
│   ├── hooks/            # 自定義 React Hooks
│   ├── i18n/             # 國際化設定與語言檔案
│   ├── layout/           # 頁面佈局元件
│   ├── mocks/            # MSW 的 API Mocking 設定
│   ├── page/             # 通用頁面 (如 404, Error, Loading)
│   ├── router/           # 路由設定與動態生成邏輯
│   ├── shared/           # 跨模組共享的邏輯 (如 Axios 實例)
│   ├── utils/            # 通用工具函式
│   ├── App.tsx           # 應用根元件
│   └── main.tsx          # 應用程式入口
├── .github/              # GitHub Actions 工作流程
├── .gitignore
├── eslint.config.js      # ESLint 設定檔
├── index.html            # Vite 入口 HTML
├── package.json
├── tsconfig.json         # TypeScript 根設定
└── vite.config.ts        # Vite 設定檔

```
---

## 💡 關鍵實踐 (Key Practices)

本專案不僅僅是功能的堆砌，更包含了對前端工程化和軟體架構的思考：

* **關注點分離 (SoC)**: 嚴格劃分 UI 層、業務邏輯層和數據服務層。例如，`features` 專注業務，`components` 專注 UI，`api` 專注數據。
* **配置即代碼 (Config as Code)**: 將表格的欄位 (`columns`)、圖表設定 (`options`) 等配置資訊從元件中抽離，使元件本身更純粹，配置更易於管理。
* **抽象與複用**: 透過自定義 Hooks (`useDataList`, `useAppRouter`) 將通用邏輯進行封裝，避免在多個元件中重複編寫相同的程式碼。
* **性能優化**:
    * **程式碼分割**: 透過 `React.lazy` 和 `Suspense` 實現路由級的程式碼分割，加速首頁載入。
    * **打包優化**: 使用 `vite-plugin-compression` 產生 Gzip 和 Brotli 壓縮檔案，減小生產環境資源體積。
    * **渲染優化**: 適時使用 `useMemo` 和 `useCallback` 避免不必要的重複渲染。
