import React, { useEffect, useRef, memo } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
// video components
import TranscriptHighlighter from '@/components/video/TranscriptHighlighter';
import TranscriptLoader from '@/components/video/loader/TranscriptLoader';
import VideoLoader from '@/components/video/loader/VideoLoader';
// context
import { useTime } from '@/context/TimeContext';
import { UseVideoControl } from '@/context/VideoControl';
import { useUser } from '@/context/User';
import { useConversation } from '@/context/ConversationContext';
import { debounce } from 'lodash';
import axios from 'axios';

const SummarizeButton = memo(({ loading, handleSummarize }) => {
  return (
    <Button onClick={handleSummarize} disabled={loading}>
      {loading ? 'Loading...' : 'Notes'}
      <Sparkles className="size-4" />
    </Button>
  );
});

const VideoDisplay = ({ videoId }) => {
  const transcriptRef = useRef(null);
  const { playerRef } = UseVideoControl();
  const intervalRef = useRef(null);
  const { conversation } = useConversation();
  const { updateCurrentTime, currentTime } = useTime();
  const { user, loading, setLoading } = useUser();

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
    const loadYouTubeAPI = () => {
      const existingScript = document.getElementById('youtube-iframe-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-script';
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: videoId,
          events: { 'onStateChange': onPlayerStateChange }
        });
      }
    };

    loadYouTubeAPI();

    return () => {
      window.onYouTubeIframeAPIReady = null;
      clearInterval(intervalRef.current);
    };
  }, [onPlayerStateChange, videoId, playerRef]);

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

  const handleSummarize = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        if (user) {
          const summary = axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/summarize?q=${videoId}`, {
            conversation: conversation
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.access_token}`
            }
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <AspectRatio ratio={16 / 9}>
        {loading ? <VideoLoader /> :
          <div
            className="w-[100%] h-[100%] rounded-[10px]"
            id="youtube-player"
          />
        }
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
          {loading ? <TranscriptLoader /> :
            <TranscriptHighlighter videoId={videoId} />}
        </div>
        <SummarizeButton loading={loading} handleSummarize={handleSummarize} />
      </div>
    </div>
  );
};

export default VideoDisplay;
