// FILE: src/components/__tests__/SatelliteCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SatelliteCard from '../SatelliteCard';

expect.extend(toHaveNoViolations);

// Mock motion/react — use require() inside factory to avoid out-of-scope variable error
jest.mock('motion/react', () => {
  const ReactMock = require('react');
  const MotionDiv = ReactMock.forwardRef(function MotionDiv({ children, variants, initial, animate, exit, whileInView, viewport, custom, ...domProps }, ref) {
    return ReactMock.createElement('div', { ...domProps, ref }, children);
  });
  MotionDiv.displayName = 'MotionDiv';
  const MotionArticle = ReactMock.forwardRef(function MotionArticle({ children, variants, initial, animate, exit, whileInView, viewport, custom, ...domProps }, ref) {
    return ReactMock.createElement('div', { ...domProps, ref }, children);
  });
  MotionArticle.displayName = 'MotionArticle';
  return {
    motion: { div: MotionDiv, article: MotionArticle },
    AnimatePresence: ({ children }) => children,
  };
});

const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project for unit testing.',
  tags: ['React', 'Jest'],
  color: '#6c63ff',
};

describe('SatelliteCard', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(
      <SatelliteCard project={null} onClose={() => {}} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders project details when project is provided', () => {
    render(<SatelliteCard project={mockProject} onClose={() => {}} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<SatelliteCard project={mockProject} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close project details/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = jest.fn();
    render(<SatelliteCard project={mockProject} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has dialog role and aria-modal', () => {
    render(<SatelliteCard project={mockProject} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SatelliteCard project={mockProject} onClose={() => {}} />,
    );
    const results = await axe(container, {
      rules: { 'aria-allowed-role': { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
