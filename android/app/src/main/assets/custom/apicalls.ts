/* eslint-disable prettier/prettier */
const apikey: string = 'cf70d75ab095bd526bbc716343150ed0';
export const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const newMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const topRated: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;

export const movieDetails = (id:number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

