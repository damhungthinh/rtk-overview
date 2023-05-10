import { User, UserForm, UserQueryParams } from "../../../models/User";
import { apiSlice, apiUrls } from "../../config";

/**
 * App Settings API slice
 */
export const users = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["users", "user-info"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      findUsers: builder.query<Array<User>, UserQueryParams>({
        query: (params) => ({
          endpoint: apiUrls.users.base,
          method: "GET",
          params,
        }),
        providesTags: ["users"],
      }),
      getUser: builder.mutation<User, number>({
        query: (id) => ({
          endpoint: `${apiUrls.users.base}/${id}`,
          method: "GET",
        }),
      }),
      addUsers: builder.mutation<void, UserForm>({
        query: (data) => ({
          endpoint: apiUrls.users.base,
          method: "POST",
          data,
        }),
        invalidatesTags: ["users"],
      }),
    }),
    overrideExisting: false,
  });

export const { useFindUsersQuery, useGetUserMutation, useAddUsersMutation } =
  users;
