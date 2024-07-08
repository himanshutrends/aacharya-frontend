import React, { useEffect, useRef } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
// video components
import TranscriptHighlighter from '@/components/video/TranscriptHighlighter';
// context
import { useTime } from '@/context/TimeContext';
import { UseVideoControl } from '@/context/VideoControl';
import { useUser } from '@/context/User';
import { useConversation } from '@/context/ConversationContext';
import { debounce } from 'lodash';
import axios from 'axios';
export const VideoDisplay = ({ params }) => {
    const transcriptRef = useRef(null);
    const { playerRef } = UseVideoControl();
    const intervalRef = useRef(null);
    const { conversation } = useConversation();
    const { updateCurrentTime, currentTime } = useTime();
    const { user } = useUser();
    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            intervalRef.current = window.setInterval(() => {
                updateCurrentTime(playerRef.current?.getCurrentTime() ?? 0);
                console.log("Current time:", playerRef.current?.getCurrentTime());
                saveToServer(playerRef.current?.getCurrentTime() ?? 0);
            }, 500);
        }
        else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };
    
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
    }, [onPlayerStateChange, params.slug, playerRef]);

    const saveToServer = debounce((timestamp) => {
        console.log("Saving to server:", timestamp);
        const token = sessionStorage.getItem('access_token');
        // Axios or fetch to send data to your server
        if (user) {
            // axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}dashboard/update_watch_history`, {
            //     video_id: params?.slug,
            //     timestamp: timestamp
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });
        }
    }, 1000); // Debounce time in milliseconds

    // Clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
        };
    }, []);

    const handleSummarize = () => {
        const summary = axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/summarize?q=${params.slug}`, {
            user: user,
            conversation: conversation
        });
    };

    return (
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <AspectRatio ratio={16 / 9}>
          {/* Loading */}

          <div
            role="status"
            class="flex items-center justify-center h-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>

          {/* Loading End */}

          <div
            className="w-[100%] h-[100%] rounded-[10px]"
            id="youtube-player"
          />
        </AspectRatio>
        <div className="grid w-full gap-3">
          <div
            ref={transcriptRef}
            className="w-full h-64 overflow-auto p-2 border rounded"
            style={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {/* Loading  */}

            <div role="status" class="w-full p-4 space-y-3.5 animate-pulse">
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div class="flex items-center w-full">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>

            {/* Loading end */}
            <TranscriptHighlighter params={params} />
          </div>
          <Button onClick={handleSummarize}>
            Notes
            <Sparkles className="size-4" />
          </Button>
        </div>
      </div>
    );
};
