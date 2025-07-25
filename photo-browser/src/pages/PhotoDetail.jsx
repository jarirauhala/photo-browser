// src/pages/PhotoDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data));
  }, [id]);

  if (!photo) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <Link to="/photo-browser" className="text-blue-500 underline">&larr; Back to list</Link>
      <div className="mt-4">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={photo.title}
          className="rounded shadow mb-4"
        />
        <h2 className="text-xl font-semibold">{photo.title}</h2>
        <p className="text-gray-600">Album ID: {photo.albumId}</p>
        <p className="text-gray-600">Photo ID: {photo.id}</p>
      </div>
    </div>
  );
};

export default PhotoDetail;
