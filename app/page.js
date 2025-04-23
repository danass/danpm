import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen p-10 font-inter bg-white text-[#1a1a1a]">
      <Head>
        <title>Daniel Assayag</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <nav className="flex gap-5 mb-20">
        <a href="#" className="font-bold text-[#1a1a1a] lowercase bg-[#e6f0ff] py-1 px-3 rounded-md">work</a>
        <a href="#" className="font-bold text-[#1a1a1a] lowercase">contact</a>
      </nav>
      <h1 className="text-[48px] font-bold leading-snug max-w-3xl mb-16">
        daniel assayag, product manager at <span className="text-transparent" style={{ WebkitTextStroke: '1px #1a1a1a' }}>homeexchange</span>
      </h1>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Work</h2>
        <ul>
          <li>
            <Link href="/top" className="text-lg text-blue-600 hover:underline">
              /top
            </Link>
            <span className="ml-2 text-gray-600">(a tool for...)</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
