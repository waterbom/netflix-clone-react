// 영화 정보를 미리 가져오는 것

import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie slice",
  initialState: {}, // tmdb 에서 객체로 받아오는중
  reducers: {
    reset(state) {
      state.results = undefined;
      state.page = 0;
    },
    init(state, action) {
      Object.assign(state, action.payload); // 전부다 복사해 버려라
    },
    append(state, action) {
      state.page = action.payload.page;
      state.results.push(...action.payload.results);
    },
  },
});

export const movieActions = movieSlice.actions; // 썽크는 해도되고 안해도 돼서 생략
