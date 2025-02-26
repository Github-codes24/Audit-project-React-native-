import React from 'react';
import {Svg, Path, Mask, G, Rect, Circle} from 'react-native-svg';
import {wp, hp} from '../../../../utils';
const CheckboxInactive = ({size = 24, color = '#BDBDBD'}) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke={color} />
    </Svg>
  );
};

export default CheckboxInactive;
