import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SlideCard from '../components/SlideCard';



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


interface MovieSlideType{
  movies : any
}
const MovieSlide:React.FC<MovieSlideType> = ({movies}) => {

  return (
    <div className="movieSlide">
      <Carousel responsive={responsive} className="carousel">
        {movies && 
          movies.results !== undefined ?
           movies.results.map((movieEl:[], i:number)=>{
            return <SlideCard key={i} movieList={movieEl}/>
           })
           :<div/>  
       }
      </Carousel>
    </div>
  )
};

export default MovieSlide;
