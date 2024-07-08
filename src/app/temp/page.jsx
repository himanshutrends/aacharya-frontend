'use client'
import React from "react";
import Markdown from "markdown-to-jsx";
import { Button } from '@/components/ui/button';

const CoustomButton = ({ onClickFn, timestamp }) => {
    return <Button size="sm" onClick={() => onClickFn(timestamp)}>timestamp</Button>;
};

const md = `
He's explaining how to create a falling sand simulation using p5.js, which is a JavaScript library for creative coding. He's breaking down the core concept of how to represent sand particles and how they interact with each other and the environment. 
Specifically, he's focusing on the idea of a **cellular automata (CA)**, a system where each cell on a grid has a state and changes its state based on the state of its neighbors. [84.28]  He's comparing this to a previous coding challenge he did, which was about cellular automata as well. [81.79]  He also mentions a popular game called **Noita**, which is built on a similar engine where every pixel is simulated. [55.23] 
He's then showing how to represent the sand in a 2D grid, with each cell having a state of either 0 (empty) or 1 (sand). [159.54] He's explaining the basic rule for how sand falls: if a sand particle (state 1) has an empty cell (state 0) below it, it moves down. [184.3] 
He's starting with the basic code for creating the grid, then showing how to update the grid based on the falling sand logic. [269.77] He then shows how to update the grid's state, going through each cell and checking if there is sand above and an empty space below it. [320.36]
He's also explaining how to handle edge cases, like what happens when the sand reaches the bottom of the grid. [489.85]
It's important to note that he's still working on the code and encountering some issues, such as the whole grid turning white instead of just the sand falling. [390.51] This is a good example of how coding challenges can be challenging and require careful debugging. 
`
const Page = () => {

    const seekTo = (timestamp) => {
        console.log('Seeking to:', timestamp);
    }

    const parseMessage = (message) => {
        const timestampRegex = /(\[\d+\.\d+\])/g;

        // Function to replace timestamps with buttons
        const replaceTimestamps = (text) => {
            return text.split(timestampRegex).map((part, index) => {
                if (timestampRegex.test(part)) {
                    const timestamp = part.replace(/\[|\]/g, '');
                    return `<CoustomButton timestamp={${Number(timestamp)}} />`
                }
                return part;
            });
        };

        // Replace timestamps with buttons
        const parts = replaceTimestamps(message);
        return parts.join('');
    }

    const parsedMessage = parseMessage(md);

    return (
        <Markdown
            children={parsedMessage}
            options={{
                overrides: {
                    CoustomButton: {
                        component: CoustomButton,
                        props: {
                            size: 'sm',
                            onClickFn: seekTo,
                        }
                    }
                }
            }}
        />
    )
}

export default Page;
