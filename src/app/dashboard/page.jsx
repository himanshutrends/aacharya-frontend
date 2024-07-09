"use client";
// react
import React, { useEffect, useCallback, useState } from "react"
import data from "./data"
// components
import Link from "next/link"
import Image from "next/image"
import UpNav from "@/components/upnav"
import { Triangle } from "lucide-react"
import LeftNav from "@/components/leftnav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ActivityCalendar from "react-activity-calendar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/themeprovider"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
// lib
import axios from "axios"
// react components
import Notes from "@/components/dashboard/Notes"
import { isAuthenticated } from "@/components/auth/isAuthenticated"
// import image
import  useProfile  from "@/assets/images/user_profile.jpg"
// context
import { useUser } from "@/context/User"

function Dashboard() {
  const { user, error, loading } = useUser();
  const [watchHistory, setWatchHistory] = useState(null);
  const [focusedNote, setFocusedNote] = useState("Click on a video to view notes");
  const [title, setTitle] = useState("Anonymous");

  const fetchProfile = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}dashboard/`, {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + user.access_token
            }
          }
        );
        setWatchHistory(response.data["watch_history"]);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleVideoClick = (note, title) => {
    if (!note?.notes) {
      setFocusedNote("No notes available");
    } else {
      setFocusedNote(note.notes);
    }
    setTitle(title);
  };

  if (loading) return <div>Loading...</div>;
  if (error?.status) return <div>{error.message}</div>;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="grid h-screen w-full pl-[53px]">
          <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
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
                className="relative h-full hidden flex-col items-start gap-4 md:flex lg:col-span-2"
                x-chunk="dashboard-03-chunk-0"
              >
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle>Watch History</CardTitle>
                    <CardDescription>
                      All topics learned with videos
                    </CardDescription>
                  </CardHeader>
                  {watchHistory &&
                    watchHistory.map((item, index) => (
                      <CardContent className="overflow-y-scroll" key={index}>
                        <Card className="w-full h-full">
                          <CardHeader>
                            <CardTitle>{item?.topic?.category}</CardTitle>
                          </CardHeader>
                          <CardContent className="overflow-x-scroll flex gap-2">
                            {item.videos.map((videoItem, index) => (
                              <HoverCard key={index}>
                                <HoverCardTrigger>
                                  <Badge onClick={() => handleVideoClick(videoItem.notes[0], videoItem.description?.channelTitle)}>
                                    {videoItem.description?.channelTitle}
                                  </Badge>
                                </HoverCardTrigger>
                                <AspectRatio ratio={parseFloat("16/9")}>
                                  <HoverCardContent className="h-full">
                                    <Image
                                      className="rounded-md"
                                      src={
                                        videoItem.description?.thumbnails
                                          ?.maxres?.url || ""
                                      }
                                      alt="video thumbnail"
                                      width={500}
                                      height={500}
                                    />
                                    <p className="bold size-10 w-full">
                                      {videoItem.description?.channelTitle}
                                    </p>
                                  </HoverCardContent>
                                </AspectRatio>
                              </HoverCard>
                            ))}
                          </CardContent>
                        </Card>
                      </CardContent>
                    ))}
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Recommended Videos</CardTitle>
                    <CardDescription>
                      What to watch next? Watch these videos to complete your path.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center overflow-x-scroll space-x-4">
                      <div className="w-80 rounded" >
                        <Link href="/video/rHux0gMZ3Eg">
                          <Image 
                            src="https://i.ytimg.com/vi/rHux0gMZ3Eg/maxresdefault.jpg" 
                            className="rounded-lg object-contain"
                            width={500}
                            height={500}  
                          />
                          <p className="font-medium text-lg">Python Django Tutorial for Beginners</p>
                        </Link>
                      </div>
                      <div className="w-80 rounded" >
                        <Link href="/video/erEgovG9WBs">
                          <Image 
                            src="https://i.ytimg.com/vi/erEgovG9WBs/maxresdefault.jpg" 
                            className="rounded-lg object-contain"
                            width={500}
                            height={500}
                          />
                          <p className="font-medium text-lg">100+ Web Development Things you Should Know</p>
                        </Link>
                      </div>
                      <div className="w-80 rounded" >
                        <Link href="/video/30LWjhZzg50">
                          <Image 
                            src="https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg" 
                            className="rounded-lg object-contain" 
                            width={500}
                            height={500}
                          />
                          <p className="font-medium text-lg">Learn TypeScript – Full Tutorial</p>
                        </Link>
                      </div>
                      <div className="w-80 rounded" >
                        <Link href="/video/BBpAmxU_NQo">
                          <Image 
                            src="https://i.ytimg.com/vi/BBpAmxU_NQo/maxresdefault.jpg" 
                            className="rounded-lg object-contain"
                            width={500}
                            height={500}
                          />
                          <p className="font-medium text-lg">Data Structures and Algorithms for Beginners</p>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 gap-5">
                <Card className="w-full h-[10%] lg:col-span-1">
                  <CardHeader>
                    <div className="flex items-center space-x-4">   
                      <Image
                        src={user?.picture || useProfile.src}
                        className="h-12 w-12 rounded-full"
                        alt="user profile"
                        width={100}
                        height={100}
                      />
                      <div className="space-y-2">
                        <p className="h-4"> Hi {user?.name}!</p>
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
                    />
                  </CardContent>
                </Card>
                <Notes focusedNote={focusedNote} title={title} />
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

Dashboard.displayName = 'Dashboard';
export default isAuthenticated(Dashboard);
