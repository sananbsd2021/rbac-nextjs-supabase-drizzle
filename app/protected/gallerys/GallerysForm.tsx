import React, { useState } from 'react';

interface GallerysFormProps {
  onSubmit: (title: string, description: string, file: File | null) => void;
}

const GallerysForm: React.FC<GallerysFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, file);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input type="file" onChange={handleFileChange} className="block" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Gallerys
      </button>
    </form>
  );
};

export default GallerysForm
