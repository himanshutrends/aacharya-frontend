"use client";
import React, { useState, useEffect } from "react";
import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";
import { ThemeProvider } from "@/components/themeprovider";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useUser } from "@/context/User";
function HomeSearch() {
  const { user } = useUser();
  const param = useSearchParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    (async () => {
      if (user) {
        const q = param.get("q");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}?q=${q}`,
          {
            user: user,
          }
        );
        if (response.data) {
          console.log(response.data);
          setVideos(response.data);
        }
      }
    })();
  }, [user]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="grid h-screen w-full pl-[60px]">
          <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
              <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground" />
              </Button>
            </div>
            <LeftNav />
          </aside>

          <UpNav />

          <div className="">
            <main className="overflow-auto flex flex-col items-center justify-center ">
              <h1 className="font-bold text-3xl mb-16">
                Search Results from Youtube
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {videos && videos.map((item, index) => (<div className="w-80 rounded" key={index}>
                        <Link href={`/video/${item.video_id}`} key={index}>
                          <img src={`https://i.ytimg.com/vi/${item.video_id}/maxresdefault.jpg`} className="rounded-lg object-contain" alt={item.title} />
                          <p className="font-medium text-lg">{item.title}</p>
                        </Link>
                      </div>))}
                <img src="https://i.ytimg.com/vi/1X7fzv6l9G0/1.jpg" className="rounded-lg object-contain" alt="title" />
                {/* Loading Effect Here edit */}
                {/* <div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div>
                <div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div><div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div><div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div><div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div><div className="animate-pulse space-y-3">
                  <div className="bg-slate-300 h-[180px] w-[320px] rounded-xl" />
                  <div className="bg-slate-300 h-4 w-[250px]" />
                </div> */}
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
export default HomeSearch;
