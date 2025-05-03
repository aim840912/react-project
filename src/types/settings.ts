export interface MenuType {
    label: string;
    icon: string;
    key: string;
    children?: MenuType[]
}

export interface SettingsDataType {
    id: number;
    accountName: string;
    auth: string;
    person: string;
    tel: string;
    department: string;
    menu: MenuType[];
}

export interface SettingsSearchType {
    accountName: string
}

export interface AccountData {
    accountName: string
}
