import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface NewsFormProps {
  onSubmit: (
    title: string, 
    description: string, 
    image_url: string, 
    editingId: number | null
  ) => void;
  onCancel: () => void;
  initialTitle: string;
  initialDesc: string;
  initialImage_url: string;
  editingId: number | null;
}

const NewsForm: React.FC<NewsFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle,
  initialDesc,
  initialImage_url,
  editingId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDesc] = useState(initialDesc);
  const [image_url, setImage_url] = useState(initialImage_url);
  const [imageUrl, setImageUrl] = useState("");
  const [hostedUrl, setHostedUrl] = useState<string[]>([]);

  useEffect(() => {
    setTitle(initialTitle);
    setDesc(initialDesc);
    setImage_url(initialImage_url);
  }, [initialTitle, initialDesc]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, description, image_url, editingId);
    setTitle('');
    setDesc('');
    setImage_url('');
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
        <label htmlFor="description" className="block text-sm font-medium">
        Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm"
          rows={3}
          placeholder="Write a note..."
          required
        />
      </div>

      {/* <div>
        <label htmlFor="image_url" className="block text-sm font-medium">
        image_url
        </label>
        <textarea
          id="image_url"
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm"
          rows={3}
          placeholder="Write a note..."
          required
        />
      </div> */}

<div className="mb-4">
          {/* Render the hosted images if any */}
          {hostedUrl?.length > 0 ? (
            hostedUrl.map((url, idx) => (
              <div key={idx} className="mb-4">
                <Image
                  src={url}
                  height={200}
                  width={250}
                  alt={`hosted_image_${idx}`}
                />
                <li>{url}</li>
              </div>
            ))
          ) : (
            <p>No images uploaded yet!</p>
          )}

          {/* Cloudinary Upload Widget */}

          <CldUploadWidget
            uploadPreset="nongberd" // Your Cloudinary upload preset
            onSuccess={(results) => {
              const uploadedImageUrl =
                results &&
                typeof results === "object" &&
                "info" in results &&
                results.info &&
                typeof results.info === "object" &&
                "url" in results.info
                  ? (results.info as { url: string }).url
                  : "";

              if (uploadedImageUrl) {
                setHostedUrl((prevHostedUrl) => [
                  ...prevHostedUrl,
                  uploadedImageUrl,
                ]);
                setImageUrl(uploadedImageUrl);
              } else {
                console.error("Failed to retrieve uploaded image URL.");
              }
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="bg-blue-500 p-2 rounded-md text-white"
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>

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

export default NewsForm;
