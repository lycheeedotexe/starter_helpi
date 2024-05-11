import React from 'react';

// Define the data type
type DataItem = {
  name: string;
  value: number;
};

// Props type
type BarGraphProps = {
  data: DataItem[];
  color?: string;
};

const BarGraph: React.FC<BarGraphProps> = ({ data, color = "#4a90e2" }) => {
  // Determine the maximum value for scaling the bars
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</div>
          <div style={{
            width: `${(item.value / maxValue) * 100}%`,
            height: '20px',
            backgroundColor: color
          }} />
        </div>
      ))}
    </div>
  );
};

export default BarGraph;

