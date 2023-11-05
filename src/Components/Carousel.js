import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from "../Assets/LoginPage/hahhresize.jpg"
import image2 from "../Assets/LoginPage/kietch2.jpg"
import image3 from "../Assets/LoginPage/oven1.jpg"
import image4 from "../Assets/LoginPage/kietch2.jpg"
import "./Carousel.css";


const responsive = {
  desktop: {
    breakpoint: { max: 2000, min: 800 },
    items: 1,
    partialVisibilityGutter: 100
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

export function AnimationPhoto() {

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      arrows={false}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition=" all transform 200ms ease-in-ease-out"
      transitionDuration={500}
      containerClass="carousel-container"
      partialVisbile={false}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      rewind={true}
      rewindWithAnimation={true}
      centerMode={true}


    >
      <img src={image1} className="imageStyle" alt="no data" />
      <img src={image2} className="imageStyle" alt="no data" />
      <img src={image3} className="imageStyle" alt="no data" />
      <img src={image4} className="imageStyle" alt="no data" />
    </Carousel>
  )

}