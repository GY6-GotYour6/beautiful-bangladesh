import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

/** Shared Payload Local API instance (server-only). */
export async function getPayloadClient() {
  return getPayload({ config })
}
