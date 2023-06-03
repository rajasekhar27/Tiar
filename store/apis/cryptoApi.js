import {
  buildCreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coingecko.com/";

// api/v3/coins/ethereum/ohlc?vs_currency=usd&days=1

const cryptoApi = createApi({
  reducerPath: "cryptoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCryptoGraph: builder.query({
      query: (data) =>
        `api/v3/coins/${data?.coin}/ohlc?vs_currency=${data?.currency}&days=${data?.days}`,

      keepUnusedDataFor: 86400, // 1 day
    }),
  }),
});

export const { useGetCryptoGraphQuery } = cryptoApi;
export default cryptoApi;
