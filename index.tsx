import ReactDOM from 'react-dom/client'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Creating a  new QueryClient instance
const queryClient = new QueryClient();

// Creating the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
