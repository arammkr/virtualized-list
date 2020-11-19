import { AdvisorsProvider } from './context/Advisors';
import AdvisorsList from './pages/AdvisorsList';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AdvisorsProvider>
          <AdvisorsList/>
        </AdvisorsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
