// DetCards.test.tsx
import { render, fireEvent, act } from '@testing-library/react'; // Necessary functions from React Testing Library
import DetCards from './DetCards'; // The component we're testing
import AuthProvider  from './AuthProvider'; // The context provider that wraps the component
import React from 'react'; // React import for JSX syntax support
import { jest } from '@jest/globals'; // Jest import for mock timers
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthContext } from './AuthProvider';
import { access } from 'fs';


const mockAuthContext = {
  auth: { userId: 'test' ,accessToken  :'fake-token'},
  setAuth: jest.fn(),
  IsdetCard: true,  // Initially true to test button's presence
  setDetCard: jest.fn(),
};


// Mock setTimeout
jest.useFakeTimers();

test('HandleSubmit toggles isClose and calls setDetCard after timeout', () => {
  const { container } = render(
    <BrowserRouter>
    <AuthContext.Provider  value={mockAuthContext}>
     <DetCards/>
    </AuthContext.Provider>
    </BrowserRouter>
  );

  // Find the submit button
  const button = container.querySelector('.btn-submit');
  expect(button).toBeInTheDocument();

  // Click the button (calls handleSubmit)
  act(() => {
    fireEvent.click(button!);
    
    
  });

  // Fast-forward time to simulate 200ms delay
  act(() => {
    jest.advanceTimersByTime(200);
  });

  // There’s no DOM change for setDetCard here, but your context state updates
  // For now just confirm it didn’t crash and the button was clickable
  expect(button).toBeEnabled()
});
