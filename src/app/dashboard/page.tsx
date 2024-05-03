"use client";
// using pseudo data
import data from "./data";

import * as React from "react";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Sparkles,
  NotebookTabs,
  List,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Calendar } from "@/components/ui/calendar";

import { ScrollArea } from "@/components/ui/scroll-area";

import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";

import ActivityCalendar from "react-activity-calendar";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/themeprovider"

export function Dashboard() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
      <TooltipProvider>
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

            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-3">
              <div
                className="relative hidden flex-col items-start gap-8 md:flex lg:col-span-2"
                x-chunk="dashboard-03-chunk-0"
              >
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>
                      All topics learned with videos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Card className="w-full h-full">
                      <CardHeader>
                        <CardTitle>Topic 1</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge>Python by Krish Naik</Badge>
                            </HoverCardTrigger>
                            <AspectRatio ratio="16/9">
                          <HoverCardContent className="h-full">
                          
                          <img className="rounded-md" src="https://static-cse.canva.com/blob/1454052/1600w-wK95f3XNRaM.jpg"></img>
                          <p className="bold size-10 w-full">Python by Krish Naik</p>
                          
                          </HoverCardContent></AspectRatio>
                        </HoverCard>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 gap-5">
                <Card className="w-full h-[10%] lg:col-span-1">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img src={user.picture} className="h-12 w-12 rounded-full"></img>
                      <div className="space-y-2">
                        <p className="h-4"> Hi {user.name}!</p>
                        <Badge variant="outline">AI Architect</Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="w-full h-[30%] lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Streaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityCalendar
                      data={data}
                      blockSize={14}
                      blockRadius={3}
                      blockMargin={2}
                      fontSize={16}
                      theme={{
                        light: [
                          "#f0f0f0",
                          "#c4edde",
                          "#7ac7c4",
                          "#f73859",
                          "#384259",
                        ],
                        dark: [
                          "#383838",
                          "#4D455D",
                          "#7DB9B6",
                          "#F5E9CF",
                          "#E96479",
                        ],
                      }}
                    />
                  </CardContent>
                </Card>

                <Card className="w-full h-[60%] lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[35vh]">
                      Jokester began sneaking into the castle in the middle of
                      the night and leaving jokes all over the place: under the
                      king's pillow, in his soup, even in the royal toilet. The
                      king was furious, but he couldn't seem to stop Jokester.
                      And then, one day, the people of the kingdom discovered
                      that the jokes left by Jokester were so funny that they
                      couldn't help but laugh. And once they started laughing,
                      they couldn't stop.Jokester began sneaking into the castle
                      in the middle of the night and leaving jokes all over the
                      place: under the king's pillow, in his soup, even in the
                      royal toilet. The king was furious, but he couldn't seem
                      to stop Jokester. And then, one day, the people of the
                      kingdom discovered that the jokes left by Jokester were so
                      funny that they couldn't help but laugh. And once they
                      started laughing, they couldn't stop.Jokester began
                      sneaking into the castle in the middle of the night and
                      leaving jokes all over the place: under the king's pillow,
                      in his soup, even in the royal toilet. The king was
                      furious, but he couldn't seem to stop Jokester. And then,
                      one day, the people of the kingdom discovered that the
                      jokes left by Jokester were so funny that they couldn't
                      help but laugh. And once they started laughing, they
                      couldn't stop.
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline">By Krish Naiks's Python Video</Badge>
                  </CardFooter>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
      </ThemeProvider>
    )
  );
}

export default withPageAuthRequired(Dashboard);
