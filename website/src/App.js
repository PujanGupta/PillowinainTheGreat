import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

const FoodWasteUpload = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [foodWasteLevel, setFoodWasteLevel] = useState('');
  const [rewards, setRewards] = useState(null);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB size limit
        setError('File size should not exceed 5MB.');
        setImage(null);
        setFoodWasteLevel('');
        setRewards(null);
      } else {
        setFoodWasteLevel('Loading...');
        setRewards(0);
        alert("Please wait while the image is being processed.\nIt can take upto 25 seconds.")
        setError(null);
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target.result);  // This sets the base64 encoded image URL
          classifyImage(file);  // Send the image to the model for prediction
        };
        reader.readAsDataURL(file);  // Reads the file as a base64 URL
      }
    }
  };

  // Function to classify the image by sending it to the API
  const classifyImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    try {
      const response = await axios.post('http://127.0.0.1:5000/analyse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      // Handle the response
      if (response.data) {
        const { foodwaste_level, rewards } = response.data;
        setFoodWasteLevel(foodwaste_level);
        setRewards(rewards);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing the image. Please try again.');
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
      <div className="flex justify-center items-center min-h-[70vh]">
        {/* Outer grey box */}
        <div className="w-3/5 h-auto bg-slate-300 flex flex-col items-start rounded-md relative p-6">
          {/* Image Container */}
          <div className="w-full h-auto bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg relative flex justify-center items-center overflow-hidden mb-6">
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
                <p className='text-gray-700 text-sm'>Image Analysis can take upto 25 seconds.</p>
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
  <p className='font-mono text-xl font-bold text-black'>Foodwaste Level:
    <span 
      className={`text-xl font-semibold font-mono ${
        foodWasteLevel === 'foodwaste-min' 
          ? 'text-yellow-600' 
          : foodWasteLevel === 'foodwaste-max' 
          ? 'text-red-700' 
          : foodWasteLevel === 'foodwaste-nil'
          ? 'text-green-800'
          : 'text-gray-600'
      }`}
    >
    {foodWasteLevel ? foodWasteLevel : 'N/A'}
    </span>
  </p>

  <p className='text-xl font-bold text-black font-mono'>Rewards:
    <span 
      className={`text-xl font-bold font-mono ${
        rewards < 0 
          ? 'text-red-700' 
          : rewards > 0 && rewards < 200 
          ? 'text-yellow-700' 
          : rewards >= 200
          ? 'text-green-800'
          : 'text-gray-600'
      }`}
    >
      {rewards ? rewards.toFixed(2) : 'N/A'}
    </span>
  </p>
</div>



        </div>
      </div>
    </div>
  );
};

export default FoodWasteUpload;
