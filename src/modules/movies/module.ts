import {
  listMovies,
  getMovie,
  search,
  createNewMovie,
  updateExistingMovie,
  deleteExistingMovie,
} from "./movie.controller";

export interface MovieModule {
  controller: {
    listMovies: typeof listMovies;
    getMovie: typeof getMovie;
    search: typeof search;
    createMovie: typeof createNewMovie;
    updateMovie: typeof updateExistingMovie;
    deleteMovie: typeof deleteExistingMovie;
  };
}

export const createMovieModule = (): MovieModule => {
  return {
    controller: {
      listMovies,
      getMovie,
      search,
      createMovie: createNewMovie,
      updateMovie: updateExistingMovie,
      deleteMovie: deleteExistingMovie,
    },
  };
};
