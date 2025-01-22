import Image from 'next/image';
import React from 'react';

interface Note {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface NewsListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="border p-4 my-4 rounded-md">
          <p className="text-lg font-semibold">{note.title}</p>
          <p className="text-gray-700">{note.description}</p>
          {note.image_url && (
            <Image
              src={note.image_url} // Ensure valid Cloudinary URL
              alt={note.title || 'Image'}
              width={300}
              height={200}
              className="rounded-md hover:scale-110 transition-transform duration-300"
            />
          )}
          <small className="text-gray-500">{new Date(note.created_at).toLocaleString()}</small>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onEdit(note)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
