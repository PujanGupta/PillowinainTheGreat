import React, { useState } from 'react';
import './styles.css'; 

const FoodWasteUpload = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        // File size exceeds 5MB limit
        setError('File size should not exceed 5MB.');
        setImage(null);
      } else {
        setError(null);
        setImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-200">
      {/* Green Header */}
      <div className="bg-green-500 h-12 w-full">
        <h3 className="mx-7 py-1 text-white font-mono text-3xl">GreenPlates</h3>
      </div>

      <h5 className="mx-9 py-5 font-mono text-2xl">Foodwaste ML Model Demo</h5>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-[70vh]"> {/* Center the box */}
        {/* Outer grey box */}
        <div className="w-4/5 h-3/5 bg-slate-300 flex flex-col items-start rounded-md relative p-6">
          {/* Image Container */}
          <h2 className='font-mono font-semibold text-blue-700 text-2xl pb-4'>Preview Image</h2>
          <div className="w-full h-2/5 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg relative flex justify-center items-center overflow-hidden mb-6">
            {image ? (
              <img
                src={image}
                alt="Uploaded preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full bg-gray-100 h-80 rounded-lg flex flex-col justify-center items-center">
                <div className="justify-center text-6xl text-gray-400 mb-2">⬇</div>
                <div className="text-gray-700 text-lg">Please upload an image to start.</div>
              </div>
            )}

            {/* Upload Button */}
            <div className="absolute bottom-4 w-full flex justify-center">
              <div
                className={`w-40 h-12 font-lg font-semibold rounded-md flex justify-center items-center ${
                  image ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                }`}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {!image ? <p>Upload Image</p> : <p>Change Image</p>}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Analysis Section */}
          <div className="mt-8">
            <p className="text-green-600 text-lg font-semibold">Foodwaste Level:</p>
            <p className="text-purple-600 text-xl font-bold">Score:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodWasteUpload;