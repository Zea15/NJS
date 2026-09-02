export type Member = {
  name: string;
  image: string;
};

export type Bands = {
  id: number;
  title: string;
  image: string;
  immember?: string;
  member?: string;
  songs: string;
  members?: Member[];
};
