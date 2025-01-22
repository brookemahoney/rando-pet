import { useEffect, useState } from 'react';
import renewAccessToken from './ducks/auth';
import renewAnimals, { TSAnimal, animalDefault, selectRandomAnimal } from './ducks/animal';
import Animal from './components/Animal';
import AnimalSelector from './components/AnimalSelector';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [animals, setAnimals] = useState<TSAnimal[]>([]);
  const [fetchingAnimals, setFetchingAnimals] = useState(false);
  const [animal, setAnimal] = useState(animalDefault);
  
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
      setAnimal(selectRandomAnimal(animals));
    }
  }, [accessToken, animals, fetchingAnimals]);

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }

  return (
    <>
      <Animal animal={animal} />
      <AnimalSelector animals={animals} setAnimal={setAnimal} />
    </>
  );
};

export default Page;
