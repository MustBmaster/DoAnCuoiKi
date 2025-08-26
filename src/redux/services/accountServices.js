import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// tạo 1 reducer cho việc gọi API
export const userApi = createApi({
  reducerPath: "userApi",
  // tạo gốc cho việc gọi API, vì tất cả các API đi rapidapi thì đều chung 1 gốc
  baseQuery: fetchBaseQuery({
    // gốc api
    baseUrl: "http://localhost:9000/api",
    // Nếu cần dùng token/key, hãy lấy từ biến môi trường như sau:
    // prepareHeaders: (headers) => {
    //   headers.set("Authorization", import.meta.env.VITE_ACCOUNT_API_TOKEN);
    //   return headers;
    // },
  }),
  // các đuôi API tương ứng đang sử dụng, ghép chuỗi sau gốc API
  endpoints: (builder) => ({
    postLogin: builder.query({
      query: (body) => ({
        url: "/account/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
// redux toolkit cho phép việc export các hành động API này thành các hooks có thể sử dụng trong các components
export const { usePostLoginQuery } = userApi;
