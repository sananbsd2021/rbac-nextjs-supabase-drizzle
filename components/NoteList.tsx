import React from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="border p-4 my-4 rounded-md">
          <p className="text-lg font-semibold">{note.title}</p>
          <p className="text-gray-700">{note.content}</p>
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

export default NoteList;
