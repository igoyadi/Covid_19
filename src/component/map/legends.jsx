import React from 'react';
 
// Your color scale array
const colorScale = ["#407BFF","#5C8FFF","#78A2FF","#A9C4FF", "#6D6D6D", "#878787", "#A0A0A0", "#B7B7B7","#D2D2D2"];
 
// Component for the color box
const ColorBox = ({ color }) => (
    <div
        className="color-box"
        style={{ backgroundColor: color, width: '50px' }}
        
    ></div>
);
 
// Component for the legend
const Legend = () => (
    <div className="legend" style={{display:'flex',width:'100px'}}>
        {colorScale.map((color, index) => (
            
                <ColorBox key={index} color={color}  />
            
        ))}
    </div>
);
 
export default Legend;