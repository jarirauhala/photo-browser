import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../components/Button";

export default function PhotoDetail() {
    const { id } = useParams();
    const photoId = parseInt(id);
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
            .then((response) => response.json())
            .then(setPhoto);
    }, [photoId]);

    const handleBackToList = () => {
        const from = location.state?.from || "/";
        navigate(from);
    };

    const goToNext = () => {
        if (photoId < 5000) {
            setPhoto(null);
            navigate(`/photo-browser/photos/${photoId + 1}`, { state: location.state });
        }
    };

    const goToPrev = () => {
        if (photoId > 1) {
            setPhoto(null);
            navigate(`/photo-browser/photos/${photoId - 1}`, { state: location.state });
        }
    };

    if (!photo) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 pt-16 pb-16">
            {/* Back To List Button */}
            <div className="mb-6">
                <button
                    onClick={handleBackToList}
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline text-base"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to list
                </button>
            </div>

            {/* Image + Info */}
            <div className="bg-white rounded-xl shadow p-6 grid gap-6 md:grid-cols-3 items-center">
                <img
                    src={`https://picsum.photos/id/${photo.id}/1200/800`}
                    alt={photo.title}
                    className="rounded-xl object-cover w-full h-auto shadow md:col-span-2"
                />

                <div className="md:col-span-1">
                    <h2 className="text-2xl font-semibold mb-2">{photo.title}</h2>
                    <p className="text-gray-500 text-sm mb-1">Album ID: {photo.albumId}</p>
                    <p className="text-gray-400 text-sm">Photo ID: {photo.id}</p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
                <Button onClick={goToPrev} disabled={photoId === 1} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button onClick={goToNext} disabled={photoId === 5000} variant="outline">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
