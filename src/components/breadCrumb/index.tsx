import React, { useMemo } from "react";
import { Breadcrumb } from 'antd';
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import "./index.scss";
import { MenuItem } from "../../types";

/**
 *查找當前路徑對應的麵包屑路徑
 *@param path 當前路徑
 *@param menuItems 菜單項數組
 *@returns 包含麵包屑路徑的數組，每項包含label和對應的路徑
 */
function findBreadcrumbPath(path: string, menuItems: MenuItem[]): Array<{ label: string, path: string }> {
    //用於存儲結果的數組
    const result: Array<{ label: string, path: string }> = [];

    //遞歸查找路徑
    const find = (currentPath: string, items: MenuItem[], parentPath: string = ""): boolean => {
        for (const item of items) {
            //構建完整的路徑key
            const itemPath = item.key;

            //檢查當前路徑是否匹配或者是當前項的子路徑
            if (currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)) {
                //添加當前項到結果
                result.push({
                    label: item.label,
                    path: itemPath
                });

                //如果有子項且路徑不完全匹配，繼續在子項中查找
                if (item.children && currentPath !== itemPath) {
                    const found = find(currentPath, item.children, itemPath);
                    //如果在子項中找到，返回true
                    if (found) return true;

                    //如果沒找到，回溯（移除當前項）
                    result.pop();
                } else {
                    //找到完全匹配的路徑
                    return true;
                }
            }
        }

        //在當前層級沒有找到匹配的項
        return false;
    };

    //開始查找
    find(path, menuItems);
    return result;
}

/**
 *麵包屑導航組件
 *根據當前路徑和菜單數據生成麵包屑導航
 */
const MyBreadcrumb: React.FC = () => {
    const location = useLocation();
    const { menuList } = useAppSelector((state) => state.authSlice);

    //使用useMemo緩存麵包屑計算結果，避免不必要的重複計算
    const breadcrumbItems = useMemo(() => {
        if (!menuList || menuList.length === 0) {
            return [{ title: "首頁", href: "/" }];
        }

        //首頁永遠是第一項
        const homeItem = { title: "首頁", href: "/" };

        //查找當前路徑的麵包屑
        const pathItems = findBreadcrumbPath(location.pathname, menuList);
        //將麵包屑路徑轉換為antd Breadcrumb所需的格式
        const items = pathItems.map((item, index) => {
            const isLast = index === pathItems.length - 1;
            return {
                title: isLast
                    ? <span>{item.label}</span>
                    : <Link to={item.path}>{item.label}</Link>,
                href: isLast ? undefined : item.path
            };
        });

        //合併首頁和路徑項
        return [homeItem, ...items];
    }, [location.pathname, menuList]);

    //如果沒有麵包屑項，不渲染組件
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