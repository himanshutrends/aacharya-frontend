'use client'
import {
  CornerDownLeft,
  Mic,
  Triangle,
  Sparkles,
  NotebookTabs,
  List,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

import { AspectRatio } from "@/components/ui/aspect-ratio"

import LeftNav from "@/components/leftnav";
import UpNav from "@/components/upnav";
import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

interface VideoPageProps {
  params: {
    slug: string;
  };
}

const VideoPage: React.FC<VideoPageProps> = ({ params }) => {
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<Window['YT']['Player'] | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeSegmentRef = useRef<HTMLSpanElement | null>(null);

  const fetchTranscript = async (videoId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/chat/transcript?q=${videoId}`);
      const data: TranscriptSegment[] = await response.json();
      setTranscript(data);
    } catch (error) {
      console.error('Failed to fetch transcript:', error);
    }
  };

  useEffect(() => {
    if (params.slug) {
      fetchTranscript(params.slug);
    }
  }, [params.slug]);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: params.slug,
        events: {
          'onStateChange': onPlayerStateChange,
        }
      });
    };

    return () => {
      playerRef.current?.destroy();
    };
  }, [params.slug]);

  const onPlayerStateChange = (event: Window['YT']['OnStateChangeEvent']) => {
    if (event.data === YT.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        setCurrentTime(playerRef.current?.getCurrentTime() ?? 0);
      }, 500);
      return () => clearInterval(interval);
    }
  };

  const getHighlightedText = () => {
    let lastEndTime = 0; // Track the last end time of the last word
  
    return transcript.map((segment, segmentIndex) => {
      const words = segment.text.split(' ');
      const wordDuration = segment.duration / words.length;
  
      return (
        <span key={segmentIndex} style={{ display: 'block' }}>
          {words.map((word, wordIndex) => {
            const wordStartTime = segment.start + wordIndex * wordDuration;
            const wordEndTime = wordStartTime + wordDuration;
            const isActive = currentTime >= wordStartTime && currentTime < wordEndTime;
            const isHighlighted = currentTime >= wordStartTime;
  
            if (isActive) {
              lastEndTime = wordEndTime; // Update the last end time to this word's end time if it's active
            }
  
            return (
              <span
                key={wordIndex}
                ref={isActive ? activeSegmentRef : null}
                style={{
                  backgroundColor: isHighlighted ? 'skyBlue' : 'transparent',
                  transition: 'background-color 300ms ease-in-out'
                }}
              >
                {word + ' '}
              </span>
            );
          })}
        </span>
      );
    });
  };  

  useEffect(() => {
    if (activeSegmentRef.current) {
      transcriptRef.current?.scrollTo({
        top: activeSegmentRef.current.offsetTop - transcriptRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [currentTime, transcript]);

  return (
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
        <MainContent getHighlightedText={getHighlightedText} transcriptRef={transcriptRef} />
      </div>
    </TooltipProvider>
  );
};

interface MainContentProps {
  getHighlightedText: () => JSX.Element[];
  transcriptRef: React.RefObject<HTMLDivElement>;
}

const MainContent: React.FC<MainContentProps> = ({ getHighlightedText, transcriptRef }) => (
  <div className="flex flex-col">
    <UpNav />
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2">
      <VideoDisplay getHighlightedText={getHighlightedText} transcriptRef={transcriptRef} />
      <OtherComponents />
    </main>
  </div>
);

const VideoDisplay: React.FC<{ getHighlightedText: () => JSX.Element[], transcriptRef: React.RefObject<HTMLDivElement> }> = ({ getHighlightedText, transcriptRef }) => (
  <div className="relative hidden flex-col items-start gap-8 md:flex">
    <AspectRatio ratio={16 / 9}>
      <div className="w-[100%] h-[100%] rounded-[10px]" id="youtube-player" />
    </AspectRatio>
    <div className="grid w-full gap-3">
      <div ref={transcriptRef} className="w-full h-64 overflow-auto p-2 border rounded" style={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
        {getHighlightedText()}
      </div>
      <Button>
        Summarize
        <Sparkles className="size-4" />
      </Button>
    </div>
  </div>
);

const OtherComponents: React.FC = () => (
  <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-1">
    <Badge variant="outline" className="absolute right-3 top-3">
      Output
    </Badge>
    <div className="flex-1" />
    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
      <TooltipTriggerAndContent />
    </form>
  </div>
);

const TooltipTriggerAndContent: React.FC = () => (
  <div className="flex items-center p-3 pt-0">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <NotebookTabs className="size-4" />
          <span className="sr-only">Add to Notes</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">Add to Notes</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <List className="size-4" />
          <span className="sr-only">Get key points</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">Get key points</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Mic className="size-4" />
          <span className="sr-only">Use Microphone</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">Use Microphone</TooltipContent>
    </Tooltip>
    <Button type="submit" size="sm" className="ml-auto gap-1.5">
      Send Message
      <CornerDownLeft className="size-3.5" />
    </Button>
  </div>
);

export default VideoPage;
