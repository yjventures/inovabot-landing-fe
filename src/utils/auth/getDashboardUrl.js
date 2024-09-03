import { getCookie } from 'cookies-next'

export function getDashboardUrl() {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData)
  const { type: role } = { ...user }
  const dashboardRootURL = process.env.NEXT_PUBLIC_DASHBOARD_URL
  if (['admin', 'super-admin'].includes(role)) return `${dashboardRootURL}/admin/dashboard`
  else if (['company-admin'].includes(role)) return `${dashboardRootURL}/company/dashboard`
}
