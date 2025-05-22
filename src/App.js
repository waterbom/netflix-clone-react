import { useState, useEffect, useRef } from "react";
import Header from "./components/header/Header";
import MovieStore from "./stores/MovieStore";
import MainHeader from "./components/main/MainHeader";
import RecommendMovieList from "./components/main/MovieList";

// MovieStore감싸야 useSelector를 제공할 수 있다.
function App() {
  const mainWrapperRef = useRef(); // 이걸로 top의 위치를 main-wrapper로가져온다 이걸 헤더한테 보내주고 헤더가 받으면 header에서 작동

  const [chosenGenre, setChosenGenre] = useState();
  const changeGenreHandler = (event) => {
    setChosenGenre(event.currentTarget.value);
  };

  return (
    <MovieStore>
      <Header mainWrapper={mainWrapperRef} onChangeGenre={changeGenreHandler} />
      <div className="main-wrapper" ref={mainWrapperRef}>
        <MainHeader genre={chosenGenre} />
        {!chosenGenre && (
          <>
            <RecommendMovieList sectionTitle="회원님을 위해 엄선한 오늘의 콘텐츠" />
            <RecommendMovieList sectionTitle="공포영화 보고 여름을 시원하게 보내자!" />
            <RecommendMovieList sectionTitle="달달한 로맨스 영화 콘텐츠" />
          </>
        )}
      </div>
    </MovieStore>
  );
}

export default App;
