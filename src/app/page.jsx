// pages/index.js
'use client';
import React from 'react';
import LeftNav from '@/components/leftnav';
import UpNav from '@/components/upnav';
import { Triangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import HeroSectionWithEmailInput from '@/components/ui/HeroToolkit';
import { ThemeProvider } from 'next-themes';
function Index() {
    return (<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <div className="grid h-screen w-full pl-[53px]">
          <div className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
              <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground"/>
              </Button>
            </div>
            <LeftNav />
          </div>
          <div className="flex flex-col">
            <UpNav />
            <main className=" flex justify-center">
              <HeroSectionWithEmailInput />
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>);
}
export default Index;
