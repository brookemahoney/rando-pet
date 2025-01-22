import { Dispatch, SetStateAction } from 'react';
import { TSAnimal, selectRandomAnimal } from '../../ducks/animal';
import './index.scss';

interface TSProps {
  animals: TSAnimal[],
  setAnimal: Dispatch<SetStateAction<TSAnimal>>,
};

const AnimalSelector = ({ animals, setAnimal }: TSProps) => {
  const onRandomizeClick = () => {
    setAnimal(selectRandomAnimal(animals));
  };

  return (
    <section className="animalSelectorWrapper">
      <button onClick={onRandomizeClick}>Randomize</button>
    </section>
  );
};

export default AnimalSelector;
