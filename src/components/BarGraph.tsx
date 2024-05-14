import React from 'react';


type DataItem = {
  name: string;
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
            <span style={{ marginLeft: '10px' }}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;



