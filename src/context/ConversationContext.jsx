import React, { createContext, useContext, useState } from 'react';
// Set default values and functions in the context
const ConversationContext = createContext({
    conversation: [],
    setConversation: () => { }
});
export const useConversation = () => useContext(ConversationContext);
export const ConversationProvider = ({ children }) => {
    const [conversation, setConversation] = useState([]);
    return (<ConversationContext.Provider value={{ conversation, setConversation }}>
            {children}
        </ConversationContext.Provider>);
};
