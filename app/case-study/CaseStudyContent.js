'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlockRenderer } from './dynamic-page-renderer';
import pageDataJson from '@/public/data/case-study-structure.json';
import Button from '../components/design-system/Button';

export default function CaseStudyContent() {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
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
        alert('Changes saved successfully!\nNote: You might need to refresh the page or navigate away and back if not in edit mode to see persisted changes if no hard refresh occurs automatically.');
        setEditableBlocks(blocksToSave.map(block => ({ ...block, props: { ...block.props, _isPendingDeletion: false } })));
      } else {
        alert(`Error saving changes: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. See console for details.');
    }
  };

  const blocksToRender = isEditing ? editableBlocks : pageDataJson.blocks.map(b => ({...b, props: {...b.props, _isPendingDeletion: false}}));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans relative pb-20">
      {isEditing && (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-2 shadow-lg rounded-md border border-gray-300 flex space-x-2">
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      )}
      {blocksToRender.map((block, index) => (
        <BlockRenderer 
          key={block.props.id || index} 
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