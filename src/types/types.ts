export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
      path: string;
      extension: string;
  };
  comics: ResourceList; 
  series: ResourceList; 
}

export interface CharactersResponse {
  data: {
      results: Character[];
  };
}

export interface ResourceList {
  available: number;
  items: { name: string }[];
}

export interface ModalCharactersProps {
  name: string;
  description: string;
  comics: ResourceList;
  series: ResourceList;
}

export interface MarvelCharactersProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}
