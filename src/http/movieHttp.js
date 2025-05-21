const apiKey = "7d881aae4496a492f554fbb22f62569f";
const apiReadToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDg4MWFhZTQ0OTZhNDkyZjU1NGZiYjIyZjYyNTY5ZiIsIm5iZiI6MTc0NzczMDE4Ny40NzksInN1YiI6IjY4MmMzZjBiZTRiM2Y5OTlkZmUyNTFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7c4VmlhSkMrnYrktrEq-tqz2R7x8_kX8f7sjc-uFKSM";

export async function loadGenres() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiReadToken}`,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=ko",
    options
  );
  // .then((res) => res.json())
  // .then((res) => console.log(res))
  // .catch((err) => console.error(err)); 프로미스방식

  const json = await response.json(); // 절대 실패하지않음.
  return json;
}

export async function loadMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiReadToken}`,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-KR&page=1&region=ko&sort_by=popularity.desc",
    options
  );
  // .then((res) => res.json())
  // .then((res) => console.log(res))
  // .catch((err) => console.error(err));

  const json = await response.json();
  return json;
}
