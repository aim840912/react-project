import { FormFieldValue } from "./settings";

export interface SearchType {
    name: string;
    person: string;
    [key: string]: FormFieldValue;
}

export interface EquipmentDataType {
    id: number
    no: string,
    name: string;
    person: string;
    tel: number;
    time: string;
    rest: string;
    status: string;
    last: string;
    type: string;
    from: string
}