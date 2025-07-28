import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";


const PHOTOS_PER_PAGE = 20;

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PHOTOS_PER_PAGE}`)
            .then((response) => {
                const total = response.headers.get("x-total-count");
                if (total) setTotalPhotos(parseInt(total));
                return response.json();
            })
            .then((data) => {
                setPhotos(data);
                setIsLoading(false);
            });
    }, [page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const totalPages = Math.ceil(totalPhotos / PHOTOS_PER_PAGE);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="p-6">

                <header className="sticky top-0 z-20 backdrop-blur bg-white/70 shadow-sm py-4 px-6">
                    <h1 className="text-2xl font-bold text-gray-800">Photo Browser</h1>
                    <a
                        href="https://github.com/jarirauhala/photo-browser/tree/main"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-blue-500"
                    >
                        © 2025 Jari Rauhala
                    </a>
                </header>

                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                            {photos.map((photo) => (
                                <Link
                                    key={photo.id}
                                    to={`/photo-browser/photos/${photo.id}`}
                                    state={{ from: location.pathname + location.search }}
                                    className="hover:scale-105 transition-transform"
                                >
                                    <div className="aspect-[3/2]">

                                        <img
                                            src={`https://picsum.photos/id/${photo.id}/300/200`}
                                            alt={photo.title}
                                            className="rounded shadow"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>    
        </motion.div>
    );
};

export default PhotoList;
