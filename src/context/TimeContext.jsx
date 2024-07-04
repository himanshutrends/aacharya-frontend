import React, { createContext, useContext, useState } from 'react';
// Set default values and functions in the context
const TimeContext = createContext({
    currentTime: 0,
    updateCurrentTime: () => { }
});
export const useTime = () => useContext(TimeContext);
export const TimeProvider = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const updateCurrentTime = (time) => {
        setCurrentTime(time);
    };
    return (<TimeContext.Provider value={{ currentTime, updateCurrentTime }}>
      {children}
    </TimeContext.Provider>);
};
