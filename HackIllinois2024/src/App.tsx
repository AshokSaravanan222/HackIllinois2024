import React from 'react';
import { RouterProvider } from 'react-router-dom';

const App: React.FC<{ router: any }> = ({ router }) => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
