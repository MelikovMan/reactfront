import logo from './logo.svg';
import './App.css';
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes/index.jsx"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
const queryClient = new QueryClient();
function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
