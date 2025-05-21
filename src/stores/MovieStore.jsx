// 슬라이스들을 다 담아둘 공간

import { configureStore } from "@reduxjs/toolkit";
import { genreSliceStore } from "./slice/genreSlice";
import { movieSlice } from "./slice/movieSlice";
import { Provider } from "react-redux";

const netflixStore = configureStore({
  reducer: {
    genre: genreSliceStore.reducer,
    movie: movieSlice.reducer,
  },
}); // 스토어에 들어갈 스테이트 작성

export default function MovieStore({ children }) {
  return <Provider store={netflixStore}>{children}</Provider>;
}
