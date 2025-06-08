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

export type FormFieldValue = string | number | boolean | null | undefined;

export interface SettingsSearchType {
    accountName: string,
    [key: string]: FormFieldValue;
}

export interface AccountData {
    accountName: string
}
