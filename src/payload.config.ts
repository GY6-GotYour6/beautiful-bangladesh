import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Destinations } from './collections/Destinations'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { LandingPageGlobal } from './globals/LandingPage'
// NOTE: `migrations` is intentionally not imported — see the prodMigrations
// comment on the db adapter below. Re-add the import when re-enabling it.

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Destinations, ContactSubmissions],
  globals: [LandingPageGlobal],
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  },
  secret: process.env.PAYLOAD_SECRET || 'build-placeholder-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      // Every one of these bounds a different way to hang. pg leaves them all
      // unbounded by default, which is how an unreachable Neon turned into
      // Vercel builds that ran until the platform killed them.
      //   connectionTimeoutMillis — opening the socket
      //   query_timeout          — client-side wait for a result
      //   statement_timeout      — server-side execution cap
      // Never leave these unset. Raise statement_timeout before running any
      // migration with heavy DDL.
      connectionTimeoutMillis: 10_000,
      query_timeout: 15_000,
      statement_timeout: 15_000,
    },
    // prodMigrations is DELIBERATELY NOT SET.
    //
    // It does not merely enable `payload migrate` — it makes Payload attempt
    // migrations every time it initialises with NODE_ENV=production, including
    // during `next build`'s page-data collection. With Neon unreachable from
    // Vercel's build environment that hangs the build, which is exactly what
    // happened on 2026-08-11 (twice: once via the build script, once via this).
    //
    // Re-enable `prodMigrations: migrations` together with the
    // `npm run build:migrate` build command, and only once Neon is confirmed
    // reachable from Vercel builds.
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
