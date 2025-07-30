
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const CheckIcon = ({ size = 24, color = "black" }) => {
    return (
<Svg width="24" height="24" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect x="0.5" y="0.5" width="30" height="30" rx="15" fill="#592951"/>
<Rect x="0.5" y="0.5" width="30" height="30" rx="15" stroke="black"/>
<Path d="M23.587 10.71L12.4963 21.565L7.41309 16.5898L8.71624 15.3143L12.4963 19.005L22.2838 9.43457L23.587 10.71Z" fill="white"/>
</Svg>




    );
};

export default CheckIcon;









