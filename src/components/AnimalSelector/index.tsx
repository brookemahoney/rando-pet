import { type TSAnimal } from '../../ducks/animal';
import './index.scss';

interface TSProps { animal: TSAnimal };

const Animal = ({ animal }: TSProps) => (
  <section className="animalWrapper">
    <div className="animal">
      <h2 className='name'>
        {animal.name}
      </h2>
      {(animal.description || animal.tagsDescription) && (
        <div className="description">
          {animal.tagsDescription && (
            <p>{animal.tagsDescription}</p>
          )}
          {animal.description && (
            <p>{animal.description}</p>
          )}
          <p>
            <a target="_blank" href={animal.url}>Read more</a>
          </p>
          {animal.location && (
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
