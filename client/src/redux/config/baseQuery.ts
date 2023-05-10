import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import apiUrls from "./apiUrls";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: apiUrls.baseUrl || "" }
  ): BaseQueryFn<
    {
      endpoint: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ endpoint, method, data, params }) => {
    try {
      const result = await axios({
        url: `http://${baseUrl}/api/v1${endpoint}`,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// const api = createApi({
//   baseQuery: axiosBaseQuery({
//     baseUrl: "https://example.com",
//   }),
//   endpoints(build) {
//     return {
//       query: build.query({ query: () => ({ url: "/query", method: "get" }) }),
//       mutation: build.mutation({
//         query: () => ({ url: "/mutation", method: "post" }),
//       }),
//     };
//   },
// });
