import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMenu } from "@/features/user/authSlice";
import { useGetMenuQuery } from "@/features/user/api/userApi";

export function useMenuLoader() {
    const token = useAppSelector((state) => state.authSlice.token) || sessionStorage.getItem("token");
    const dispatch = useAppDispatch();
    const { data: menuData } = useGetMenuQuery(undefined, { skip: !token });
    useEffect(() => {
        if (menuData) {
            dispatch(setMenu(menuData));
        }
    }, [menuData, dispatch]);
}