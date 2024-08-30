import React, { useEffect, useRef, useState } from 'react';

// styles
import './styles.scss'; // Create a CSS file for your custom styles

const Tabs = ({ value, onChange, tabs, className, tabClassName, indicatorClassName }: any) => {
  const [indicatorStyle, setIndicatorStyle] = useState({width: "50px", left: "37px"});
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (tabRefs.current[value]) {
      const tabWidth = tabRefs.current[value]?.offsetWidth;
      const tabLeft = tabRefs.current[value]?.offsetLeft;

      setIndicatorStyle({
        width: '50px', 
        left: `${tabLeft + tabWidth / 2 - 25}px`, 
      });
    }
  }, [value, tabs.length]);

  return (
    <div className={`tabsWrapper ${className}`}>
      <div className="tabsContainer">
        {tabs.map((tab:any, index:any) => (
          <div
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`tab ${tabClassName} ${value === index ? 'activeTab' : ''}`}
            onClick={() => onChange(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div
        className={`tabsIndicator ${indicatorClassName}`}
        style={value === 0 ? {left: "37px", width: "50px"} : indicatorStyle}
      />
    </div>
  );
};

export default Tabs;
