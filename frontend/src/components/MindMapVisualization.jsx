import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network } from 'lucide-react';
import useStore from '../store';

const MindMapVisualization = () => {
  const ideas = useStore((state) => state.ideas);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Create nodes from ideas
    const categoryGroups = {};
    ideas.forEach((idea) => {
      if (!categoryGroups[idea.category]) {
        categoryGroups[idea.category] = [];
      }
      categoryGroups[idea.category].push(idea);
    });

    const newNodes = [];
    const newEdges = [];
    
    // Center node
    newNodes.push({
      id: 'center',
      data: { label: 'Ideas Hub' },
      position: { x: 400, y: 300 },
      style: {
        background: '#0ea5e9',
        color: 'white',
        border: '2px solid #0284c7',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });

    // Category nodes
    const categoryColors = {
      Technology: '#3b82f6',
      Marketing: '#ec4899',
      Product: '#8b5cf6',
      Operations: '#f59e0b',
      'Customer Experience': '#10b981',
      Innovation: '#06b6d4',
    };

    Object.keys(categoryGroups).forEach((category, catIndex) => {
      const angle = (catIndex * 2 * Math.PI) / Object.keys(categoryGroups).length;
      const categoryX = 400 + 250 * Math.cos(angle);
      const categoryY = 300 + 250 * Math.sin(angle);

      const categoryId = `category-${category}`;
      newNodes.push({
        id: categoryId,
        data: { label: `${category} (${categoryGroups[category].length})` },
        position: { x: categoryX, y: categoryY },
        style: {
          background: categoryColors[category] || '#6b7280',
          color: 'white',
          border: '2px solid #374151',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '14px',
          fontWeight: '600',
        },
      });

      newEdges.push({
        id: `edge-center-${categoryId}`,
        source: 'center',
        target: categoryId,
        animated: true,
        style: { stroke: categoryColors[category] || '#6b7280' },
      });

      // Idea nodes
      categoryGroups[category].forEach((idea, ideaIndex) => {
        const ideaAngle = angle + ((ideaIndex - categoryGroups[category].length / 2) * 0.3);
        const ideaX = categoryX + 150 * Math.cos(ideaAngle);
        const ideaY = categoryY + 150 * Math.sin(ideaAngle);

        const ideaId = `idea-${idea.id}`;
        newNodes.push({
          id: ideaId,
          data: { label: idea.title.substring(0, 20) + (idea.title.length > 20 ? '...' : '') },
          position: { x: ideaX, y: ideaY },
          style: {
            background: 'white',
            border: `2px solid ${categoryColors[category] || '#6b7280'}`,
            borderRadius: '6px',
            padding: '6px',
            fontSize: '12px',
          },
        });

        newEdges.push({
          id: `edge-${categoryId}-${ideaId}`,
          source: categoryId,
          target: ideaId,
          style: { stroke: '#d1d5db' },
        });
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [ideas]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Network className="text-primary-500" />
        Mind Map Visualization
      </h2>
      <div style={{ height: '500px' }} className="border border-gray-200 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 Explore the connections between ideas and categories. Zoom and drag to navigate.</p>
      </div>
    </div>
  );
};

export default MindMapVisualization;
