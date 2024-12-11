import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App';
import { ThemeProvider } from './theme/theme-provider';
import PageRoutes from './Routes';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <React.Suspense>
          <PageRoutes />
        </React.Suspense>
      </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
);
