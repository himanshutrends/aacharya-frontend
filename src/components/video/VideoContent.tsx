import React, { useEffect, useRef } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

// video components
import TranscriptHighlighter from '@/components/video/TranscriptHighlighter';

// context
import { useTime } from '@/context/TimeContext';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: any;
    }
}

export const VideoDisplay: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const transcriptRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Window['YT']['Player'] | null>(null);
    const intervalRef = useRef<number | null>(null);

    const { updateCurrentTime } = useTime();

    // Load the YouTube iframe API script
    useEffect(() => {
        const existingScript = document.getElementById('youtube-iframe-script');
        if (!existingScript) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-script';
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            if (!playerRef.current) {
                playerRef.current = new window.YT.Player('youtube-player', {
                    videoId: params.slug,
                    events: {
                        'onStateChange': onPlayerStateChange,
                    }
                });
            }
        };

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    const onPlayerStateChange = (event: Window['YT']['OnStateChangeEvent']) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            intervalRef.current = window.setInterval(() => {
                updateCurrentTime(playerRef.current?.getCurrentTime() ?? 0);
            }, 500);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };

    // Clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="relative hidden flex-col items-start gap-8 md:flex">
            <AspectRatio ratio={16 / 9}>
                <div className="w-[100%] h-[100%] rounded-[10px]" id="youtube-player" />
            </AspectRatio>
            <div className="grid w-full gap-3">
                <div ref={transcriptRef} className="w-full h-64 overflow-auto p-2 border rounded" style={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                    <TranscriptHighlighter params={params} />
                </div>
                <Button>
                    Summarize
                    <Sparkles className="size-4" />
                </Button>
            </div>
        </div>
    )
};