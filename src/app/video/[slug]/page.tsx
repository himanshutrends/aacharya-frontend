'use client'
import React from 'react';

// components
import UpNav from "@/components/upnav";
import LeftNav from "@/components/leftnav";
import {
  GraduationCap,
} from "lucide-react"

// UI components
import { Button } from "@/components/ui/button"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"

// video components
import { VideoDisplay } from "@/components/video/VideoContent"
import { ChatComponents } from "@/components/video/ChatComponent"

// context
import { TimeProvider } from "@/context/TimeContext"
import { ConversationProvider } from "@/context/ConversationContext"
import { VideoControlProvider } from '@/context/VideoControl';
import { ThemeProvider } from "@/components/themeprovider"


interface VideoPageProps {
  params: {
    slug: string;
  };
}

const VideoPage: React.FC<VideoPageProps> = ({ params }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TimeProvider>
        <VideoControlProvider>
          <TooltipProvider>
            <div className="grid h-screen w-full pl-[53px]">
              <div className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                  <Button variant="outline" size="icon" aria-label="Home">
                    <GraduationCap className="size-5 fill-foreground" />
                  </Button>
                </div>
                <LeftNav />
              </div>
              <div className="flex flex-col">
                <UpNav />
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2">
                  <ConversationProvider>
                    <VideoDisplay params={params} />
                    <ChatComponents params={params} />
                  </ConversationProvider>
                </main>
              </div>
            </div>
          </TooltipProvider>
        </VideoControlProvider>
      </TimeProvider>
    </ThemeProvider>
  );
};

export default VideoPage;
