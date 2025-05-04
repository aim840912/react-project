import React, { useMemo } from "react";
import { Breadcrumb } from 'antd';
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import "./index.scss";
import { MenuItem } from "../../types";

/**
 * 查找当前路径对应的面包屑路径
 * @param path 当前路径
 * @param menuItems 菜单项数组
 * @returns 包含面包屑路径的数组，每项包含label和对应的路径
 */
function findBreadcrumbPath(path: string, menuItems: MenuItem[]): Array<{ label: string, path: string }> {
    // 用于存储结果的数组
    const result: Array<{ label: string, path: string }> = [];

    // 递归查找路径
    const find = (currentPath: string, items: MenuItem[], parentPath: string = ""): boolean => {
        for (const item of items) {
            // 构建完整的路径key
            const itemPath = item.key;

            // 检查当前路径是否匹配或者是当前项的子路径
            if (currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)) {
                // 添加当前项到结果
                result.push({
                    label: item.label,
                    path: itemPath
                });

                // 如果有子项且路径不完全匹配，继续在子项中查找
                if (item.children && currentPath !== itemPath) {
                    const found = find(currentPath, item.children, itemPath);
                    // 如果在子项中找到，返回true
                    if (found) return true;

                    // 如果没找到，回溯（移除当前项）
                    result.pop();
                } else {
                    // 找到完全匹配的路径
                    return true;
                }
            }
        }

        // 在当前层级没有找到匹配的项
        return false;
    };

    // 开始查找
    find(path, menuItems);
    return result;
}

/**
 * 面包屑导航组件
 * 根据当前路径和菜单数据生成面包屑导航
 */
const MyBreadcrumb: React.FC = () => {
    const location = useLocation();
    const { menuList } = useAppSelector((state) => state.authSlice);

    // 使用useMemo缓存面包屑计算结果，避免不必要的重复计算
    const breadcrumbItems = useMemo(() => {
        if (!menuList || menuList.length === 0) {
            return [{ title: "首页", href: "/" }];
        }

        // 首页永远是第一项
        const homeItem = { title: "首页", href: "/" };

        // 查找当前路径的面包屑
        const pathItems = findBreadcrumbPath(location.pathname, menuList);

        // 将面包屑路径转换为antd Breadcrumb所需的格式
        const items = pathItems.map((item, index) => {
            const isLast = index === pathItems.length - 1;
            return {
                title: isLast
                    ? <span>{item.label}</span>
                    : <Link to={item.path}>{item.label}</Link>,
                href: isLast ? undefined : item.path
            };
        });

        // 合并首页和路径项
        return [homeItem, ...items];
    }, [location.pathname, menuList]);

    // 如果没有面包屑项，不渲染组件
    if (breadcrumbItems.length <= 1) {
        return null;
    }

    return (
        <div className="breadcrumb-container">
            <Breadcrumb items={breadcrumbItems} />
        </div>
    );
};

export default MyBreadcrumb;