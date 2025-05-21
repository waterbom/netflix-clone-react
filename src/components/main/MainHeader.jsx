import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { loadMovies } from "../../http/movieHttp";
import { movieActions } from "../../stores/slice/movieSlice";
import Slider from "react-slick/lib/slider";

export default function MainHeader() {
  const movieList = useSelector((store) => store.movie);
  const mainHeaderDispatcher = useDispatch();

  useEffect(() => {
    (async () => {
      console.log(movieList);
      if (!movieList.results) {
        // 무비리스트는 length가 아니다! 무비 리스트에 결과가 없으면 받아와라
        const movieJson = await loadMovies();
        mainHeaderDispatcher(movieActions.init(movieJson));
      }
    })();
  }, [movieList, mainHeaderDispatcher]);

  if (!movieList.results) {
    // loading 이 뜨고 난 뒤에 패치가 진행되어서 사진이 뜨게 됨!
    return <div>Loading...</div>;
  }

  const bestMovies = movieList?.results?.slice(0, 5); // 베스트 무비 가져오기 (대표무비)

  return (
    <header className="slider-container">
      <Slider
        arrows={false}
        dots={false}
        infinite={true}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay={true}
        speed={2000}
        autoplaySpeed={2000}
        cssEase={"linear"}
      ></Slider>
      <div>
        <img
          alt={bestMovies[0].title}
          className="thumbnail"
          src={`http://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${bestMovies[0].backdrop_path}`} // 처음에는 데이터가 없으니까 에러가 뜸 패치하고 난 뒤에 데이터를 받아와야 뜬다!
        />
        <div className="content big-header">
          <div>
            <h1 className="top-movie-subject">{bestMovies[0].title}</h1>
            <h2 className="top-movie-1">
              <div className="top10">
                <div className="top">TOP</div>
                <div className="top-number">10</div>
              </div>
              오늘 영화 순위 1위
            </h2>
            <p className="top-movie-summary">{bestMovies[0].overview}</p>
            <button className="white-button play-icon">재생</button>
            <button className="tranparent-50-button info-icon">상세정보</button>
          </div>
        </div>
      </div>
    </header>
  );
}
