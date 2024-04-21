import React, { useState, useEffect } from 'react';
import { ImageGallery, Searchbar } from './index';
import { Button, Loader } from '../common/components';
import { getImageApi } from '../api/image';
import './index.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [maxResults, setMaxResults] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      if (!searchValue) return;

      try {
        setIsLoading(true);
        setError('');

        const data = await getImageApi(searchValue, page);

        setImages((prevImages) => [...prevImages, ...data.hits]);
        setMaxResults(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchValue, page]);

  const handleSearch = (newSearchValue) => {
    if (searchValue.toLowerCase() === newSearchValue.toLowerCase()) return;

    setSearchValue(newSearchValue);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showLoadMore = !isLoading && images.length > 0;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearch} />
      {error && <h1>{error}</h1>}
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {
        showLoadMore && (maxResults > images.length
          ? <Button name="Load more" onCLick={handleLoadMore} />
          : <h3>The end</h3>)
      }
    </div>
  );
};

export default App;
