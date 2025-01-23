'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Connect to Supabase

const SendsListPage = () => {
  const [posts, setPosts] = useState<any[]>([]); // State for posts
  const supabase = createClient();

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('sendforms') // Table name
      .select('*') // Select all fields
      .order('created_at', { ascending: false }); // Order by creation date

    if (error) {
      console.error('Error fetching sendforms:', error.message);
    } else {
      setPosts(data || []); // Store posts in state
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component loads
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold p-2 mb-4 bg-gradient-to-r from-blue-700 to-white rounded-md">
        โพสต์
      </h1>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">ที่หนังสือส่ง</th>
              <th className="px-4 py-2 text-left font-semibold">วันที่</th>
              <th className="px-4 py-2 text-left font-semibold">จาก</th>
              <th className="px-4 py-2 text-left font-semibold">ถึง</th>
              <th className="px-4 py-2 text-left font-semibold">เรื่อง</th>
              <th className="px-4 py-2 text-left font-semibold">การปฏิบัติ</th>
              <th className="px-4 py-2 text-left font-semibold">หมายเหตุ</th>
              {/* <th className="px-4 py-2 text-left font-semibold">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{post.numsend || '-'}</td>
                <td className="px-4 py-2">{post.date || '-'}</td>
                <td className="px-4 py-2">{post.fromsend || '-'}</td>
                <td className="px-4 py-2">{post.tosend || '-'}</td>
                <td className="px-4 py-2">{post.topic || '-'}</td>
                <td className="px-4 py-2">{post.plan || '-'}</td>
                <td className="px-4 py-2">{post.note || '-'}</td>
                {/* <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this post?')) {
                        // Delete logic here (add your delete function)
                        console.log('Post deleted:', post.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendsListPage;
