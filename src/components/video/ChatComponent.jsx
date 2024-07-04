import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CornerDownLeft, List, Mic, NotebookTabs } from 'lucide-react';
import { useTime } from '@/context/TimeContext';
import { useConversation } from '@/context/ConversationContext';
import { UseVideoControl } from '@/context/VideoControl';
import { useUser } from '@/context/User';
import axios from 'axios';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
export const ChatComponents = ({ params }) => {
    const [message, setMessage] = useState('');
    const { user } = useUser();
    // Array of objects with message and isUser properties
    const { conversation, setConversation } = useConversation();
    const { currentTime } = useTime();
    const getResponse = async (message) => {
        try {
            // Make a POST request to the chatbot API
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/ask?q=${params.slug}`, {
                message,
                timestamp: currentTime,
                user: user
            });
            const data = response.data;
            return data['response'];
        }
        catch (error) {
            console.error('Failed to fetch response:', error);
        }
    };
    const handleSendMessage = (event) => {
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
    };
    const handleOnChange = (event) => {
        setMessage(event.target.value);
    };
    useEffect(() => {
    }, [params.slug, conversation]);
    return (<div className="relative flex h-full min-h-[50vh] flex-col   rounded-xl bg-muted/50 p-4 lg:col-span-1">
            <Badge variant="outline" className="absolute right-3 top-3">
                Output
            </Badge>
            <div className="flex flex-col gap-2 overflow-auto h-full p-2" style={{ "maxHeight": "70vh", "overflow": "scroll" }}>
                {conversation && conversation.map((item, index) => (<ChatMessage key={index} message={item.message} isUser={item.isUser}/>))}
            </div>
            <div className="flex-1"/>
            <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                <Label htmlFor="message" className="sr-only">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." value={message} onChange={handleOnChange} className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"/>
                <TooltipTriggerAndContent handleSendMessage={handleSendMessage}/>
            </form>
        </div>);
};
const parseMessage = (message) => {
    // Updated regex to match decimal numbers inside brackets
    const timestampRegex = /\[(\d+\.\d+)\]/g;
    const { seekTo } = UseVideoControl();
    // Splitting message and creating clickable buttons for timestamps
    return message.split(timestampRegex).map((part, index) => {
        // Checking if this is a decimal number part
        if (index % 2 === 1) {
            return (<Button key={index} onClick={() => seekTo(parseFloat(part))} className="text-blue-500">
                    [{index}]
                </Button>);
        }
        return part;
    });
};
const ChatMessage = ({ message, isUser, }) => {
    const markdownToHtml = (markdown) => {
        return remark().use(remarkHtml).processSync(markdown).toString();
    };
    return (<div className={`flex flex-col gap-2 items-start`}>
            <div className={`gap-1.5 flex flex-row`}>
                <Badge className='max-h-6 min-w-12' variant="secondary">{isUser ? "User" : "Bot"}</Badge>
                <Card className="p-2">
                    <div dangerouslySetInnerHTML={{ __html: parseMessage(markdownToHtml(message)) }}></div>
                </Card>
            </div>
        </div>);
};
const TooltipTriggerAndContent = ({ handleSendMessage }) => {
    return (<div className="flex items-center p-3 pt-0">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <NotebookTabs className="size-4"/>
                        <span className="sr-only">Add to Notes</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Add to Notes</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <List className="size-4"/>
                        <span className="sr-only">Get key points</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Get key points</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Mic className="size-4"/>
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button size="sm" className="ml-auto gap-1.5" onClick={handleSendMessage}>
                Send Message
                <CornerDownLeft className="size-3.5"/>
            </Button>
        </div>);
};
