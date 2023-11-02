

## 프로젝트명
***Movie Bo Go***

<img src="https://user-images.githubusercontent.com/107159871/222892571-35738ee3-8437-4754-ac67-fe17696ea0a5.png"></img>

## 프로젝트 목적
- https://www.themoviedb.org/ (TMDB) 사이트의 API를 사용하여 만든 타입스크립트, 리액트 기반 영화 소개 앱입니다. TMDB는 거의 완성에 가까운 API를 무료로 제공해주는 사이트로서 REST API에 대한 학습과 다양한 프론트엔드 기술을 획득하고 연습해볼 수 있는 기회가 될 것 같기에 이를 기반으로 사이트를 제작하게 되었습니다.

## 배포 URL(도메인)
- https://youngwan2.github.io/movieapp/

## 개발 기간
- 2022/12/11 ~ 2023/01/05

## 사용된 주요 라이브러리 및 프레임워크(기타 API포함)
### 프론트엔드
- <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
- <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
- <img src="https://img.shields.io/badge/Redux toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
- <img src="https://img.shields.io/badge/TanStack Query-764ABC?style=for-the-badge&logo=react-query&logoColor=white">

### 백엔드
- <img src="https://img.shields.io/badge/The Movie Database(TMDB)-764ABC?style=for-the-badge&logo=&logoColor=white">


## 주요기능
### 영화 키워드 검색 기능
- 사용자가 자신이 찾고자 하는 영화제목을 입력하면 해당 영화정보에 대한 GET 요청을 통해 정보를 조회할 수 있도록 기능을 구현

### 장르별/연도별조회 기능
- 사용자의 관심 주제에 맞게 필요한 정보에 바로 접근할 수 있도록 장르별로 영화 정보를 조회할 수 있도록 기능을 구현하였습니다.
- 연도에 따라 영화 정보를 인기순으로 즉시 조회할 수 있도록 HTML input 의 타입 속성 중 range 를 통해 드래그 시 바로 조회할 수 있게 구현하였습니다.

### 분류 기능(인기순/수익 높은 순 등)
- 인기순/수익 높은 순/최근 순 등에 따라서 사용자가 선택한 정렬 기준에 맞춰 영화 정보를 조회할 수 있도록 기능을 구현하였습니다.

### 그 외 기능
- 페이지네이션 기능 : 일반적인 형태로서 페이지 번호로 구분한 페이지네이션 기능을 바닐라 자바스크립트로 구현하였습니다.
- 디테일 페이지 : 영화정보에 대한 세부 정보 및 영화 미리보기, 유사한 영화 정보, 게스트, 리뷰 정보 등을 확인할 수 있도록 페이지를 구현하였습니다.
---
## [참고] 개선사항
- (로직 개선) 영화 세부정보 페이지에서 탭 메뉴 선택 시 중복으로 데이터 요청되는 문제 발견 및 개선(기존 useCallback 으로 캐싱처리한 부분을 tanstack query 로 변경) (23.11.02) 
