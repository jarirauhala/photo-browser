// src/pages/PhotoList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Photo Browser</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            to={`photos/${photo.id}`}
            className="hover:scale-105 transition-transform"
          >
            <img
              src={`https://picsum.photos/id/${photo.id}/300/200`}
              alt={photo.title}
              className="rounded shadow"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
