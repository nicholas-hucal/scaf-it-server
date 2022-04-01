import React from 'react';
import './Hero.scss'; 

const Hero = () => {
    return (
        <header className="hero">
            <ul className="hero__list hero__list--main">
            	<li className="hero__list-item hero__list-item--active"></li>
            	<li className="hero__list-item"></li>
            </ul>
            <img className="hero__test-element hero__test-element--active"/>
        </header>
    )
}

export default Hero;