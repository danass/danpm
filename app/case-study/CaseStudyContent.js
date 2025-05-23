'use client'

import React, { useState, useEffect, useCallback, useMemo, ErrorBoundary } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlockRenderer } from './dynamic-page-renderer';
import pageDataJson from '@/public/data/case-study-structure.json';
import Button from '../components/design-system/Button';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg my-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
      <p className="text-red-600 mt-1">{error.message}</p>
      <button 
        onClick={resetErrorBoundary} 
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

export default function CaseStudyContent() {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editableBlocks, setEditableBlocks] = useState(() => 
    pageDataJson.blocks.map(block => ({ ...block, props: { ...block.props, _isPendingDeletion: false } }))
  );

  useEffect(() => {
    const editMode = searchParams.get('edit');
    setIsEditing(editMode === 'true' || editMode === '1');
  }, [searchParams]);

  useEffect(() => {
    if (!isEditing) {
      setEditableBlocks(pageDataJson.blocks.map(block => ({ ...block, props: { ...block.props, _isPendingDeletion: false } })));
    }
  }, [isEditing]);

  const handleMoveBlock = useCallback((index, direction) => {
    setEditableBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const blockToMove = newBlocks[index];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newBlocks.length) return prevBlocks;
      newBlocks.splice(index, 1);
      newBlocks.splice(newIndex, 0, blockToMove);
      return newBlocks;
    });
  }, []);

  const handleToggleBlockDeletion = useCallback((index) => {
    setEditableBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const block = newBlocks[index];
      newBlocks[index] = {
        ...block,
        props: {
          ...block.props,
          _isPendingDeletion: !block.props._isPendingDeletion
        }
      };
      return newBlocks;
    });
  }, []);

  const handleBlockPropChange = useCallback((blockIndex, contentIndex, propPathArray, newValue) => {
    setEditableBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const newBlock = JSON.parse(JSON.stringify(newBlocks[blockIndex]));

      let currentTarget;
      if (contentIndex !== undefined && newBlock.props.content && newBlock.props.content[contentIndex]) {
        currentTarget = newBlock.props.content[contentIndex].props;
      } else {
        currentTarget = newBlock.props;
      }

      let tempTarget = currentTarget;
      for (let i = 0; i < propPathArray.length - 1; i++) {
        const key = propPathArray[i];
        if (tempTarget[key] === undefined || typeof tempTarget[key] !== 'object') {
          tempTarget[key] = typeof propPathArray[i + 1] === 'number' ? [] : {}; 
        }
        tempTarget = tempTarget[key];
      }
      tempTarget[propPathArray[propPathArray.length - 1]] = newValue;
      
      newBlocks[blockIndex] = newBlock;
      return newBlocks;
    });
  }, []);
  
  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    
    const blocksToSave = editableBlocks
      .filter(block => !block.props._isPendingDeletion)
      .map(block => {
        const { _isPendingDeletion, ...restProps } = block.props;
        return { ...block, props: restProps };
      });

    try {
      const response = await fetch('/api/save-case-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocks: blocksToSave }),
      });

      const result = await response.json();

      if (response.ok) {
        setEditableBlocks(blocksToSave.map(block => ({ ...block, props: { ...block.props, _isPendingDeletion: false } })));
      } else {
        setError(result.message || 'Failed to save changes');
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
      setError(error.message || 'Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const blocksToRender = useMemo(() => {
    return isEditing 
      ? editableBlocks 
      : pageDataJson.blocks.map(b => ({...b, props: {...b.props, _isPendingDeletion: false}}));
  }, [isEditing, editableBlocks]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans relative pb-20">
      {error && (
        <div className="w-full max-w-4xl mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p>{error}</p>
          <button 
            className="mt-2 text-sm text-red-600 hover:underline" 
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      
      {isEditing && (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-2 shadow-lg rounded-md border border-gray-300 flex space-x-2">
          <Button 
            variant="primary" 
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
      
      {blocksToRender.map((block, index) => (
        <BlockRenderer 
          key={block.props.id || `block-${index}`} 
          block={block} 
          isEditing={isEditing}
          index={index}
          totalBlocks={blocksToRender.filter(b => !b.props?._isPendingDeletion).length}
          onMoveBlock={handleMoveBlock} 
          onToggleBlockDeletion={handleToggleBlockDeletion}
          isPendingDeletion={block.props._isPendingDeletion}
          onBlockPropChange={handleBlockPropChange} 
          blockIndex={index}
        />
      ))}
    </div>
  );
} 