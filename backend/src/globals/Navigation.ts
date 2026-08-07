import type { GlobalConfig } from 'payload'

const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      required: true,
      minRows: 1,
      fields: linkFields,
      admin: {
        description: 'Primary header nav items (desktop + mobile).',
      },
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Start sourcing',
      admin: {
        description: 'Opens the quote / sourcing modal.',
      },
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Learn more',
    },
    {
      name: 'secondaryCtaHref',
      type: 'text',
      required: true,
      defaultValue: '/#overview',
    },
  ],
}
