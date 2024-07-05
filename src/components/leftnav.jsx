import React from "react";
import { Home, LogOut, SquareUser, } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/User";
function LeftNav() {
    const router = useRouter();
    const { logout, loading, error } = useUser();
    const handleLogout = async () => {
      logout();
      if (!loading && !error.status) router.push("auth/login")
    };
    return (<div className="flex flex-col justify-between h-full">
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg bg-muted" aria-label="Aacharya">

              <Link href="/"><Home className="size-5"/></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Home
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Models">
              <Link href="/dashboard"><SquareUser className="size-5"/></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Profile
          </TooltipContent>
        </Tooltip>
        {/*  */}
        {/*  */}
        {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Settings"
                  >
                    <Settings2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip> */}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {/*  */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account" onClick={handleLogout}>
              <LogOut className="size-5"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Logout
          </TooltipContent>
        </Tooltip>
      </nav>
    </div>);
}
export default LeftNav;
