import api from '@/redux/api/apiSlice'

const botApi = api.injectEndpoints({
  endpoints: build => ({
    getThreadMessages: build.query({
      query: threadId => ({
        url: `/threads/messages/${threadId}`
      })
    })
  })
})

export const { useGetThreadMessagesQuery } = botApi
