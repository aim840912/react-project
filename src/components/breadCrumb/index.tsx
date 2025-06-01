import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { useMemo } from "react";

interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
}

/**
 * 在 menuTree 裡找出對應 path 的 breadcrumb 標籤陣列
 * @param path 完整的 location.pathname
 * @param menuTree menuList
 * @returns label 陣列，例如 ["物業管理","樓宇管理"]
 */
function findBreadcrumbLabels(path: string, menuTree: MenuItem[]): string[] {
    for (const item of menuTree) {
        // 完全相符或以 item.key 為前綴（帶 / 開頭）才算命中
        if (path === item.key || path.startsWith(item.key + "/")) {
            if (item.children) {
                const child = findBreadcrumbLabels(path, item.children);
                if (child.length) {
                    return [item.label, ...child];
                }
            }
            // 沒有子路由 or 子路由沒找到，就只回傳這層
            return [item.label];
        }
    }
    // 沒有命中任何路由，回空陣列
    return [];
}

export default function MyBreadCrumb() {
    const { pathname } = useLocation();
    const menuList = useSelector((s: any) => s.authSlice.menuList);

    const items = useMemo(() => {
        const labels = findBreadcrumbLabels(pathname, menuList);
        return labels.map(label => ({ title: label }));
    }, [pathname, menuList]);

    return <Breadcrumb items={items} className="mt mb" />;
}
