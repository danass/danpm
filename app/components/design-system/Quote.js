export default function Quote({ 
  children, 
  author, 
  isEditing = false, 
  onPropChange,
  propNameForChildren = 'children',
  propNameForAuthor = 'author' 
}) {
  const handleChildrenChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForChildren, e.target.value);
    }
  };

  const handleAuthorChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForAuthor, e.target.value);
    }
  };

  if (isEditing) {
    return (
      <div className="border-l-4 border-blue-300 pl-4 my-4 py-2 bg-blue-50/50">
        <label htmlFor="quote-children-editor" className="block text-xs font-medium text-gray-700 mb-1">Edit Quote Text:</label>
        <textarea
          id="quote-children-editor"
          value={children}
          onChange={handleChildrenChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          placeholder="Enter quote text"
        />
        <label htmlFor="quote-author-editor" className="block text-xs font-medium text-gray-700 mt-2 mb-1">Edit Author:</label>
        <input
          type="text"
          id="quote-author-editor"
          value={author || ''}
          onChange={handleAuthorChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          placeholder="Enter author"
        />
      </div>
    );
  }

  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
      “{children}”
      {author && <footer className="mt-2 text-sm text-gray-500">— {author}</footer>}
    </blockquote>
  );
} 