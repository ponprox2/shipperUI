// routes
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme

import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  const tempStaff = localStorage.getItem('staffID');
  useEffect(() => {
    if (!tempStaff) {
      navigate('/login');
    }
  }, []);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
