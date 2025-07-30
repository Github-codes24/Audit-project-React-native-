
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect,G,Defs } from 'react-native-svg';

const PlusIcon = ({ size = 20, color = "black" }) => {

    return (
<Svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M19.8333 1H3.16667C2.24619 1 1.5 1.74619 1.5 2.66667V19.3333C1.5 20.2538 2.24619 21 3.16667 21H19.8333C20.7538 21 21.5 20.2538 21.5 19.3333V2.66667C21.5 1.74619 20.7538 1 19.8333 1Z" fill="#592951" stroke="white" stroke-width="3" stroke-linejoin="round"/>
<Path d="M11.5001 6.55566V15.4446V6.55566ZM7.05566 11.0001H15.9446H7.05566Z" fill="#592951"/>
<Path d="M11.5001 6.55566V15.4446M7.05566 11.0001H15.9446" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

    );
};

export default PlusIcon;









