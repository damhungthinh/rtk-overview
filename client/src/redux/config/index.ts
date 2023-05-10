// Import the RTK Query methods from the REACT - specific entry point
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import apiUrls from "./apiUrls";

/**
 * Initialize an empty api service taht we'ill inject endpoints intio later as needed
 */
export const apiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});

export { apiUrls };
