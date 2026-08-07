import type { GlobalConfig } from 'payload'

const textItem = { name: 'text', type: 'text' as const, required: true }

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'sections',
              type: 'array',
              labels: {
                singular: 'Section',
                plural: 'Sections',
              },
              admin: {
                description:
                  'Drag to reorder homepage sections below the hero. Disable a row to hide it. Use each section type at most once.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Stats', value: 'stats' },
                    { label: 'Services', value: 'services' },
                    { label: 'Provider network', value: 'globalNetwork' },
                    { label: 'Testimonials', value: 'testimonials' },
                    { label: 'Team', value: 'team' },
                    { label: 'Intake', value: 'intake' },
                    { label: 'Blog / Resource Center', value: 'blogSection' },
                    { label: 'FAQ', value: 'faq' },
                  ],
                },
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Uncheck to hide this section on the homepage.',
                  },
                },
              ],
              validate: (value) => {
                if (!Array.isArray(value) || value.length === 0) return true
                const types = value
                  .map((row: { type?: string }) => row?.type)
                  .filter(Boolean)
                if (new Set(types).size !== types.length) {
                  return 'Each section type can only appear once.'
                }
                return true
              },
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'ctaLabel', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                {
                  name: 'items',
                  type: 'array',
                  required: true,
                  minRows: 1,
                  maxRows: 4,
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'ctaLabel', type: 'text', required: true },
                {
                  name: 'items',
                  type: 'array',
                  required: true,
                  fields: [
                    { name: 'key', type: 'text', required: true, admin: { description: 'Stable id, e.g. footprint' } },
                    { name: 'name', type: 'text', required: true },
                    { name: 'tagline', type: 'text', required: true },
                    {
                      name: 'icon',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Server', value: 'server' },
                        { label: 'Cloud', value: 'cloud' },
                        { label: 'Network', value: 'network' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'CPU', value: 'cpu' },
                        { label: 'Globe', value: 'globe' },
                      ],
                    },
                    { name: 'bestFor', type: 'text', required: true },
                    { name: 'weHelpWith', type: 'text', required: true },
                    { name: 'deployTime', type: 'text', required: true },
                    {
                      name: 'features',
                      type: 'array',
                      required: true,
                      fields: [textItem],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Network',
          fields: [
            {
              name: 'globalNetwork',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'ctaLabel', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'items',
                  type: 'array',
                  required: true,
                  fields: [
                    { name: 'quote', type: 'textarea', required: true },
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                    { name: 'company', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Team',
          fields: [
            {
              name: 'team',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'ctaLabel', type: 'text', required: true },
                {
                  name: 'members',
                  type: 'array',
                  required: true,
                  fields: [
                    { name: 'key', type: 'text', required: true },
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                    {
                      name: 'imagePath',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Public path, e.g. /placeholder-images/people/brad-mclaughlin.jpg',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Intake',
          fields: [
            {
              name: 'intake',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'benefits',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
                {
                  name: 'steps',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
                {
                  name: 'needOptions',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
                {
                  name: 'regionOptions',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
                {
                  name: 'footprintOptions',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
                {
                  name: 'timelineOptions',
                  type: 'array',
                  required: true,
                  fields: [textItem],
                },
              ],
            },
          ],
        },
        {
          label: 'Blog section',
          fields: [
            {
              name: 'blogSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'browseAllLabel', type: 'text', required: true },
                {
                  name: 'expertInsights',
                  type: 'array',
                  fields: [
                    { name: 'quote', type: 'textarea', required: true },
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                    { name: 'focus', type: 'text', required: true },
                  ],
                },
                { name: 'expertEyebrow', type: 'text', required: true },
                { name: 'expertHeadline', type: 'text', required: true },
                {
                  name: 'bottomCta',
                  type: 'group',
                  fields: [
                    { name: 'eyebrow', type: 'text', required: true },
                    { name: 'headline', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                    { name: 'ctaLabel', type: 'text', required: true },
                  ],
                },
                {
                  name: 'featuredReport',
                  type: 'group',
                  fields: [
                    { name: 'eyebrow', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'pages', type: 'text', required: true },
                    { name: 'format', type: 'text', required: true },
                    { name: 'audience', type: 'text', required: true },
                    { name: 'ctaLabel', type: 'text', required: true },
                    {
                      name: 'highlights',
                      type: 'array',
                      required: true,
                      fields: [textItem],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'items',
                  type: 'array',
                  required: true,
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
