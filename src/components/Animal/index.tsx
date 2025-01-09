import { type TSAnimal } from '../../ducks/animal';
import './index.scss';

interface TSProps { animal: TSAnimal };

const Animal = ({ animal }: TSProps) => (
  <section className="animalWrapper">
    <div className="animal">
      <h2>
        {animal.name}
      </h2>
      <h3>
        <a href={animal.url}>Adoptable!</a>
      </h3>
      {(animal.description || animal.tagsDescription) && (
        <div className="description">
          {animal.description && (
            <p>{animal.description}</p>
          )}
          {animal.tagsDescription && (
            <p>{animal.tagsDescription}</p>
          )}
          {location && (
            <p>{animal.location}</p>
          )}
        </div>
      )}
      {animal.photos.map(photo => (
        <div className="photoWrapper" key={photo.full}>
          <img
            alt={animal.name}
            src={photo.full} />
        </div>
      ))}
    </div>
  </section>
);

export default Animal;
