import type { CollectionConfig } from 'payload'
import { slugify } from '../utilities/slugify'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'kind', 'featured', 'publishedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data
        const title = typeof data.title === 'string' ? data.title : ''
        const rawSlug = typeof data.slug === 'string' ? data.slug : ''
        if (title.trim() && !rawSlug.trim()) {
          const s = slugify(title)
          if (s) data.slug = s
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment. Auto-fills from title when empty.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Pricing', value: 'Pricing' },
        { label: 'Contract Negotiation', value: 'Contract Negotiation' },
        { label: 'Site Selection', value: 'Site Selection' },
        { label: 'AI Infrastructure', value: 'AI Infrastructure' },
        { label: 'Cost Optimization', value: 'Cost Optimization' },
        { label: 'Procurement', value: 'Procurement' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'article',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Tip', value: 'tip' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'readTime',
      type: 'text',
      required: true,
      defaultValue: '5 min read',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'imageVariant',
      type: 'select',
      required: true,
      defaultValue: 'server-room',
      options: [
        { label: 'Server room', value: 'server-room' },
        { label: 'Exterior', value: 'exterior' },
        { label: 'Cooling aisle', value: 'cooling-aisle' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Illustration used on cards when no thumbnail is set.',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      required: true,
      defaultValue: 'Data center illustration',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Optional header image. Falls back to illustration variant.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'paragraphs',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
