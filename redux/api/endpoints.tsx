import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const endpointsApiFunc = createApi({
  reducerPath: 'endpointsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    fetchforCity: builder.mutation({
      query: ({ lat, lon }) => ({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2b2daf8452ed53966d467d1859828fba`,
        method: 'POST'
      }),
    }),

    fetchLatestNews: builder.query({
      query: () => ({
        url: 'https://newsapi.org/v2/everything?q=weather&apiKey=a358c0da42374f6f8aa31d98c37a79c9',
        method: 'GET',
      }),
    }),
  }),
});

export const {
    useFetchforCityMutation,
    useFetchLatestNewsQuery,
} = endpointsApiFunc;
