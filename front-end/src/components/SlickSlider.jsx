import React, { Component } from 'react';
import Slider from 'react-slick';
// css dependencies
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SlickSlider extends Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToSchroll: 1,
            autoplay: true,
        }
        return(
            <div className="container">
                <Slider {...settings} >
                    <div className="slick-image"><img src="/slider-images/ferrari.jpg" alt="ferrari" /></div>
                    <div className="slick-image"><img src="/slider-images/lamb.jpg" alt="lamb" /></div>
                    <div className="slick-image"><img src="/slider-images/train.jpg" alt="train" /></div>
                </Slider>
            </div>
        )
    }
}
export default SlickSlider;