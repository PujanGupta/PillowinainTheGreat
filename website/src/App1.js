import './styles.css'; // For custom CSS styles
import React, { useState } from 'react';

// App.jsx
export default function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const style3 = {
    alignSelf: 'flex-end'
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && validTypes.includes(file.type)) {
      setImage(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please upload a valid image (png, jpg, jpeg).");
      setImage(null);
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
    <div className="flex justify-center h-screen my-8 bg-slate-200 container">

    {/* Outer grey slate-500 box */}
    <p>helo world</p>

    <div className="w-3/5 h-3/6 bg-slate-300 flex justify-center items-center rounded-md relative">
      
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="Uploaded preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-gray-700">Please upload an image to start.</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div
          className={`mb-4 w-40 h-12 font-lg font-semibold rounded-md flex justify-center items-center ${
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
      {error && <p className="text-red-500 mt-10">{error}</p>}
      
              {/* Upload section */}
              <div className="w-full bg-gray-100 border-dashed border-2 border-gray-300 h-48 rounded-lg flex flex-col justify-center items-center">
          <div className="text-6xl text-gray-400 mb-2">⬇</div>
          <p className="text-blue-600 font-medium">Upload an Image to Start Analysing</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Choose From Computer
          </button>
        </div>
    </div>


    <p className='mt-11 relative flex justify-start items-center rounded-md'>just need paragraph here</p>
    
    
    </div>
</div>

  );
};