import { useEffect, useState } from 'react';
import './App.css';
import {fetchPhotos} from '../api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader'
import Error from './Error/Error'
import LoadMore from './LoadMore/LoadMore';
import ImageModal from './ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';

export interface Image {
  id?: string;
  created_at?: string;
  description: string;
  urls: Record<string, string>;
  links?: Record<string, string>;
  user: { name: string | null; location: string | null };
  alt_description?: string;
}

const App:React.FC = () => {

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [photos, setPhotos] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Image | null>(null);

  const getImage = (query:string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
    setPhotos([]);
  };

  const loadMore = (): void => {
    setCurrentPage(currentPage + 1);
  };

   const openModal = (image: Image): void => {
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
