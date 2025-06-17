import { post } from "../shared/http/http";


export function getRoomList(roomid: string) {
    return post("/api/roomList", { roomid });
}
