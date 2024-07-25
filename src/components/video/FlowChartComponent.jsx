'use client'
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import Dagre from '@dagrejs/dagre';
import { useUser } from '@/context/User';

const generateNodesAndEdges = (data) => {
    const nodesMap = {};
    data.forEach((item) => {
        nodesMap[item.id] = {
            id: item.id,
            position: { x: 100, y: parseFloat(item.start_time) },
            data: { label: item.topic },
        };
    });

    const edges = data.reduce((acc, item) => {
        if (item.parent_node && nodesMap[item.parent_node]) {
            acc.push({
                id: `e${item.parent_node}-${item.id}`,
                source: item.parent_node,
                target: item.id,
            });
        }
        return acc;
    }, []);

    const initialNodes = Object.values(nodesMap);

    return { initialNodes, initialEdges: edges };
};

const getLayoutedElements = (nodes, edges, direction) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            const x = position.x - node.width / 2;
            const y = position.y - node.height / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

const FlowChartComponent = ({params}) => {
    const [data, setData] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { fitView } = useReactFlow();
    const { user } = useUser();

    const fetchData = useCallback(async () => {
        try {
            if (user) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/get-visuals?q=${params.slug}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.access_token
                    }
                });
                console.log('Data:', response);
                setData(response.response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    useEffect(() => {
        if (data) {
            const { initialNodes, initialEdges } = generateNodesAndEdges(data);
            const layouted = getLayoutedElements(initialNodes, initialEdges, 'TB');

            setNodes(layouted.nodes);
            setEdges(layouted.edges);

            fitView();
        }
    }, [data, fitView, setNodes, setEdges]);

    const onLayout = useCallback(
        (direction) => {
            const layouted = getLayoutedElements(nodes, edges, direction);

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges, fitView, setNodes, setEdges]
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Panel position="top-right">
                    <button onClick={() => onLayout('TB')}>Vertical Layout</button>
                    <button onClick={() => onLayout('LR')}>Horizontal Layout</button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default function ({params}) {
    return (
        <ReactFlowProvider>
            <FlowChartComponent params={params}/>
        </ReactFlowProvider>
    );
}
