import axios from 'axios';
import { useEffect, useState } from 'react';
import routes from '../hooks/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log(userId);

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const [chanels, setChanels] = useState('');
  useEffect(() => {
    const fetchChanels = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setChanels(data);
    };

    fetchChanels();
  }, []);

  console.log(chanels);
};

export default MainPage;