import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimeContextType {
  currentTime: number;
  updateCurrentTime: (time: number) => void;
}

// Set default values and functions in the context
const TimeContext = createContext<TimeContextType>({
  currentTime: 0,
  updateCurrentTime: () => { }
});

export const useTime = () => useContext(TimeContext);


export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const updateCurrentTime = (time: number) => {
    setCurrentTime(time);
  }
  return (
    <TimeContext.Provider value={{ currentTime, updateCurrentTime }}>
      {children}
    </TimeContext.Provider>
  );
};
