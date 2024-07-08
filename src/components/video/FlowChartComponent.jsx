import React, { useCallback } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import data from "./data"
import Dagre from '@dagrejs/dagre';

export default function () {
    return (
        <ReactFlowProvider>
            <FlowChartComponent />
        </ReactFlowProvider>
    );
};

const generateNodesAndEdges = (data) => {
    // Mapping nodes with their unique IDs
    const nodesMap = {};
    data.forEach((item) => {
        nodesMap[item.id] = {
            id: item.id,
            topic: item.topic,
            position: { x: 100, y: parseFloat(item.start_time) },
            data: { label: item.topic },
        };
    });

    // Generating edges based on parent_node relationships
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
    // console.log(nodesMap, edges)

    // Convert nodesMap to initialNodes array
    const initialNodes = Object.values(nodesMap);

    return { initialNodes, initialEdges: edges };
};

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - node.width / 2;
            const y = position.y - node.height / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

const FlowChartComponent = () => {
    const { initialNodes, initialEdges } = generateNodesAndEdges(data);
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onLayout = useCallback(
        (direction) => {
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges],
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
                    <button onClick={() => onLayout('TB')}>vertical layout</button>
                    <button onClick={() => onLayout('LR')}>horizontal layout</button>
                </Panel>
            </ReactFlow>
        </div>
    );

};
