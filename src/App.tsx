import React from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Detail from './pages/Detail';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';



function App() {


  // 3개의 페이지가 필요, 홈페이지, 무비페이지, 세부페이지
  // 홈페이지에서 배너를 볼 수 있다.
  // 3가지 종류의 섹션 영화를 볼 수 있다. (인기, 순위, 올린순)
  // 각 영화에 마우스 올려두면 제목, 장르, 점수, 인기도, 청불여부 알 수 있음
  // 각 센션 별 슬라이드로 넘기면서 볼 수 있음
  // 영화 디테일 페이지에서 영화 디테일 정보 확인 가능
  // 영화 리뷰 포보기 가능, 관련 영화 보기 가능
  // 영화 키워드로 검색 가능
  // 영화 정렬 가능, 영화 필터링가능(장르별 등등)

  return (
    <div className="App">
      
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/search' element={<Movies/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
