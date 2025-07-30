
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const Arrow = ({ size = 24, color = "gray" }) => {


    return (

      <Svg width="7" height="8" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 1.06245L1.04108 -9.53674e-07L6.71157 5.79036C6.80297 5.88314 6.87551 5.99347 6.92502 6.11501C6.97452 6.23654 7 6.36687 7 6.4985C7 6.63013 6.97452 6.76046 6.92502 6.88199C6.87551 7.00352 6.80297 7.11385 6.71157 7.20663L1.04108 13L0.000980854 11.9375L5.32314 6.5L0 1.06245Z" fill="gray"/>
</Svg>



    );
};

export default Arrow;









