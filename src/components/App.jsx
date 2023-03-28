import { fetchPhotos } from './api';
import { useState, useEffect } from 'react';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { animateScroll } from 'react-scroll';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onLoadMore, setOnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchPhotos(query, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setOnLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [query, page]);

  const onFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setOnLoadMore(false);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    animateScroll.scrollToBottom({
      duration: 500,
      delay: 14,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {onLoadMore && <Button onLoadMore={loadMore} page={page} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
    </div>
  );
}
