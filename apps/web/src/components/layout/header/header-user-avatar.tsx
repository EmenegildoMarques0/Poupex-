"use client"

import { AvatarProfileDropdown } from "@/components/avatar/avatar-profile-dropdown"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import Link from "next/link"
import { useSession } from "@/hooks/auth/session/client"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function HeaderUserAvatar() {
    const { data: session, loading } = useSession();
      const router = useRouter();
    
      const handleSignOut = useCallback(() => {
        router.replace("/sign-in");
      }, [router]);
    return (
        <>
            {loading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
            ) : session ? (
                <AvatarProfileDropdown
                    data={{
                        name: session.name,
                        email: session.email,
                    }}
                    
                    handleSignOut={handleSignOut}
                />
            ) : (
                <Link href="/sign-in">
                    <Button type="button">Fazer login</Button>
                </Link>
            )}
        </>
    )
}