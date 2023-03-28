import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '34020609-8fd5e6226221618c5d9372e77',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchPhotos = async (query, page) => {
  try {
    const { data } = await axios.get(`?q=${query}&page=${page}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
