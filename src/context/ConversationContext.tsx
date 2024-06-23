import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface ConversationEntry {
    message: string;
    isUser: boolean;
}

interface ConversationContextType {
    conversation: ConversationEntry[];
    setConversation: Dispatch<SetStateAction<ConversationEntry[]>>;
}

// Set default values and functions in the context
const ConversationContext = createContext<ConversationContextType>({
    conversation: [],
    setConversation: () => {}
});

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
    const [conversation, setConversation] = useState<ConversationEntry[]>([]);
    return (
        <ConversationContext.Provider value={{ conversation, setConversation }}>
            {children}
        </ConversationContext.Provider>
    );
};
