import axios from 'axios';
import {
  type Dispatch,
  SetStateAction,
} from 'react';

interface TSAnimalResponse {
  contact: {
    email: string | null,
    phone: string | null,
    address: {
      address1: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      postcode: string | null,
      country: string | null,
    }
  },
  description: string,
  id: number,
  name: string,
  photos: {
    small: string,
    medium: string,
    large: string,
    full: string,
  }[],
  tags: string[],
  url: string,
}

type TSAnimalsResponse = {
  data: {
    animals: [TSAnimal],
  },
};

export interface TSAnimal extends TSAnimalResponse {
  location: string,
  tagsDescription: string,
}

export const animalDefault: TSAnimal = {
  contact: {
    email: '',
    phone: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    }
  },
  description: '',
  id: 0,
  location: '',
  name: '',
  photos: [],
  tags: [],
  tagsDescription: '',
  url: '',
};

const enhanceAnimalResponse = (animal: TSAnimalResponse): TSAnimal => ({
  ...animal,
  location: [animal.contact.address.city, animal.contact.address.state].filter(location => location).join(', '),
  tagsDescription: animal.tags.join(', '),
})

const renewAnimals = ({
  accessToken,
  setAnimals,
}:
  {
    accessToken: string,
    setAnimals: Dispatch<SetStateAction<TSAnimal[]>>,
  }) => {
  axios.get('https://api.petfinder.com/v2/animals', {
    params: {
      limit: 100,
      status: 'adoptable',
      special_needs: true,
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  })
    .then((response: TSAnimalsResponse) => {
      setAnimals(response.data.animals.map(enhanceAnimalResponse));
    })
    .catch(error => {
      console.log(error);
    });
};

export default renewAnimals;
