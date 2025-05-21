import { useSelector } from "react-redux";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecommendMovieList({ sectionTitle }) {
  const recommendMovieList = useSelector((store) => store.movie); //얘는 메인에서 패치를 해온거라 다시 패치할 필요가 없음! state에 의해서 공유되기 때문

  if (!recommendMovieList.results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recommend-movie content">
      <h3>{sectionTitle}</h3>
      <div className="movie-list">
        <Slider
          dots={false}
          infinite={true}
          slidesToShow={5}
          slidesToScroll={5}
          autoplay={false}
          speed={1000}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 783,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          {recommendMovieList.results.map(
            (
              { id, genre_ids, poster_path, release_date, title } // 객체 분해해서 나 저것들 필요하다!
            ) => (
              <div key={id} className="movie-item">
                <div>
                  <img
                    alt={title}
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`}
                  />
                  <div className="buttons-container">
                    <div>
                      <button className="circle-button white-button play-icon-center"></button>
                      <button className="circle-button transparent-button plus-icon-center"></button>
                      <button className="circle-button transparent-button good-icon-center"></button>
                    </div>
                    <button className="circle-button transparent-button more-icon-center"></button>
                  </div>
                  <div className="movie-detail-info-container age-15 hd">
                    {release_date}
                  </div>
                  <div className="tags">
                    {genre_ids.map((id) => (
                      <li key={id}>{id}</li>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      </div>
    </div>
  );
}
