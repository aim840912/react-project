// import { post } from "../shared/http/http";
import { post } from ".";

export interface User {
    id: string;
    name: string;
    status: string;
    tel: string;
    business: string;
    email: string;
    creditCode: string;
    industryNum: string;
    organizationCode: string;
    legalPerson: string;
}

export default function editUser(data: User) {
    return post("/api/editUser", data);
}