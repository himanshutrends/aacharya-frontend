"use client";
// using pseudo data
import data from "./data";

import React, { useEffect } from "react";
import {
  Triangle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
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
import { ScrollArea } from "@/components/ui/scroll-area";

import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";

import ActivityCalendar from "react-activity-calendar";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/themeprovider"

import Image from 'next/image'

import axios from 'axios'

import { remark } from 'remark'
import remarkHtml from 'remark-html'

export function Dashboard() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const [profile, setProfile] = React.useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/dashboard/', {
        "user": user
      })
      console.log(response.data)
      setProfile(response.data)
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const markdownToHtml = (markdown: string) => {
    return remark().use(remarkHtml).processSync(markdown).toString()
  }


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
                      <CardTitle>Watch History</CardTitle>
                      <CardDescription>
                        All topics learned with videos
                      </CardDescription>
                    </CardHeader>
                    {profile && (profile as { watchHistory?: string[] })?.watchHistory?.map((video, index) => (
                      <CardContent key={index}>
                        <Card className="w-full h-full">
                          <CardHeader>
                            <CardTitle>{(video as { topic?: { category?: string } })?.topic?.category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <HoverCard>
                              <HoverCardTrigger>
                                <Badge>{video?.video?.description?.channelTitle}</Badge>
                              </HoverCardTrigger>
                              <AspectRatio ratio={parseFloat("16/9")}>
                                <HoverCardContent className="h-full">
                                  <img className="rounded-md" src={video?.video?.description?.thumbnails?.maxres?.url}></img>
                                  <p className="bold size-10 w-full">{video?.video?.description?.channelTitle}</p>
                                </HoverCardContent>
                              </AspectRatio>
                            </HoverCard>
                          </CardContent>
                        </Card>
                      </CardContent>
                    ))}
                  </Card>
                </div>
                <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 gap-5">
                  <Card className="w-full h-[10%] lg:col-span-1">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Image
                          src={user?.picture ?? ''}
                          className="h-12 w-12 rounded-full"
                          alt="user profile"
                          width={100}
                          height={100}
                        />
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
                        <div dangerouslySetInnerHTML={{ __html: markdownToHtml((profile as { notes?: string[] })?.notes?.[0]?.notes) }}></div>
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
