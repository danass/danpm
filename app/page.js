import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen p-10 font-inter bg-white text-[#1a1a1a]">
      <Head>
        <title>Daniel Assayag</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <nav className="flex gap-6 mb-20 items-center">
        <a href="#" className="font-bold text-[#1a1a1a] lowercase bg-[#e6f0ff] py-1 px-3 rounded-md">work</a>
        {/* <a href="#" className="font-bold text-[#1a1a1a] lowercase">contact</a> */}
        <a href="https://www.linkedin.com/in/daniel-assayag/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1a1a1a] lowercase hover:text-blue-600">
          linkedin
        </a>
      </nav>
      <h1 className="text-[48px] font-bold leading-snug max-w-3xl mb-16">
        daniel assayag, product manager at{' '}
        <a href="https://homeexchange.com" target="_blank" rel="noopener noreferrer" className="inline-block">
          <span
            className="text-transparent inline-block hover:text-[#1a1a1a] hover:[-webkit-text-stroke-color:#1a1a1a] transition-colors duration-150 ease-in-out"
            style={{
              WebkitTextStrokeWidth: '1px',
              WebkitTextStrokeColor: '#1a1a1a',
            }}
          >
            homeexchange
          </span>
        </a>
      </h1>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Work</h2>
        <ul className="space-y-3">
          <li>
            <Link href="/top" className="text-lg text-blue-600 hover:underline">
              /top
            </Link>
            <span className="ml-3 text-gray-700">- A tool for creating and sharing ranked lists.</span>
          </li>
          {/* <li>
            <Link href="/gethomes" className="text-lg text-blue-600 hover:underline">
              /gethomes
            </Link>
            <span className="ml-3 text-gray-700">- Tool for fetching HomeExchange listings data.</span>
          </li> */}
        </ul>
      </section>
    </main>
  );
}
