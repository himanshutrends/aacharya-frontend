import React, { createContext, useContext, useRef, useCallback } from 'react';

// Create the context
interface VideoControlContextType {
    seekTo: (time: number) => void;
    setPlayer: (player: Window['YT']['Player'] | null) => void;
}

// Create the context with default values
const VideoControlContext = createContext<VideoControlContextType>({
    seekTo: () => {},
    setPlayer: () => {}
});

// Context provider component
export const VideoControlProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const playerRef = useRef<Window['YT']['Player'] | null>(null);

    const seekTo = useCallback((timeInSeconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(timeInSeconds, true);
        }
    }, []);

    const setPlayer = useCallback((player: Window['YT']['Player'] | null) => {
        playerRef.current = player;
    }, []);

    return (
        <VideoControlContext.Provider value={{ seekTo, setPlayer }}>
            {children}
        </VideoControlContext.Provider>
    );
};

// Hook to use the video control context
export const useVideoControl = () => useContext(VideoControlContext);