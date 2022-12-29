import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// tạo 1 reducer cho việc gọi API
export const userApi = createApi({
  reducerPath: "userApi",
  // tạo gốc cho việc gọi API, vì tất cả các API đi rapidapi thì đều chung 1 gốc
  baseQuery: fetchBaseQuery({
    // gốc api
    baseUrl: "http://localhost:9000/api",
    // header chung cho tất cả các API, xem ở
    // https://rapidapi.com/tipsters/api/shazam-core?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel
    // header mặc định gồm token khác nhau với từng user
    // prepareHeaders: (headers) => {
    //   headers.set(
    //     "X-RapidAPI-Key",
    //     "b9c8b355a2msh5657fff088d9527p1d7fbfjsn71177c47a7e7"
    //   );
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
