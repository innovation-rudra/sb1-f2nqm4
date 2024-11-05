import React from 'react';
import { useFlow } from '../context/FlowContext';

export function PropertiesPanel() {
  const { selectedBlock, updateBlock } = useFlow();

  if (!selectedBlock) {
    return (
      <div className="w-80 border-l bg-white p-6">
        <p className="text-gray-500 text-center">Select a block to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      
      {selectedBlock.type === 'message' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Text
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              value={selectedBlock.data.message || ''}
              onChange={(e) =>
                updateBlock(selectedBlock.id, {
                  ...selectedBlock,
                  data: { ...selectedBlock.data, message: e.target.value },
                })
              }
              placeholder="Enter your message..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variables
            </label>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                onClick={() =>
                  updateBlock(selectedBlock.id, {
                    ...selectedBlock,
                    data: {
                      ...selectedBlock.data,
                      message: (selectedBlock.data.message || '') + '{{user_name}}',
                    },
                  })
                }
              >
                {{user_name}}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBlock.type === 'delay' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={selectedBlock.data.duration || 0}
              onChange={(e) =>
                updateBlock(selectedBlock.id, {
                  ...selectedBlock,
                  data: { ...selectedBlock.data, duration: parseInt(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedBlock.data.unit || 'seconds'}
              onChange={(e) =>
                updateBlock(selectedBlock.id, {
                  ...selectedBlock,
                  data: { ...selectedBlock.data, unit: e.target.value },
                })
              }
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
      )}

      {selectedBlock.type === 'decision' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={selectedBlock.data.condition || ''}
              onChange={(e) =>
                updateBlock(selectedBlock.id, {
                  ...selectedBlock,
                  data: { ...selectedBlock.data, condition: e.target.value },
                })
              }
              placeholder="e.g., yes, no"
            />
          </div>
        </div>
      )}

      {selectedBlock.type === 'input' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={selectedBlock.data.field || ''}
              onChange={(e) =>
                updateBlock(selectedBlock.id, {
                  ...selectedBlock,
                  data: { ...selectedBlock.data, field: e.target.value },
                })
              }
              placeholder="e.g., name, email"
            />
          </div>
        </div>
      )}
    </div>
  );
}