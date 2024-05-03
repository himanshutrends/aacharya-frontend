import React, { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { CornerDownLeft, List, Mic, NotebookTabs } from 'lucide-react';

import { useTime } from '@/context/TimeContext';

import { useConversation } from '@/context/ConversationContext';
import { useVideoControl } from '@/context/VideoControl';

import  axios from 'axios';

export const ChatComponents: React.FC<{params: {slug: string}}> = ({params}) => {
    const [message, setMessage] = useState('');

    // Array of objects with message and isUser properties
    const { conversation, setConversation } = useConversation();
    const { currentTime } = useTime();

    const getResponse = async (message: string) => {
        try {
            // Make a POST request to the chatbot API
            const response = await axios.post(`http://localhost:5000/chat/ask?q=${params.slug}`, { 
                message, 
                timestamp: currentTime
            });            
            const data = response.data;
            return data['response'];
        } catch (error) {
            console.error('Failed to fetch response:', error);
        }
    }

    const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (message) {
            console.log('Message:', message);
            setConversation(prevConversation => [...prevConversation, { message, isUser: true }]);
    
            getResponse(message).then((response) => {
                console.log('Response:', response);
                setConversation(prevConversation => [...prevConversation, { message: response, isUser: false }]);
            });
            console.log('Conversation:', conversation);
        }
        setMessage('');
    }


    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }


    useEffect(() => {
    }, [params.slug, conversation]);

    return (
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-1">
                <Badge variant="outline" className="absolute right-3 top-3">
                    Output
                </Badge>
                <div className="flex flex-col gap-2 overflow-auto h-full p-2">
                    {conversation && conversation.map((item, index) => (
                        <ChatMessage key={index} message={item.message} isUser={item.isUser} />
                    ))}
                </div>
                <div className="flex-1" />
                <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                    <Label htmlFor="message" className="sr-only">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." value={message} onChange={handleOnChange} className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
                    <TooltipTriggerAndContent handleSendMessage={handleSendMessage} />
                </form>
            </div>
    )
}

const parseMessage = (message: string) => {
    const timestampRegex = /\[(\d+)\]/g;
    const { seekTo } = useVideoControl();

    return message.split(timestampRegex).map((part, index) => {
        if (index % 2 === 1) { // This is a number part
            return <Button key={index} onClick={() => seekTo(Number(part))} className="text-blue-500 underline">{part}</Button>;
        }
        return part;
    });
};

const ChatMessage: React.FC<{ message: string, isUser: boolean }> = ({ message, isUser }) => {
    return (
        <div className={`flex flex-col gap-2 items-start`}>
            <div className={`flex items-center gap-1.5 flex-row`}>
                <Badge variant="outline">
                    {isUser ? 'User' : 'Bot'}
                </Badge>
                <span>{message}</span>
            </div>
        </div>
    );
}

const TooltipTriggerAndContent: React.FC<{ handleSendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void }> = ({ handleSendMessage }) => {
    return (
        <div className="flex items-center p-3 pt-0">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <NotebookTabs className="size-4" />
                        <span className="sr-only">Add to Notes</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Add to Notes</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <List className="size-4" />
                        <span className="sr-only">Get key points</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Get key points</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button size="sm" className="ml-auto gap-1.5" onClick={handleSendMessage}>
                Send Message
                <CornerDownLeft className="size-3.5" />
            </Button>
        </div>
    );
}
