import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/types";

export interface UserState {
    userData: User;
}

const initialState: UserState = {
    userData: {
        id: "",
        name: "",
        tel: "",
        status: "",
        business: "",
        email: "",
        creditCode: "",
        industryNum: "",
        organizationCode: "",
        legalPerson: ""
    }
};

export const emptyUserData: User = {
    id: "",
    name: "",
    tel: "",
    status: "",
    business: "",
    email: "",
    creditCode: "",
    industryNum: "",
    organizationCode: "",
    legalPerson: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        }
    }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
