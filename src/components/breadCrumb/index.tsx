import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMemo } from "react";
import { useAppSelector } from "@/app/hooks";

interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
}

function findBreadcrumbLabels(path: string, menuTree: MenuItem[]): string[] {
    for (const item of menuTree) {
        if (path === item.key || path.startsWith(item.key + "/")) {
            if (item.children) {
                const child = findBreadcrumbLabels(path, item.children);
                if (child.length) {
                    return [item.label, ...child];
                }
            }
            return [item.label];
        }
    }
    return [];
}

export default function MyBreadCrumb() {
    const { pathname } = useLocation();
    const menuList = useAppSelector((state) => state.authSlice.menuList);

    const items = useMemo(() => {
        const labels = findBreadcrumbLabels(pathname, menuList);
        return labels.map(label => ({ title: label }));
    }, [pathname, menuList]);

    return <Breadcrumb items={items} className="mt mb" />;
}
