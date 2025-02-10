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

  function removePhoto(e, filename) {
    e.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }

  function selectMainPhoto(e, filename) {
    e.preventDefault();
    onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Add using a link...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="flex-grow p-2 border rounded-md"
        />
        <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={addPhotosByLinks}>
          Add photo
        </button>
      </div>
      <p className="text-red-500 text-sm mt-1">Only small URLs are accepted here</p>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div className="relative h-32 flex" key={index}>
              <img
                src={`http://localhost:4000/uploads/${link}`}
                alt="Uploaded"
                className="rounded-md w-full object-cover"
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-md py-1 px-2"
              >
                ✖
              </button>
              <button
                onClick={(e) => selectMainPhoto(e, link)}
                className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-md py-1 px-2"
              >
                {link === addedPhotos[0] ? '★' : '☆'}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer border items-center bg-transparent rounded-md p-2 text-gray-600 flex justify-center gap-1">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <span className="text-lg">📤 Upload</span>
        </label>
      </div>
    </>
  );
}

export default PhotosUploader;
