import { describe, it, expect, vi } from "vitest";
import { generateRoutes } from "./generatesRoutes";

// 先 mock 掉 componentMap
vi.mock("../router/routerMap", () => ({
    componentMap: {
        "/home": () => <div>Home</div>,
        "/dashboard": () => <div>Dashboard</div>,
    },
}));

describe("generateRoutes", () => {
    it("應正確轉換單一 menu 項目", () => {
        const menu = [
            {
                key: "/home",
                icon: "home",
                label: "首頁",
            },
        ];

        const routes = generateRoutes(menu);
        expect(routes).toHaveLength(1);
        expect(routes[0].path).toBe("/home");
        expect(routes[0].element).toBeDefined();
    });

    it("應處理巢狀 children 結構", () => {
        const menu = [
            {
                key: "/dashboard",
                icon: "dashboard",
                label: "儀表板",
                children: [
                    {
                        key: "/dashboard/analytics",
                        icon: "chart",
                        label: "分析",
                    },
                ],
            },
        ];

        const routes = generateRoutes(menu);

        expect(routes).toHaveLength(1);
        expect(routes[0].children).toBeDefined();
        expect(routes[0].children![0].path).toBe("/dashboard/analytics");
    });


});
