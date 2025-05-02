import { post } from "../utils/http/http";


export function getRoomList(roomid: string) {
    return post("/roomList", { roomid });
}
