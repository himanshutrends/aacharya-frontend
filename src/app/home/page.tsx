"use client";
import { Triangle } from "lucide-react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from "@/components/ui/button";

import { TooltipProvider } from "@/components/ui/tooltip";

import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";


import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export function HomeSearch() {
  const { user } = useUser();
  return (
    user && <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
          <LeftNav />
        </aside>
        <div className="flex flex-col">
          <header>
            <UpNav />
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative hidden flex-col items-start gap-8 md:flex lg:col-span-1  lg:row-span-1">
              <img
                src="https://www.icegif.com/wp-content/uploads/2022/01/icegif-962.gif"
                className="rounded-[10px] h-[100%] w-[100%]"
              ></img>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default withPageAuthRequired(HomeSearch);
