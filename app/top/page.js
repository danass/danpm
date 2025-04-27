'use client'
import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useRouter } from 'next/navigation';
import { useWordStore } from '../../lib/store';
import WordList from './components/WordList';
import SortableItem from './components/SortableItem';
import { nanoid } from 'nanoid';
import { Info } from 'lucide-react';
import ListItem from './components/ListItem';
import Button from './components/Button';

// localStorage key
const LOCAL_STORAGE_KEY = 'hasCreatedListBefore';

export default function HomePage() {
  const [input, setInput] = useState('');
  const { addWords, uuid, words, setUuid, setWords } = useWordStore();
  const router = useRouter();

  const initialExampleItems = ['Salad', 'Tomato', 'Onions'];
  const [exampleItemsState, setExampleItemsState] = useState(initialExampleItems);
  const [isClient, setIsClient] = useState(false);
  // Default showExample state to false initially
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const alreadyCreated = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Show example ONLY if the flag is NOT set
    if (alreadyCreated !== 'true') {
       setShowExample(true);
    }
    // If flag IS set, showExample remains false (initial state)
  }, []);

  const generateWords = async () => {
    const newWords = input.split(/[,;\n]+/).map(word => word.trim()).filter(Boolean);
    const uniqueWords = [...new Set(newWords)];
    setWords(uniqueWords);
    const newUuid = nanoid(10);
    setUuid(newUuid);
    try {
      await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid: newUuid, words: uniqueWords }),
      });
      // Set flag in localStorage on successful creation
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      router.push(`/top/${newUuid}`);
    } catch (error) {
       console.error("Failed to save list:", error); 
       // Handle error appropriately, maybe show a message
    }
  };

  const shareUrl = () => {
    const url = `${window.location.origin}/${uuid}`;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  const handleExampleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = exampleItemsState.indexOf(active.id);
    const newIndex = exampleItemsState.indexOf(over.id);

    const newItems = [...exampleItemsState];
    newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, active.id);

    setExampleItemsState(newItems);
  };

  // Toggle example visibility
  const toggleExample = () => {
    setShowExample(prev => !prev);
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <div className="mb-8 relative flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your List</h2>
        {/* Button to SHOW example if it's hidden and client has loaded */}
        {!showExample && isClient && (
            <Button onClick={toggleExample} className="text-sm px-2 py-1 m-0">
              <Info size={16} className="inline mr-1" /> Show Example
            </Button>
        )}
      </div>

      {/* Example Section - Always rendered, controlled by CSS classes */}
      <div
        className={`relative border-dashed border-gray-300 rounded-lg  overflow-hidden 
                    ${showExample ? 'example-container' : 'example-container-hidden'}`}
      >
         {/* Inner container for opacity transition */}
         <div className={`${showExample ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}>
            <div className="flex justify-center items-center mb-4 pt-6 px-6 relative">
              <h3 className="text-lg font-medium text-gray-700 text-center">Example: Reorder Your List</h3>
              {/* Info Button to HIDE example - only show if example is visible */}
              {showExample && (
                <button
                  onClick={toggleExample}
                  className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle example visibility"
                >
                  <Info size={18} />
                </button>
              )}
            </div>
            <div className="flex justify-center mb-2 px-6">
              <p className="text-sm text-gray-500">Drag items up or down to change their rank.</p>
            </div>

            {/* Conditionally render DndContext only on the client */}
            {isClient && (
              <div className="pb-6 px-6">
                 <DndContext collisionDetection={closestCenter} onDragEnd={handleExampleDragEnd}>
                   <SortableContext items={exampleItemsState} strategy={verticalListSortingStrategy}>
                     <div className="space-y-2 max-w-sm mx-auto relative">
                       {exampleItemsState.map((item, index) => (
                         <SortableItem key={item} id={item} />
                       ))}
                     </div>
                   </SortableContext>
                 </DndContext>
              </div>
             )}
         </div>
      </div>

      <div className="mt-auto">
         <textarea
           value={input}
           onChange={(e) => setInput(e.target.value)}
           className="w-full p-2 border rounded"
           placeholder="Write your list here. 
           Separate items with commas.
           Example: &#10;Salad, Tomato, Onions"
         />
         <Button
           onClick={generateWords}
           disabled={!input.trim()}
           className={`${!input.trim() ? '' : 'hover:bg-gray-900 hover:text-white'}`}
         >
           Create List
         </Button>
      </div>
    </div>
  );
}