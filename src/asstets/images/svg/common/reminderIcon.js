
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const RemianderIcon = ({ size = 24, color = "black" }) => {
    return (
<Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15 2V2.5H15.5H17.5C18.9239 2.5 20 3.57614 20 5V8.5H1V5C1 3.57614 2.07614 2.5 3.5 2.5H5.5H6V2V1C6 0.813624 6.05994 0.697164 6.12855 0.628553C6.19716 0.559943 6.31362 0.5 6.5 0.5C6.68638 0.5 6.80284 0.559943 6.87145 0.628553C6.94006 0.697164 7 0.813624 7 1V2V2.5H7.5H13.5H14V2V1C14 0.813624 14.0599 0.697164 14.1286 0.628553C14.1972 0.559943 14.3136 0.5 14.5 0.5C14.6864 0.5 14.8028 0.559943 14.8714 0.628553C14.9401 0.697164 15 0.813624 15 1V2ZM1 9.5H20V17C20 18.4239 18.9239 19.5 17.5 19.5H3.5C2.07614 19.5 1 18.4239 1 17V9.5Z" stroke={color}/>
</Svg>



    );
};

export default RemianderIcon;









