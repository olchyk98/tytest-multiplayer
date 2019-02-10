import React from 'react';
import './main.css';

import LoadIcon from '../load.icon';

const Hero = ({ active }) => (
    <div className={ `gl-loadingbg${ (!active) ? "" : " enabled" }` }>
        <LoadIcon />
    </div>
);

export default Hero;