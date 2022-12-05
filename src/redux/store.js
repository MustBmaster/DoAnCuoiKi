import { configureStore } from "@reduxjs/toolkit";

import { coreApi } from "./services/coreServices";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer, //reducer của việc gọi Api
    player: playerReducer,
  },
  // gộp các middleware mặc dinh với middleware cho việc gọi Api
  // hiểu middleware ở đây là cái mà redux sử dụng để gọi api khi xảy ra action
  // tìm hiểu kĩ hơn tại: https://topdev.vn/blog/wp-content/uploads/2019/05/redux-workflows.gif
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware),
});
