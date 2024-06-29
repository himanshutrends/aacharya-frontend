import React, { createContext, useContext, useRef, useCallback } from 'react';

// Create the context
interface VideoControlContextType {
    seekTo: (time: number) => void;
    playerRef: React.MutableRefObject<Window['YT']['Player'] | null>;
}

// Create the context with default values
const VideoControlContext = createContext<VideoControlContextType>({
    seekTo: () => { },
    playerRef: { current: null },
});

// Context provider component
export const VideoControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const playerRef = useRef<Window['YT']['Player'] | null>(null);

    const seekTo = useCallback((timeInSeconds: number) => {
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(timeInSeconds, true);
        } else {
            console.error('YouTube Player is not initialized yet or seekTo is not available.');
        }
    }, []);

    return (
        <VideoControlContext.Provider value={{ seekTo, playerRef }}>
            {children}
        </VideoControlContext.Provider>
    );
};

// Hook to use the video control context
export const UseVideoControl = () => useContext(VideoControlContext);