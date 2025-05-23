import { post } from "../utils/http/http";

interface SearchData {
    name: string;
    person: string;
    page: number;
    pageSize: number;
}

export function getEquipmentList(data: SearchData) {
    return post("/api/equipmentList", data);
}
