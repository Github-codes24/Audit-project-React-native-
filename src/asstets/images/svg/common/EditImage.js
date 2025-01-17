import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const EditImage = ({ size = 24, color = "black" }) => {


    return (

        <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M1 19.4473H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5 15.4473V11.4473L15 1.44727L19 5.44727L9 15.4473H5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M12 4.44727L16 8.44727" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>


    );
};

export default EditImage;