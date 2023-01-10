import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UID: localStorage.getItem("UID"),
  userInfo: JSON.parse(localStorage.getItem("userInfo")),
  likedSongList: [],
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
      if (action.payload == null) {
        localStorage.removeItem("UID");
      } else {
        localStorage.setItem("UID", state.UID);
      }
    },
    setUserFavorite: (state, action) => {
      state.likedSongList = action.payload;
    },
  },
});

export const { setUser, setUserID, setUserFavorite } = userSlice.actions;

export default userSlice.reducer;
