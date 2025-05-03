import { post } from "../utils/http/http";
import { User } from "../types";

export default function editUser(data: User) {
    return post("/api/editUser", data);
}