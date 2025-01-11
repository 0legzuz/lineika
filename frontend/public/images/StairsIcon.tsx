import React from 'react';

interface StairsIconProps {
  color: string;
}

const StairsIcon: React.FC<StairsIconProps> = ({color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" transform='scale(2.5,2.5)'>
     <g >
     <path d="M11.731844,288.344337L204.08837,114.852573l2.285424,172.349052-194.64195,1.142712Z" 
     transform="matrix(.920789 0 0 1.058265 8.638183-11.746134)" stroke="#000" stroke-width="0.6"/>
     <path d="M11.731844,288.344337L204.08837,114.852573l2.285424,172.349052-194.64195,1.142712Z" 
     transform="matrix(.920789 0 0 1.058265 4.585364-16.516303)" 
     fill={color } stroke={color } stroke-width="0.6"/></g>    </svg>
  );
};


export default StairsIcon;
