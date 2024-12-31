
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect,G,Defs } from 'react-native-svg';

const InfoIcon = ({ size = 24, color = "black" }) => {


    return (

       <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G clip-path="url(#clip0_685_251)">
<Path d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z" stroke="#D12E34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10 13.3333V10" stroke="#D12E34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10 6.66675H10.0083" stroke="#D12E34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</G>
<Defs>
<clipPath id="clip0_685_251">
<Rect width="20" height="20" fill="white"/>
</clipPath>
</Defs>
</Svg>


    );
};

export default InfoIcon;









