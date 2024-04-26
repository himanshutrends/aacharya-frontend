import React, { useRef, useState, useEffect } from 'react';

interface TranscriptHighlighterProps {
    params: {
        slug: string;
    };
}

interface TranscriptSegment {
    start: number;
    duration: number;
    text: string;
}

// context
import { useTime } from '@/context/TimeContext';

const TranscriptHighlighter: React.FC<TranscriptHighlighterProps> = ({ params }) => {
    const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const activeSegmentRef = useRef<HTMLSpanElement | null>(null);

    const { currentTime } = useTime();

    const fetchTranscript = async (videoId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/chat/transcript?q=${videoId}`);
            const data: TranscriptSegment[] = await response.json();
            setTranscript(data);
        } catch (error) {
            console.error('Failed to fetch transcript:', error);
        }
    };

    // Fetch the transcript data
    useEffect(() => {
        if (params.slug) {
            fetchTranscript(params.slug);
        }
    }, [params.slug]);

    // Scroll to the active segment in the transcript
    useEffect(() => {
        if (activeSegmentRef.current) {
            transcriptRef.current?.scrollTo({
                top: activeSegmentRef.current.offsetTop - transcriptRef.current.offsetTop,
                behavior: "smooth"
            });
        }
    }, [currentTime, transcript]);


    return (
        <div>
            {transcript && transcript.map((segment, segmentIndex) => {
                const words = segment.text.split(' ');
                const wordDuration = segment.duration / words.length;

                return (
                    <div key={segmentIndex} style={{ display: 'block' }}>
                        {words.map((word, wordIndex) => {
                            const wordStartTime = segment.start + wordIndex * wordDuration;
                            const wordEndTime = wordStartTime + wordDuration;
                            const isActive = currentTime >= wordStartTime && currentTime < wordEndTime;
                            const isHighlighted = currentTime >= wordStartTime;

                            return (
                                <span
                                    key={wordIndex}
                                    ref={isActive ? activeSegmentRef : null}
                                    style={{
                                        backgroundColor: isHighlighted ? 'skyBlue' : 'transparent',
                                        transition: 'background-color 300ms ease-in-out'
                                    }}
                                >
                                    {word + ' '}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default TranscriptHighlighter;
