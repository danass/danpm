import { useWordStore } from '@/lib/store';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { Trash2 } from 'lucide-react';

export default function WordList({ isEditing = false, onRemoveItem = () => {}, isFinalized = false }) {
  const { words, setWords, uuid } = useWordStore();

  const handleDragEnd = async (event) => {
    if (isEditing || isFinalized) return;
    
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = words.indexOf(active.id);
    const newIndex = words.indexOf(over.id);

    const newWords = [...words];
    newWords.splice(oldIndex, 1);
    newWords.splice(newIndex, 0, active.id);

    const uniqueWords = [...new Set(newWords)];
    setWords(uniqueWords);

    await fetch(`/api/words?uuid=${uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words: uniqueWords }),
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {Array.isArray(words) && words.length > 0 && (
        <SortableContext items={words} strategy={verticalListSortingStrategy} disabled={isEditing || isFinalized}>
          <div className={`space-y-2 ${isFinalized ? 'opacity-75' : ''}`}>
            {words.map((word, index) => (
              <div key={word} className="flex items-center space-x-2">
                <span className="w-6 text-right text-gray-500">{index + 1}.</span>
                <div className="flex-grow">
                  <SortableItem id={word} isDisabled={isEditing || isFinalized} />
                </div>
                {!isFinalized && isEditing && (
                  <button 
                    onClick={() => onRemoveItem(word)} 
                    className="p-1 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${word}`}
                   >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </SortableContext>
      )}
    </DndContext>
  );
}
