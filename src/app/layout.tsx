// This is the root layout that only handles non-locale routing
// The actual content is handled by the [locale]/layout.tsx
// No HTML/body tags here to prevent nesting with locale layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
