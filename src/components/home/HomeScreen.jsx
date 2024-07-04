"use client";
import React, { useState, useEffect } from "react";
import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";
import { ThemeProvider } from "@/components/themeprovider";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
                const q = param.get('q');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}?q=${q}`, {
                    user: user,
                });
                if (response.data) {
                    console.log(response.data);
                    setVideos(response.data);
                }
            }
        })();
    }, [user]);
    return (<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <div className="grid h-screen w-full pl-[53px]">
              <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                  <Button variant="outline" size="icon" aria-label="Home">
                    <Triangle className="size-5 fill-foreground"/>
                  </Button>
                </div>
                <LeftNav />
              </aside>
              <div className="flex flex-col">
                <header>
                  <UpNav />
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-3">
                  <div className="relative hidden flex-row items-start gap-8 md:flex lg:col-span-3  lg:row-span-2">
                    {videos && videos.map((item, index) => (<AspectRatio ratio={16 / 9} key={index}>
                        <Link href={`/video/${item.video_id}`} key={index}>
                          <Image src={`https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg`} className="rounded-[10px] h-[100%] w-[100%] object-contain" alt={item.title} width={240} height={240}/>
                        </Link>
                      </AspectRatio>))}
                  </div>
                </main>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>);
}
export default HomeSearch;
