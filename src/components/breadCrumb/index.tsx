import { useLocation } from "react-router"
import { Breadcrumb } from 'antd';
import { useAppSelector } from "../../store/hooks";

interface MenuItem {
    key: string,
    label: string,
    children?: MenuItem[]
}

//[{label:"物業管理"},{label:"樓宇管理"}] ["物業管理","樓宇管理"]
function findBreadCrumbPath(path: string, menuItems: MenuItem[]): string[] {
    const pathSegments: string[] = [];

    function findPath(currentPath: string, items: MenuItem[]) {
        for (const item of items) {
            if (currentPath.startsWith(item.key)) {
                pathSegments.push(item.label)
                if (item.children) {
                    findPath(currentPath, item.children)
                }
                break;
            }
        }
        return pathSegments
    }
    return findPath(path, menuItems)
}

function MyBreadCrumb() {
    const location = useLocation()
    const { menuList } = useAppSelector((state) => state.authSlice)
    const breadList = findBreadCrumbPath(location.pathname, menuList).map(item => ({ title: item }))
    return <Breadcrumb items={breadList} className="mt mb" />
}

export default MyBreadCrumb