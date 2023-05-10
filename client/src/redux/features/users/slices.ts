import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModalPayload, UserState } from "../../../models/User";

export const INIT_STATE: UserState = {
  filterValue: "",
};

/* eslint-disable no-param-reassign */
export const userSlices = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    setSearchKeyWord: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    closeUserModal: (state) => {
      state.modal = undefined;
    },
    openUserModal: (state, action: PayloadAction<UserModalPayload>) => {
      state.modal = action.payload;
    },
  },
});

export const { closeUserModal, openUserModal, setSearchKeyWord } =
  userSlices.actions;

export default userSlices.reducer;
