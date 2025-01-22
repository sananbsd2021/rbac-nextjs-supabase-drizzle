'use client';

import { useState, useEffect } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';
import { createClient } from '@/utils/supabase/client';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const supabase = createClient();

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setNotes(data || []);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (title: string, content: string, editingId: number | null) => {
    if (editingId) {
      const { error } = await supabase.from('notes').update({ title, content }).eq('id', editingId);
      if (error) console.error('Error updating note:', error.message);
    } else {
      const { error } = await supabase.from('notes').insert([{ title, content }]);
      if (error) console.error('Error creating note:', error.message);
    }
    setEditingId(null);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) console.error('Error deleting note:', error.message);
      fetchNotes();
    }
  };

  const handleEdit = (note: any) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Notes</h1>
      <NoteForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialTitle={title}
        initialContent={content}
        editingId={editingId}
      />
      <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
