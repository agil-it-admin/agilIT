import React from 'react'

export const metadata = {
  title: 'Colonegotiator CMS',
  description: 'Content admin for Colonegotiator',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
