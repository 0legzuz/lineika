import React from 'react';

interface ArchIconProps {
  color: string;
}

const ArchIcon: React.FC<ArchIconProps> = ({color }) => {
  return (
<svg transform="scale(3,3)" xmlns="http://www.w3.org/2000/svg" id="eIPqAdYNGzs1" 
viewBox="0 0 300 300"><g xmlns="http://www.w3.org/2000/svg" transform="matrix(-.512888 0.858456-.858456-.512888 288.975927 148.199883)">
  <path d="M115.94851,62.20544c59.96224.00001,108.57123,47.18634,108.57123,105.39363h-217.14247c0-58.2073,48.60899-105.39362,108.57123-105.39363h.00001ZM7.37727,195.762v-28.16292h217.14247v28.16292h-217.14247Z" 
  stroke="#000"/>
  <path d="M115.94851,62.20544c59.96224.00001,108.57123,47.18634,108.57123,105.39363h-217.14247c0-58.2073,48.60899-105.39362,108.57123-105.39363h.00001ZM7.37727,195.762v-28.16292h217.14247v28.16292h-217.14247Z" 
  transform="translate(-3.948505-4.271777)" 
  fill={color} stroke={color}/>
  </g></svg>);
};

export default ArchIcon;
