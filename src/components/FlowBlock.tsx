import React from 'react';
import { MessageSquare, Clock, GitBranch, FormInput, Square } from 'lucide-react';
import { useFlow } from '../context/FlowContext';

interface BlockProps {
  block: {
    id: string;
    type: 'message' | 'delay' | 'decision' | 'input' | 'end';
    position: { x: number; y: number };
    data: any;
  };
  isSelected: boolean;
}

const blockConfig = {
  message: {
    icon: MessageSquare,
    color: 'bg-emerald-100 border-emerald-300',
    title: 'Message',
  },
  delay: {
    icon: Clock,
    color: 'bg-amber-100 border-amber-300',
    title: 'Delay',
  },
  decision: {
    icon: GitBranch,
    color: 'bg-blue-100 border-blue-300',
    title: 'Decision',
  },
  input: {
    icon: FormInput,
    color: 'bg-purple-100 border-purple-300',
    title: 'Input Collection',
  },
  end: {
    icon: Square,
    color: 'bg-red-100 border-red-300',
    title: 'End',
  },
};

export function FlowBlock({ block, isSelected }: BlockProps) {
  const { selectBlock } = useFlow();
  const config = blockConfig[block.type];

  return (
    <div
      className={`absolute cursor-pointer select-none ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: block.position.x, top: block.position.y }}
      onClick={() => selectBlock(block)}
    >
      <div className={`w-64 ${config.color} border-2 rounded-lg shadow-sm`}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <config.icon className="w-5 h-5" />
            <h3 className="font-medium">{config.title}</h3>
          </div>
          {block.type === 'message' && (
            <p className="text-sm text-gray-600 break-words">
              {block.data.message || 'Enter your message...'}
            </p>
          )}
          {block.type === 'delay' && (
            <p className="text-sm text-gray-600">
              Delay: {block.data.duration || '0'} {block.data.unit || 'seconds'}
            </p>
          )}
          {block.type === 'decision' && (
            <div className="text-sm text-gray-600">
              <p>If user responds with:</p>
              <p className="font-medium">{block.data.condition || 'Define condition...'}</p>
            </div>
          )}
          {block.type === 'input' && (
            <p className="text-sm text-gray-600">
              Collecting: {block.data.field || 'Define input field...'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}