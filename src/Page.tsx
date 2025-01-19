import { useEffect, useState } from 'react';
import renewAccessToken from './ducks/auth';
import renewAnimals, { TSAnimal } from './ducks/animal';
import Animal from './components/Animal';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [animals, setAnimals] = useState<TSAnimal[]>([]);
  const [fetchingAnimals, setFetchingAnimals] = useState(false);
  
  /**
   * Gets access token.
   */
  useEffect(() => {
    renewAccessToken({ setAccessToken  });
  }, []);

  /**
   * Gets animals.
   */
  useEffect(() => {
    if (accessToken && !animals.length && !fetchingAnimals) {
      setFetchingAnimals(true);
      renewAnimals({accessToken, setAnimals});
    } else if (animals.length && fetchingAnimals) {
      setFetchingAnimals(false);
      setLoading(false);
    }
  }, [accessToken, animals, fetchingAnimals]);

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }
  
  const animalsWithPhotos = animals.filter(animal => animal.photos.length);
  const animal = animalsWithPhotos[Math.floor(Math.random() * animalsWithPhotos.length)]
    || animals[0];

  return (
    <Animal animal={animal} />
  );
};

export default Page;
