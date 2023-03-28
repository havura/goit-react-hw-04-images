import { fetchPhotos } from './api';
import { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import css from "./App.module.css";
import { animateScroll } from 'react-scroll';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    per_page: 12,
    query: '',
    isLoading: false,
    onLoadMore: false,
    showModal: false,
    largeImageURL: 'largeImageURL',
    error: null,
    
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchGallery(query, page);
    }
  }

  async fetchGallery(query, page) {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchPhotos(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        onLoadMore:
          this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onFormSubmit = (query) => {
    this.setState({ query, images: [], page: 1, onLoadMore: false, });
  };

  openModal = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
      animateScroll.scrollToBottom({
    duration: 500,
    delay: 14,
  });;
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLoading, images, onLoadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {onLoadMore && <Button onLoadMore={this.onLoadMore} page={page} />}
        {showModal && 
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        }
      </div>
    );
  }
}
