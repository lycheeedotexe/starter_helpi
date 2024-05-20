import React from 'react';

//The following component was PARTIALLY made by LLM. Used LLM to help me design the basic outline of bar graph without using a special library. The code styles the bar graph 
export type DataItem = { 
  name: string ; 
  value: number;
};


type BarGraphProps = {
  data: DataItem[];
  color?: string;
};

const BarGraph: React.FC<BarGraphProps> = ({ data, color = "#4a90e2" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</div>
          <div style={{
            display: 'flex', 
            alignItems: 'center'
          }}>
            <div data-testid={`bar-${index}`} style={{
              width: `${(item.value / maxValue) * 100}%`,
              height: '20px',
              backgroundColor: color
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;




