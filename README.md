# 企業級 React 後台管理系統 (Enterprise-Level React Admin Dashboard)

這是一個功能完備、高度模組化的企業級後台管理系統範例。專案採用 React 18、TypeScript、Vite、Redux Toolkit 及 Ant Design 5.x 等現代前端技術棧開發，旨在展示一個可擴展、可維護、具備完整權限管理與前端工程化實踐的解決方案。

[![CI/CD Pipeline](https://github.com/aim840912/react-project/actions/workflows/test.yml/badge.svg)](https://github.com/aim840912/react-project/actions/workflows/test.yml)
[![Live Demo on Vercel](https://vercelbadge.vercel.app/api/aim840912/react-project)](https://react-project-git-main-tienchihchengs-projects.vercel.app/login)

---

## ✨ 專案亮點 (Showcase-worthy Features)

1.  **完整的權限管理機制 (Comprehensive Access Control)**:
    * **動態路由生成**: 完全由後端 API 回傳的菜單數據動態生成前端路由表，實現了真正的運行時權限控制，而非僅僅在前端寫死。
    * **路由守衛 (Route Guard)**: 透過高階元件 `RequireAuth`，在前端路由層級進行二次驗證，確保使用者無法手動輸入 URL 訪問未授權頁面。
    * **按鈕級別權限 (Component-Level Authorization)**: 透過自定義的 `CheckPermission` 元件，可以精細控制頁面內部任意 UI 元素（如按鈕）的顯示與否，完美應對複雜的業務場景。

2.  **現代化的狀態管理 (Modern State Management)**:
    * **Redux Toolkit & RTK Query**: 全面採用 Redux Toolkit 簡化 Redux 開發。大量使用 RTK Query 處理非同步數據請求，自動管理快取、加載與錯誤狀態，大幅減少樣板程式碼。
    * **Redux Listener Middleware**: 巧妙運用 Listener Middleware 實現跨 Slice 的副作用處理。例如，監聽登入成功 `setAuth` 的 action，來觸發 `authMiddleware` 中的 `sessionStorage` 操作，或監聽 CRUD 操作來觸發 `logMiddleware` 記錄日誌，實現了高度解耦。

3.  **前端工程化與測試 (Engineering & Testing)**:
    * **API Mocking**: 在開發環境中，使用 **MSW (Mock Service Worker)** 攔截 API 請求並回傳模擬數據。這使得前端開發可以完全獨立於後端進行，是前後端分離開發的最佳實踐。
    * **完整的測試策略**:
        * **單元測試 (Unit Test)**: 使用 `Vitest` 對 Redux Slices 和自定義 Hooks (`useDebounce`) 進行了測試。
        * **元件測試 (Component Test)**: 使用 `React Testing Library` 對 `Login` 頁面 和 `CheckPermission` 元件 進行了互動測試。
        * **CI/CD**: 透過 `GitHub Actions` 自動化執行所有測試與程式碼覆蓋率檢查，確保每次提交的程式碼品質。

4.  **清晰的架構與設計模式 (Clean Architecture & Design Patterns)**:
    * **關注點分離 (SoC)**: 專案結構清晰，`features` 目錄下的模組各司其職，UI、狀態、API 呼叫被良好地組織在一起。
    * **配置驅動開發**: 將表格欄位 (`columns`)、路由對應 (`componentMap`) 等易變部分抽離為獨立的配置文件，使得主邏輯更穩定，擴充更容易。

---

## 🛠️ 技術棧 (Technology Stack)

| 類別          | 技術                              | 說明                                                |
| :------------ | :-------------------------------- | :-------------------------------------------------- |
| **核心框架**  | `React 18`, `React DOM 19`        | 採用最新的 React 版本，充分利用其特性。             |
| **建構工具**  | `Vite`                            | 提供極速的開發伺服器啟動和熱模組更新（HMR）體驗。   |
| **程式語言**  | `TypeScript`                      | 為專案提供強型別支持，增加程式碼的穩健性。          |
| **狀態管理**  | `Redux Toolkit`, `RTK Query`      | 現代化的 Redux 實踐，高效管理全域狀態與伺服器快取。 |
| **路由管理**  | `React Router v7`                 | 負責應用的頁面導航和基於權限的動態路由生成。        |
| **UI 元件庫** | `Ant Design 5.x`                  | 提供高品質、開箱即用的 UI 元件，加速開發。          |
| **數據請求**  | `Axios`                           | 封裝攔截器，統一處理 API 的 Token 與錯誤回饋。      |
| **數據圖表**  | `ECharts for React`               | 用於數據可視化圖表的繪製。                          |
| **測試**      | `Vitest`, `React Testing Library` | 現代化的測試框架，提供完整的單元與元件測試能力。    |
| **API 模擬**  | `MSW (Mock Service Worker)`       | 在開發與測試階段攔截網路請求，實現前後端解耦。      |
| **樣式方案**  | `Sass/SCSS`                       | 提供更強大的 CSS 編寫能力。                         |
| **部署**      | `Vercel`                          | 整合 GitHub 實現 CI/CD，自動部署。                  |

---

## 🚀 快速開始 (Getting Started)

### 環境準備

* Node.js (`v18.x` 或更高版本)
* npm (或 yarn, pnpm)

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

3.  **啟動開發伺服器** (已整合 MSW)
    ```bash
    npm run dev
    ```
    應用程式將在 `http://localhost:5173` (預設) 上運行。

---

### 測試帳號

專案使用 MSW 模擬了登入 API，您可以使用以下帳號進行測試：

| 角色         | 用戶名    | 密碼      | 權限                         |
| :----------- | :-------- | :-------- | :--------------------------- |
| **管理員**   | `admin`   | `admin`   | 擁有所有頁面和按鈕權限。     |
| **經理**     | `manager` | `manager` | 擁有部分頁面和按鈕權限。     |
| **普通用戶** | `user`    | `user`    | 權限最少，只能訪問部分頁面。 |

---

## 📁 專案結構解析 (Project Structure)

```csharp

react-project/
├── public/               # 公共靜態資源
├── src/
│   ├── app/              # ✅ Redux Store 設定 (modules/store.ts)
│   ├── components/       # ✅ 通用 UI 元件 (Header, NavLeft)
│   ├── features/         # 🔥 核心業務模組 (按功能劃分)
│   │   ├── dashboard/
│   │   ├── user/         # 包含 pages, api, slices, middleware
│   │   └── ...           # 其他業務模組
│   ├── guard/            # ✅ 路由守衛 (RequireAuth, CheckPermission)
│   ├── hooks/            # ✅ 自定義 Hooks (useDebounce, useMenuLoader)
│   ├── i18n/             # 國際化設定
│   ├── layout/           # 頁面主佈局
│   ├── mocks/            # ✅ MSW API Mocking (handlers, server)
│   ├── router/           # ✅ 路由設定與動態生成邏輯 (generatesRoutes.tsx)
│   ├── shared/           # 跨模組共享邏輯 (如 Axios 實例工廠)
│   ├── test/             # 測試設定檔 (setup.ts, fileMock.ts)
│   ├── utils/            # 通用工具函式 (exportToExcel.ts)
│   ├── App.tsx           # 應用根元件
│   └── main.tsx          # 應用程式入口
├── .github/              # GitHub Actions CI/CD 工作流程
├── package.json
└── vite.config.ts        # Vite 設定檔 (包含測試與打包優化)

```