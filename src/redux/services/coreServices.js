import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// tạo 1 reducer cho việc gọi API
export const coreApi = createApi({
  reducerPath: "coreApi",
  // tạo gốc cho việc gọi API, vì tất cả các API đi rapidapi thì đều chung 1 gốc
  baseQuery: fetchBaseQuery({
    // gốc api
    baseUrl: "https://shazam-core.p.rapidapi.com",
    // header chung cho tất cả các API, xem ở
    // https://rapidapi.com/tipsters/api/shazam-core?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel
    // header mặc định gồm token khác nhau với từng user
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "7bb691f539mshb347a0f187b9d82p16f450jsn2d61ed36e0ae"
      );
      return headers;
    },
  }),
  // các đuôi API tương ứng đang sử dụng, ghép chuỗi sau gốc API
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "v1/charts/world" }),
    getSongsByGenre: builder.query({
      query: (genre) => `/v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`,
    }),
  }),
});
// redux toolkit cho phép việc export các hành động API này thành các hooks có thể sử dụng trong các components
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = coreApi;
