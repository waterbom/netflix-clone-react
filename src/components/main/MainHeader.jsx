import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { loadMovies } from "../../http/movieHttp";
import { movieActions } from "../../stores/slice/movieSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

export default function MainHeader() {
  const movieList = useSelector((store) => store.movie);
  const mainHeaderDispatcher = useDispatch();

  const BackDrop = styled.div`
    position: absolute;
    background-image: url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${({
      url,
    }) => url}");
    background-size: ${window.innerWidth}px;
    background-repeat: no-repeat;
    width: 100%;
    height: 730px;
    z-index: -1;
  `;

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
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        speed={1000}
        autoplaySpeed={5000}
        cssEase="linear"
      >
        {bestMovies.map((movie) => (
          <div key={movie.id} className="slider-item">
            <BackDrop url={movie.backdrop_path} />
            <div className="content big-header">
              <div>
                <h1 className="top-movie-subject">{movie.title}</h1>
                <h2 className="top-movie-1">
                  <div className="top10">
                    <div className="top">TOP</div>
                    <div className="top-number">10</div>
                  </div>
                  오늘 영화 순위 1위
                </h2>
                <p className="top-movie-summary">{movie.overview}</p>
                <button className="white-button play-icon">재생</button>
                <button className="tranparent-50-button info-icon">
                  상세정보
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </header>
  );
}
