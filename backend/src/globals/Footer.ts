import type { GlobalConfig } from 'payload'

const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'tagline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          required: true,
          fields: linkFields,
        },
      ],
    },
    {
      name: 'copyrightTemplate',
      type: 'text',
      required: true,
      defaultValue: '© {year} agil.IT. All rights reserved.',
      admin: {
        description: 'Use {year} for the current year.',
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: linkFields,
    },
  ],
}
