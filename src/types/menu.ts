export interface MenuItem {
    key: string,
    label: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}

export interface MenuItemFromData {
    key: string,
    label: string,
    icon: string,
    children?: MenuItemFromData[]
}