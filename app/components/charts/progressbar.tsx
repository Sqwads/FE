"use client"
import React from "react";


const CustomProgress = ({
    value,
    total=100,
    bgColor,
    label,
    lightBgColor,
  
 
  }: {
    value: number;
    total?: number;
    bgColor:string;
    label: string;
    lightBgColor?: string;
   
  }) => {

    const Parentdiv = {
      height: "5px",
      width: "100%",
      backgroundColor: lightBgColor || "#CDD4DA",
      borderRadius: 40,
      cursor: "pointer",
      border: 0,
    };
  
    const Childdiv = {
      height: "100%",
      width:` ${(value/total) * 100}%`,
      backgroundColor: bgColor,
      borderRadius: 40,
    };
  
    return (
      <div>
        <div className="mb-">
            {label}
        </div>

        <div
          className="flex items-center"
        >
          <div className="flex-1 mr-2" style={Parentdiv}>
            <div style={Childdiv}></div>
          </div>
          <div className="font-medium text-sm">({value}%)</div>
        </div>
      </div>
    );
  }
  
  export default CustomProgress;