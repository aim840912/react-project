import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserFormData {
    name: string;
    tel: string;
    status: string;
    business: string;
    email: string;
    creditCode: string;
    industryNum: string;
    organizationCode: string;
    legalPerson: string;
}

interface UserState {
    userData: UserFormData;
}

const initialState: UserState = {
    userData: {
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

export const emptyUserData: UserFormData = {
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
        setUserData: (state, action: PayloadAction<UserFormData>) => {
            state.userData = action.payload;
        }
    }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
