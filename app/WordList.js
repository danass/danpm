'use client'
import { useWordStore } from './store';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

export default function WordList() {
  const { words, setWords, uuid } = useWordStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = words.indexOf(active.id);
    const newIndex = words.indexOf(over.id);

    const newWords = [...words];
    newWords.splice(oldIndex, 1);
    newWords.splice(newIndex, 0, active.id);

    setWords(newWords);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={words} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {words.map((word, index) => (
            <div key={word} className="flex items-center">
              <span className="mr-2">{index + 1}.</span>
              <SortableItem id={word} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}