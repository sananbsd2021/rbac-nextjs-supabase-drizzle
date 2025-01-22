import React, { useState, useEffect } from 'react';

interface NoteFormProps {
  onSubmit: (title: string, content: string, editingId: number | null) => void;
  onCancel: () => void;
  initialTitle: string;
  initialContent: string;
  editingId: number | null;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle,
  initialContent,
  editingId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, content, editingId);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm"
          rows={3}
          placeholder="Write a note..."
          required
        />
      </div>

      <button
        type="submit"
        className={`px-4 py-2 rounded-md text-white ${
          editingId ? 'bg-yellow-600' : 'bg-blue-600'
        }`}
      >
        {editingId ? 'Update Note' : 'Add Note'}
      </button>
      {editingId && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default NoteForm;
