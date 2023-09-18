import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuthData} from "../../models/auth.models";
import {TInputs} from "../../pages/AuthPage";

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    tagTypes: ['fetchAuth'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
        headers: {'API-KEY': '3dbf5c57-395a-4f66-bcf2-b9af8c3d8406'},
        credentials: "include"
    }),
    endpoints: builder => ({
        getAuth: builder.query<{ data: IAuthData }, null>({
            query: () => ({
                url: 'auth/me',
            }),
            providesTags: ['fetchAuth'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE'
            }),
            invalidatesTags: ['fetchAuth']
        }),
        login: builder.mutation<null, TInputs>({

            query: (data) => ({

                url: 'auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['fetchAuth']
        })
    })
})