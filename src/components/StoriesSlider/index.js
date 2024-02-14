import Slider from 'react-slick'
import './index.css'

const StoriesSlider = props => {
  const {storiesList} = props
  console.log(storiesList)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <Slider {...settings}>
        {storiesList.map(eachStory => (
          <div className="slider-story-container" key={eachStory.userId}>
            <img
              className="slider-story-img"
              src={eachStory.storyUrl}
              alt="user story"
            />
            <p className="story-user-name">{eachStory.userName}</p>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default StoriesSlider
