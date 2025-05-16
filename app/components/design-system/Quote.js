export default function Quote({ children, author }) {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
      “{children}”
      {author && <footer className="mt-2 text-sm text-gray-500">— {author}</footer>}
    </blockquote>
  );
} 