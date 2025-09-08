import React from 'react'

export type TwemojiIconProps = {
  code: string // e.g. '1f334' for 🌴, '1f54a' for 🕊️
  size?: number
  alt?: string
  className?: string
  style?: React.CSSProperties
}

// Renders a Twemoji SVG from a CDN for pixel-perfect, cross-platform consistency.
// Uses a regular <img> to avoid Next.js remote image config.
export function TwemojiIcon({ code, size = 64, alt = '', className, style }: TwemojiIconProps) {
  const src = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        aspectRatio: '1 / 1',
        objectFit: 'contain',
        ...style
      }}
    />
  )
}

