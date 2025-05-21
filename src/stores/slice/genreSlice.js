import { createSlice } from "@reduxjs/toolkit";

export const genreSliceStore = createSlice({
  name: "genre slice",
  initialState: [],
  reducers: {
    init(state, action) {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
  },
}); // 영화는 데이터가 쉽게 바뀌지않기 떄문에 슬라이스를 만드는 것이 이득

export const genreActions = genreSliceStore.actions;
