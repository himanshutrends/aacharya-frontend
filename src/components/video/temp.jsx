import React from 'react';
import Markdown from 'markdown-to-jsx';

const ChatMessage = ({ message, isUser, useVideoControl }) => {
    const { seekTo } = useVideoControl(); // Assuming this is your custom hook for video control

    const parseMessage = (message) => {
        const timestampRegex = /\[(\d+\.\d+)\]/g;

        // Function to replace timestamps with buttons
        const replaceTimestamps = (text) => {
            return text.split(timestampRegex).map((part, index) => {
                if (timestampRegex.test(part)) {
                    const timestamp = parseFloat(part.replace(/\[|\]/g, ''));
                    return (
                        <button
                            key={index}
                            onClick={() => seekTo(timestamp)}
                            className="text-blue-500"
                        >
                            [{timestamp}]
                        </button>
                    );
                }
                return part;
            });
        };

        // Convert Markdown to JSX and parse for timestamps
        return (
            <Markdown options={{ disableParsingRawHTML: true }}>
                {message}
            </Markdown>
        );
    };

    return (
        <div className={`flex flex-col gap-2 items-start`}>
            <div className={`gap-1.5 flex flex-row`}>
                <span className='max-h-6 min-w-12'>{isUser ? "User" : "Bot"}</span>
                <div className="p-2">
                    {parseMessage(message)}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;