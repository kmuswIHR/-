import React, { useState, useEffect } from 'react';

function GalleryPage() {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/all_images');
      const data = await response.json();
      setAllImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Gallery Page</h1>
      <div className="image-container">
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} />
          ))
        ) : (
          <p>No images found. Please add some entries to the diary.</p>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;