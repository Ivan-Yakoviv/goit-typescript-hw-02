import { useEffect, useState } from 'react';
import './App.css';
import {fetchPhotos} from '../api.js';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx'
import Error from './Error/Error.jsx'
import LoadMore from './LoadMore/LoadMore.jsx';
import ImageModal from './ImageModal/ImageModal.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const getImage = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setPhotos([]);
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

   const openModal = (image) => {
    setModalData(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchImg() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchPhotos(searchQuery, currentPage);

        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data.results];
        });

      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImg()
  }, [searchQuery, currentPage]);
 

  return (
    <div>
      <SearchBar onSearch={getImage} />
      <main>
        {photos.length > 0 && <ImageGallery images={photos} openModal={openModal} />}
        {loading && <Loader/>}
        {error && <Error />}
        {photos.length > 0 && (<LoadMore onMore={loadMore} />)}
      </main>
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onSetModal={setIsModalOpen}
          imageData={modalData}
        />
      )}
      <Toaster/>
    </div>
  );
};

export default App
