import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UID: localStorage.getItem("UID"),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
};

const userSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    setUserID: (state, action) => {
      state.UID = action.payload;
      localStorage.setItem("UID", state.UID);
    },
  },
});

export const { setUser, setUserID } = userSlice.actions;

export default userSlice.reducer;
