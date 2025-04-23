'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWordStore } from '../../lib/store';
import WordList from './components/WordList';
import { nanoid } from 'nanoid';

export default function HomePage() {
  const [input, setInput] = useState('');
  const { addWords, uuid, words, setUuid, setWords } = useWordStore();
  const router = useRouter();

  const generateWords = async () => {
    const newWords = input.split(/[,;\n]+/).map(word => word.trim()).filter(Boolean);
    const uniqueWords = [...new Set(newWords)]; // Exclure les doublons
    setWords(uniqueWords);
    const newUuid = nanoid(10); // Utiliser des UUID plus courts
    setUuid(newUuid);
    await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: newUuid, words: uniqueWords }),
    });
    router.push(`/top/${newUuid}`);
  };

  const shareUrl = () => {
    const url = `${window.location.origin}/${uuid}`;
    navigator.clipboard.writeText(url);
    alert('URL copiée dans le presse-papiers');
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <WordList />
      <div className="mt-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Collez votre liste de mots ici..."
        />
        <button
          onClick={generateWords}
          className="mt-2 p-2 border rounded"
        >
          Générer la liste
        </button>
      </div>
      {uuid && (
        <div className="mt-2">
          <button
            onClick={shareUrl}
            className="p-2 border rounded"
          >
            Partager
          </button>
        </div>
      )}
    </div>
  );
}