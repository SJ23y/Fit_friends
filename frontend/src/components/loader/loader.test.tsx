import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    const expectedText = /Loading/i;

    render(<Loader />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});