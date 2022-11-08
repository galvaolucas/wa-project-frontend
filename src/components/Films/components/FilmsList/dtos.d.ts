export interface IFilm {
    _id: string;
    movie_banner: string;
    title: string;
    description: string;
    director: string;
    producer: string;
}

export interface IFilmListProps {
    films: IFilm[];
    total: number;
    getFilmsFromApi: (skip: number, limit: number) => Promise<boolean>
    skip: number;
    setSkip: (arg: number) => void;
    limit: number;
}