import { post } from ".";
import { RoomType } from "../features/estate/types";
import { ApiResponse } from "../features/user/types";

interface RoomListResponse {
    rooms: RoomType[];
}

export async function getRoomList(roomid: string): Promise<RoomType[]> {
    const response = await post<ApiResponse<RoomListResponse>, { roomid: string }>(
        "/api/roomList",
        { roomid }
    );

    return response?.data?.rooms || [];
}
