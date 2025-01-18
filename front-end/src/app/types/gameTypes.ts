export interface Game {
  id: number;
  title: string;
  year: number;
  imgUrl: string;
  shortDescription: string;
  genre: string;
  longDescription: string;
  score: number;
}

export interface Genre {
  id: number;
  name: string;
  imgUrl: string;
}
