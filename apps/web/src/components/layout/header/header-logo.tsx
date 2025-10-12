import Link from "next/link"
import { memo } from "react"

export const HeaderLogo = memo(function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground">
                <span className="text-xs font-bold text-background">P</span>
            </div>
            <span className="text-base font-semibold md:text-lg">Poupex</span>
        </Link>
    )
})
