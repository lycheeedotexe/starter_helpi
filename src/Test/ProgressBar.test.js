import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/progressBar';


describe('ProgressBar Component', () => {
    test('renders correctly', () => {
      render(<ProgressBar progress={50} progressText="50% Complete" />);
      const progressBar = screen.getByText("50% Complete");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle('width: 50%');
    });
});


  