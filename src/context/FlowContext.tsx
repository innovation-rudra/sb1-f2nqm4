import React, { createContext, useContext, useState } from 'react';

interface Block {
  id: string;
  type: 'message' | 'delay' | 'decision' | 'input' | 'end';
  position: { x: number; y: number };
  data: any;
}

interface Connection {
  from: string;
  to: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FlowContextType {
  blocks: Block[];
  connections: Connection[];
  selectedBlock: Block | null;
  addBlock: (block: Block) => void;
  updateBlock: (id: string, block: Block) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (block: Block | null) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const addBlock = (block: Block) => {
    setBlocks([...blocks, block]);
  };

  const updateBlock = (id: string, updatedBlock: Block) => {
    setBlocks(blocks.map((block) => (block.id === id ? updatedBlock : block)));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
    setConnections(
      connections.filter((conn) => conn.from !== id && conn.to !== id)
    );
    setSelectedBlock(null);
  };

  const selectBlock = (block: Block | null) => {
    setSelectedBlock(block);
  };

  return (
    <FlowContext.Provider
      value={{
        blocks,
        connections,
        selectedBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        selectBlock,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}