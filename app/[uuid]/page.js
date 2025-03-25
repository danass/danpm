'use client'
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWordStore } from '../../store';
import WordList from '../../WordList';

export default function UuidPage() {
  const params = useParams();
  const { uuid } = params;
  const { setWords, setUuid } = useWordStore();
  const router = useRouter();

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(`/api/words?uuid=${uuid}`);
      const data = await response.json();
      setWords(data.words);
      setUuid(uuid);
    };

    if (uuid) {
      fetchWords();
    } else {
      router.push('/');
    }
  }, [uuid, setWords, setUuid, router]);

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <WordList />
    </div>
  );
}
