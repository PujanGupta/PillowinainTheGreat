import React, { useState } from "react";
import '../styles.css';

const ImageUpload = ({ onSubmit }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }
    
    setError("");
    setImages([...images, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(images);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Food Images</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-50 file:text-green-700
                     hover:file:bg-green-100"
        />
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={images.length === 0}
          >
            Analyze Waste
          </button>
          
          <p className="text-sm text-gray-600">
            {images.length} / 5 images uploaded
          </p>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
