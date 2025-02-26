
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const CheckBoxActive = ({ size = 16, color = "black" }) => {


    return (

       <Svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="20" height="20" rx="4" fill={color} />
      <Path
        d="M16 5.94631L7.77143 14L4 10.3087L4.96686 9.36242L7.77143 12.1007L15.0331 5L16 5.94631Z"
        fill="white"
      />
    </Svg>


    );
};

export default CheckBoxActive;









