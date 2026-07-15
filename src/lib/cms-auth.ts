import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

/** Require a logged-in Payload user for /cms routes. */
export async function requireCmsUser() {
  const payload = await getPayloadClient()
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  if (!user) {
    redirect('/admin/login?redirect=/cms')
  }
  return { payload, user }
}
