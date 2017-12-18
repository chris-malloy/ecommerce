import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// css dependencies
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SlickSlider extends Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
        }
        var safeLinks = this.props.pl.map((pl, index) => {
            const safeLink = encodeURIComponent(pl.productLine);
            // console.log(safeLink);
            return (
                safeLink
            )
        })
        // temp fix to create links, erase when photos are in database
        return(
            <div className="container">
                <Slider {...settings}>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/1913-Ford-Model-T-Speedster.jpg" alt="1913-Ford-Model-T-Speedster" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/1954-Greyhound-Scenicruiser.jpg" alt="1954-Greyhound-Scenicruiser" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/1968-Ford-Mustang.jpg" alt="1968-Ford-Mustang" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/1950's-Chicago-Surface-Lines-Streetcar.jpg" alt="1950's-Chicago-Surface-Lines-Streetcar" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/1997-BMW-R-1100-S.jpg" alt="1997-BMW-R-1100-S" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/F:A-18-Hornet-1:72.jpg" alt="F:A-18-Hornet-1:72" /></Link></div>
                    <div className="slick-image"><Link to="/shop"><img src="/slider-images/The-Mayflower.png" alt="The-Mayflower" /></Link></div>
                </Slider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        auth: state.auth,
        pl: state.pl,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(SlickSlider);