"use client";

import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

function getColor(score: number) {
  if (score > 0.3) return "#22C55E";
  if (score < -0.3) return "#EF4444";
  return "#EAB308";
}

export default function StakeholderGraph({ data }: any) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

 
  useEffect(() => {
    if (!data || data.length === 0) return;

    const newNodes = data.map((s: any, i: number) => ({
      id: s.name,
      data: { label: `${s.name}` },
      position: { x: (i % 2) * 250, y: Math.floor(i / 2) * 150 },
      style: {
        background: "#111827",
        border: `2px solid ${getColor(s.score)}`,
        boxShadow: `0 0 12px ${getColor(s.score)}55`,
        color: "#E5E7EB",
        padding: 10,
        borderRadius: 10,
        // width: 10 + s.score * 5,
      }
    }));

    const newEdges = data.slice(1).map((_: any, i: number) => ({
      id: `e${i}`,
      source: data[0].name,
      target: data[i + 1].name,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data]);

  // ✅ enable dragging
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  if (!data || data.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center text-gray-500">
        No simulation data yet
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full border border-gray-800 rounded-xl">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodesDraggable
          panOnDrag
          zoomOnScroll
        />
      </ReactFlowProvider>
    </div>
  );
}