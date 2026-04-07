import React from 'react';

interface ImposterIconProps {
  className?: string;
}

export default function ImposterIcon({ className }: ImposterIconProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shoulder/Body - Black */}
      <path 
        d="M20 90C20 75 30 65 50 65C70 65 80 75 80 90" 
        fill="black" 
      />
      
      {/* Head/Face - Black */}
      <circle cx="50" cy="45" r="20" fill="black" />
      
      {/* Hat - Black */}
      <path 
        d="M25 35H75" 
        stroke="black" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      <path 
        d="M35 35V20H65V35" 
        fill="black" 
      />
      
      {/* White Specs (Glasses) */}
      <g stroke="white" strokeWidth="2.5">
        <circle cx="42" cy="45" r="5.5" />
        <circle cx="58" cy="45" r="5.5" />
        <line x1="47.5" y1="45" x2="52.5" y2="45" />
        {/* Arms of glasses */}
        <line x1="32" y1="45" x2="36.5" y2="45" />
        <line x1="63.5" y1="45" x2="68" y2="45" />
      </g>
    </svg>
  );
}
