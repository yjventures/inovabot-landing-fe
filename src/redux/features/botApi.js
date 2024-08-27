import api from '@/redux/api/apiSlice'

const botApi = api.injectEndpoints({
  endpoints: build => ({
    getThreadMessages: build.query({
      query: threadId => ({
        url: `/threads/messages/${threadId}`
      })
    }),
    getBotUsingSlug: build.query({
      query: slug => ({
        url: `/bots/get-by-url/${slug}`
      })
    }),
    createThread: build.mutation({
      query: payload => ({
        url: '/threads/get-thread',
        method: 'POST',
        body: payload
      })
    })
  })
})

export const { useGetThreadMessagesQuery, useGetBotUsingSlugQuery, useCreateThreadMutation } = botApi
