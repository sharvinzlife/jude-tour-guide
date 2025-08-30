import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-emerald-500/20 transform hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Kerala Primary - Emerald theme
        default:
          "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/25 active:bg-emerald-800",
        // Kerala Gradient - Professional gradient
        gradient:
          "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/25 active:from-emerald-800 active:to-teal-800",
        // Kerala Sunset - Orange/Gold theme
        sunset:
          "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:shadow-orange-500/25 active:from-orange-700 active:to-amber-700",
        // Professional Outline
        outline:
          "border-2 border-emerald-600 bg-white text-emerald-600 shadow-sm hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-700 hover:shadow-md active:bg-emerald-100",
        // Glass effect for Kerala theme
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 shadow-lg hover:bg-white/20 hover:shadow-xl active:bg-white/30",
        // Secondary Kerala style
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-md active:bg-gray-300",
        // Ghost Kerala style
        ghost:
          "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100",
        // Link style
        link: "text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700 hover:scale-100 active:scale-100",
        // Destructive
        destructive:
          "bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/25 active:bg-red-800",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md has-[>svg]:px-2.5",
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        lg: "h-12 px-8 text-base font-semibold has-[>svg]:px-6",
        xl: "h-14 px-10 text-lg font-semibold has-[>svg]:px-8 rounded-xl",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const isDisabled = disabled || loading

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {loading ? loadingText || children : children}
    </Comp>
  )
}

export { Button, buttonVariants, type ButtonProps }
