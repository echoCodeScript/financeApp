// Import necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API slice named "api"
export const api = createApi({
  // Set base URL dynamically using environment variable
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  // Name the reducer slice in the Redux store
  reducerPath: "main",
  // Define a tag type for data freshness ("Kpis")
  tagTypes: ["Kpis"],
  // Define API endpoints
  endpoints: (build) => ({
    // Endpoint to fetch Kpis data (GET /kpi/kpis/)
    getKpis: build.query({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"], // Updates data tagged with "Kpis"
    }),
  }),
});

// Generate a React hook for the "getKpis" endpoint
export const { useGetKpisQuery } = api;
