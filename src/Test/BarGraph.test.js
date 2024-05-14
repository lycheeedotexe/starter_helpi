import React from 'react';
import { render, screen } from '@testing-library/react';
import BarGraph from '../components/BarGraph';

describe('BarGraph Component', () => {
  const testData = [
    { name: 'Item 1', value: 100 },
    { name: 'Item 2', value: 200 },
    { name: 'Item 3', value: 300 },
  ];

  it('renders correctly with data', () => {
    render(<BarGraph data={testData} />);
    testData.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('displays bars with correct scaling', () => {
    render(<BarGraph data={testData} />);
    testData.forEach((item, index) => {
      const bar = screen.getByTestId(`bar-${index}`);
      const expectedWidth = `${(item.value / 300) * 100}%`;
      expect(bar).toHaveStyle(`width: ${expectedWidth}`);
    });
  });

  it('applies the default background color if none is provided', () => {
    render(<BarGraph data={testData} />);
    testData.forEach((item, index) => {
      const bar = screen.getByTestId(`bar-${index}`);
      expect(bar).toHaveStyle('background-color: #4a90e2');
    });
  });

  it('applies a custom background color when provided', () => {
    const customColor = "#ff6347";
    render(<BarGraph data={testData} color={customColor} />);
    testData.forEach((item, index) => {
      const bar = screen.getByTestId(`bar-${index}`);
      expect(bar).toHaveStyle(`background-color: ${customColor}`);
    });
  });
});


