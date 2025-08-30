import { SVGProps } from 'react'

interface CoconutTreeIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}
export function CoconutTreeIcon({ size = 24, className = '', ...props }: CoconutTreeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Coconuts */}
      <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="9" cy="5" r="1.5" fill="currentColor" opacity="0.9"/>
      <circle cx="11" cy="6.5" r="1.5" fill="currentColor" opacity="0.7"/>
      
      {/* Palm fronds */}
      <path
        d="M12 8c-2-4 -6-2 -8-6 M12 8c-4-2 -2-6 -6-8 M12 8c0-4 4-2 6-6 M12 8c2-4 6-2 8-6 M12 8c4-2 2-6 6-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      
      {/* Trunk */}
      <path
        d="M12 8c0 4 -1 8 -2 12 M12 8c0 4 1 8 2 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Trunk texture lines */}
      <path
        d="M10.5 12h3 M10.2 15h3.6 M10.5 18h3"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
