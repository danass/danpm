'use client'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWordStore } from '@/lib/store';
import WordList from '@/app/top/components/WordList';
import Button from '../components/Button';
import { Trash2, Lock } from 'lucide-react';

export default function UuidPage() {
  const params = useParams();
  const currentUuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;
  const { words, setWords, setUuid } = useWordStore();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [newItemInput, setNewItemInput] = useState('');
  const [isFinalized, setIsFinalized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      if (!currentUuid) {
        setIsLoading(false);
        router.push('/top');
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/words?uuid=${currentUuid}`);
        if (!response.ok) {
          if (response.status === 404) {
             console.log('List not found, redirecting...');
          } else {
             console.error('Failed to fetch words:', response.status);
          }
          router.push('/top');
          return;
        }
        const data = await response.json();
        setWords(data.words);
        setUuid(currentUuid);
        setIsFinalized(data.isFinalized || false);
      } catch (error) {
        console.error('Error fetching words:', error);
        router.push('/top');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, [currentUuid, setWords, setUuid, router]);

  const toggleEdit = () => {
    if (isFinalized) return;
    setIsEditing(prev => !prev);
    setNewItemInput('');
  };

  const updateListOnServer = async (updatedWords, finalize = false) => {
    if (!currentUuid) return;
    if (isFinalized && !finalize) return;
    try {
      const body = { words: updatedWords };
      if (finalize) {
         body.finalize = true;
      }
      const response = await fetch(`/api/words?uuid=${currentUuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
         const errorData = await response.json();
         console.error("Failed to update list:", response.status, errorData.message);
      }
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleAddItem = () => {
    if (isFinalized) return;
    const newItem = newItemInput.trim();
    if (!newItem || words.includes(newItem)) {
      setNewItemInput('');
      return;
    }
    const updatedWords = [...words, newItem];
    setWords(updatedWords);
    setNewItemInput('');
    updateListOnServer(updatedWords);
  };

  const handleRemoveItem = (itemToRemove) => {
    if (isFinalized) return;
    const updatedWords = words.filter(word => word !== itemToRemove);
    setWords(updatedWords);
    updateListOnServer(updatedWords);
  };

  const handleFinalize = () => {
    if (isFinalized) return;

    if (window.confirm("Are you sure you want to finalize this list? You won't be able to reorder or edit items after finalizing.")) {
       setIsFinalized(true);
       setIsEditing(false);
       updateListOnServer(words, true);
    }
  };

  const shareUrl = () => {
    const url = `${window.location.origin}/top/${currentUuid}`;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  const createNewList = () => {
    router.push('/top');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <div className="mb-4 flex justify-end space-x-2">
          {!isFinalized && (
            <Button onClick={toggleEdit} className="text-sm px-3 py-1">
               {isEditing ? 'Done Editing' : 'Edit List'}
            </Button>
          )}
           {!isFinalized && (
             <Button 
                onClick={handleFinalize} 
                className="text-sm px-3 py-1 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400"
             >
                <Lock size={14} className="inline mr-1"/> Finalize List
             </Button>
           )}
           {isFinalized && (
             <span className="text-sm px-3 py-1 text-gray-500 flex items-center">
               <Lock size={14} className="inline mr-1"/> Finalized
             </span>
           )}
      </div>

      {!isFinalized && isEditing && (
        <div className="mb-6 flex space-x-2">
          <input 
            type="text"
            value={newItemInput}
            onChange={(e) => setNewItemInput(e.target.value)}
            placeholder="Add new item..."
            className="flex-grow p-2 border rounded text-gray-900"
          />
          <Button onClick={handleAddItem} disabled={!newItemInput.trim()} className="m-0"> 
            Add
          </Button>
        </div>
      )}

      <div className="mb-auto">
        <WordList isEditing={isEditing} onRemoveItem={handleRemoveItem} isFinalized={isFinalized} />
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <Button onClick={shareUrl}>
          Share This List
        </Button>
        <Button 
          onClick={createNewList} 
          className="bg-gray-900 text-white hover:bg-gray-800"
         > 
          Create a New List
        </Button>
      </div>
    </div>
  );
}
