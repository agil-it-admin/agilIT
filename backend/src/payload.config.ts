import { sqliteAdapter } from '@payloadcms/db-sqlite'
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.resolve(dirname, '../agilit.db')}`,
    },
  }),
  sharp,
})
