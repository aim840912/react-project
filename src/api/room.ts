import { post } from ".";


export function getRoomList(roomid: string) {
    return post("/api/roomList", { roomid });
}
