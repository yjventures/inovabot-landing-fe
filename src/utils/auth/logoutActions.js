import api from '@/redux/api/apiSlice'
import { deleteCookie } from 'cookies-next'

export const logoutActions = (dispatch, refresh) => {
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
  deleteCookie('userData')
  dispatch(api.util.resetApiState())
  refresh()
}
