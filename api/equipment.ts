import { post } from "../src/utils/http/http";

interface SearchData {
    name: string;
    person: string;
    page: number;
    pageSize: number;
}

export function getEquipmentList(data: SearchData) {
    return post("/equipmentList", data);
}
