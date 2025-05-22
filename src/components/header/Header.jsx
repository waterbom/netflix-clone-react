import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { loadGenres } from "../../http/movieHttp";
import { genreActions } from "../../stores/slice/genreSlice";

import styles from "./Header.module.css";

const headerMenu = [
  "홈",
  "시리즈",
  "영화",
  "게임",
  "NEW! 요즘 대체 컨텐츠",
  "내가 찜한 리스트",
  "언어별로 찾아보기",
]; // 얘가 배열이기도 하고 state가 바꼈는데 아래에 있다면 불필요한 랜더링이 생기기 때문에 밖에 생성

// 맵이라는 함수를 쓸땐 항상 키가 필요함(여기서 메뉴는 중복 안되기 때문에 그냥 메뉴를 씀)
export default function Header({ mainWrapper, onChangeGenre }) {
  const genreList = useSelector((store) => store.genre); // 스토어에서 스토어장르를 가져와라, 비어있으면 땡겨와야함
  const headerDispatcher = useDispatch();

  const [needBlack, setNeedBlack] = useState(); // 얘가 트루면 검은색으로, false면 원래대로. 그 판단은 top if 문이 한다
  window.scrollHandler = () => {
    const rect = mainWrapper.current.getBoundingClientRect(); // rect라는 이름으로 가져옴
    const top = rect.top;

    setNeedBlack(top <= 0); // 이 위치에서 top이 0보다 작은지 계속 체크

    if (top <= 0) {
      console.log("카테고리를 검정색으로 칠한다.");
    } else {
      console.log("카테고리를 투명색으로 칠한다.");
    }
  };

  useEffect(() => {
    // 좋든 싫든 필요함. 땡겨와야 하기 때문에
    if (genreList.length === 0) {
      (async () => {
        const json = await loadGenres(); // await 하면 우리한테 json을 줄 것이다
        headerDispatcher(genreActions.init(json.genres)); // genres는 tmdb에서 던져준 json 페이로드
      })(); // 뒤에 노란색 소괄호 때문에 앞에 함수가 실행된다.
    }
  }, [genreList, headerDispatcher]); // 외부에서 끌어와 쓰고있기 때문에 워닝이 뜬다. 그래서 밖에 있는 genreList,headerDispatcher를 가져와야댐

  return (
    <>
      <div className={styles.headerMenu}>
        <div className="content">
          <ul className={`${styles.headerMainMenu} ${styles.logo}`}>
            {headerMenu.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`${styles.headerCategory} ${
          needBlack
            ? styles.headerCategoryBlackBackfround
            : styles.headerCategoryTransparentBackground
        }`}
      >
        <div className="content">
          <div className={styles.categoryType}>
            <h1>영화</h1>
            <select onChange={onChangeGenre}>
              <option value="">장르</option>
              {genreList.map(
                (
                  { id, name } // 이 genre에는 id 와 name 이 있다.(tmdb기준) 원래는 genre로 받았는데 객체분해로 받는다 (smart)
                ) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
