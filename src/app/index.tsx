import { AppProvider } from './provider';
import { AppRouter } from './router';
// abc
export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
