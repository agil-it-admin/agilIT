import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl =
  process.env.DATABASE_URL ||
  `file:${path.resolve(dirname, '../agilit.db')}`

const isPostgres = /^postgres(ql)?:\/\//i.test(databaseUrl)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim()

function appUrls(): string[] {
  const urls = [
    'http://localhost:3000',
    'http://localhost:4001',
    process.env.FRONTEND_URL || '',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  ]

  if (process.env.VERCEL_URL) {
    urls.push(`https://${process.env.VERCEL_URL}`)
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    urls.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  return [...new Set(urls.filter(Boolean))]
}

function createDatabaseAdapter() {
  if (isPostgres) {
    return postgresAdapter({
      pool: {
        connectionString: databaseUrl,
      },
      // Cockroach bigint IDs exceed JS safe integers and break auth findByID/login.
      idType: 'uuid',
      // Enable with PAYLOAD_PUSH=true for first seed / schema sync.
      push: process.env.PAYLOAD_PUSH === 'true',
    })
  }

  return sqliteAdapter({
    client: {
      url: databaseUrl,
    },
  })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Colonegotiator CMS',
    },
  },
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:4001'),
  cors: appUrls(),
  csrf: appUrls(),
  collections: [Users, Media, Articles],
  globals: [Navigation, Footer, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: createDatabaseAdapter(),
  plugins: [
    ...(blobToken
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: blobToken,
            // Bypass Vercel serverless 4.5MB body limit for admin uploads.
            clientUploads: true,
          }),
        ]
      : []),
  ],
  sharp,
})
