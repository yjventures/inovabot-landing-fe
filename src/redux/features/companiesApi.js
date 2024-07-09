import api from '@/redux/api/apiSlice'

const rootApi = '/companies'

const companiesApi = api.injectEndpoints({
  endpoints: build => ({
    addCompanyInfo: build.mutation({
      query: payload => ({
        url: `${rootApi}/create`,
        method: 'POST',
        body: payload
      })
    }),
    getAllSubscriptions: build.query({
      query: () => ({
        url: '/packages/get-all'
      })
    }),
    subscribeToPackage: build.mutation({
      query: payload => ({
        url: '/subscription/create',
        method: 'POST',
        body: payload
      })
    })
  })
})

export const { useAddCompanyInfoMutation, useGetAllSubscriptionsQuery, useSubscribeToPackageMutation } = companiesApi
