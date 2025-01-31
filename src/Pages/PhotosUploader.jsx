/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotosByLinks(e) {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
      onChange((prev) => [...prev, filename]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error uploading photo by link:', error);
    }
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios
      .post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => [...prev, ...filenames]);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button className="bg-gray-200 px-4 rounded-2xl w-32" onClick={addPhotosByLinks}>
          Add photo
        </button>
      </div>
      <p className="text-red-500">Only small URLs are accepted here</p>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div className="h-32 flex" key={index}>
              <img
                src={`http://localhost:4000/uploads/${link}`}
                alt="Uploaded"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer border items-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex justify-center gap-1">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader;
