import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/progressBar';

describe('ProgressBar Component', () => {
    it('renders correctly with 50% progress', () => {
      render(<ProgressBar progress={50} progressText="50% Complete" />);
      const progressBar = screen.getByText("50% Complete");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle('width: 50%');
    });

    it('handles boundary condition at 0%', () => {
      render(<ProgressBar progress={0} progressText="0% Complete" />);
      const progressBar = screen.getByText("0% Complete");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle('width: 0%');
    });

    it('handles boundary condition at 100%', () => {
      render(<ProgressBar progress={100} progressText="Completed" />);
      const progressBar = screen.getByText("Completed");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle('width: 100%');
    });
});



  