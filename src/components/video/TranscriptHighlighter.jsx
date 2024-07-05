import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// context
import { useTime } from '@/context/TimeContext';
import { useUser } from '@/context/User';
const TranscriptHighlighter = ({ params }) => {
    const [transcript, setTranscript] = useState(null);
    const transcriptRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null); // Store active word index
    const { currentTime } = useTime();
    const { user, loading, setLoading, error, setError } = useUser();

    // Fetch the transcript data
    useEffect(() => {
        (async () => {
            if (user && params.slug) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/transcript?q=${params.slug}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user.access_token
                        }
                    });
                    const data = response.data;
                    setTranscript(data);
                } catch (error) {
                    setError({
                        message: error.message,
                        status: true
                    });
                    console.error('Failed to fetch transcript:', error);
                } finally {
                    setLoading(false);
                }
            }
        })()
    }, [params.slug, loading])

    // Scroll to the active segment in the transcript
    useEffect(() => {
        if (!transcript) {
            return;
        }
        transcript.some((segment, segmentIndex) => {
            const words = segment.text.split(' ');
            const wordDuration = segment.duration / words.length;
            return words.some((word, wordIndex) => {
                const wordStartTime = segment.start + wordIndex * wordDuration;
                const wordEndTime = wordStartTime + wordDuration;
                if (currentTime >= wordStartTime && currentTime < wordEndTime) {
                    if (activeIndex !== segmentIndex) {
                        setActiveIndex(segmentIndex);
                    }
                    return true;
                }
                return false;
            });
        });
    }, [currentTime, transcript, activeIndex]);
    useEffect(() => {
        if (activeIndex !== null && transcriptRef.current) {
            const elements = transcriptRef.current.children;
            if (elements[activeIndex]) {
                elements[activeIndex].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }
    }, [activeIndex]);

    if (loading) {
        return <div>Loading transcript...</div>;
    }
    return (<div ref={transcriptRef}>
        {transcript && transcript.map((segment, segmentIndex) => {
            const words = segment.text.split(' ');
            const wordDuration = segment.duration / words.length;
            return (<div key={segmentIndex}>
                {words.map((word, wordIndex) => {
                    const wordStartTime = segment.start + wordIndex * wordDuration;
                    const isHighlighted = currentTime >= wordStartTime;
                    return (<span key={wordIndex} style={{
                        backgroundColor: isHighlighted ? 'skyBlue' : 'transparent',
                        transition: 'background-color 300ms ease-in-out',
                        whiteSpace: 'nowrap'
                    }}>
                        {word + ' '}
                    </span>);
                })}
            </div>);
        })}
    </div>);
};
export default TranscriptHighlighter;
