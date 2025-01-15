import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const CameraIcon = ({ size = 24, color = "black" }) => {


    return (

        <Svg width={size} height={size} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M10 6.82962C12.6316 6.82962 14.7368 9.18256 14.7368 12.1237C14.7368 15.0649 12.6316 17.4179 10 17.4179C7.36842 17.4179 5.26316 15.0649 5.26316 12.1237C5.26316 9.18256 7.36842 6.82962 10 6.82962ZM10 8.00609C9.02289 8.00609 8.08579 8.43991 7.39487 9.21212C6.70395 9.98433 6.31579 11.0317 6.31579 12.1237C6.31579 13.2158 6.70395 14.2631 7.39487 15.0354C8.08579 15.8076 9.02289 16.2414 10 16.2414C10.9771 16.2414 11.9142 15.8076 12.6051 15.0354C13.2961 14.2631 13.6842 13.2158 13.6842 12.1237C13.6842 11.0317 13.2961 9.98433 12.6051 9.21212C11.9142 8.43991 10.9771 8.00609 10 8.00609ZM3.15789 3.30021H5.26316L7.36842 0.947266H12.6316L14.7368 3.30021H16.8421C17.6796 3.30021 18.4829 3.67205 19.0751 4.33395C19.6673 4.99584 20 5.89356 20 6.82962V17.4179C20 18.3539 19.6673 19.2516 19.0751 19.9135C18.4829 20.5754 17.6796 20.9473 16.8421 20.9473H3.15789C2.32037 20.9473 1.51715 20.5754 0.924926 19.9135C0.332706 19.2516 0 18.3539 0 17.4179V6.82962C0 5.89356 0.332706 4.99584 0.924926 4.33395C1.51715 3.67205 2.32037 3.30021 3.15789 3.30021ZM7.8 2.12374L5.69474 4.47668H3.15789C2.59954 4.47668 2.06406 4.72458 1.66925 5.16584C1.27444 5.6071 1.05263 6.20558 1.05263 6.82962V17.4179C1.05263 18.0419 1.27444 18.6404 1.66925 19.0816C2.06406 19.5229 2.59954 19.7708 3.15789 19.7708H16.8421C17.4005 19.7708 17.9359 19.5229 18.3308 19.0816C18.7256 18.6404 18.9474 18.0419 18.9474 17.4179V6.82962C18.9474 6.20558 18.7256 5.6071 18.3308 5.16584C17.9359 4.72458 17.4005 4.47668 16.8421 4.47668H14.3053L12.2 2.12374H7.8Z" fill="black"/>
</Svg>


    );
};

export default CameraIcon;