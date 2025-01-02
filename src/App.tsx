import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import FormComponent from './components/FormComponent'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {

  return (
    <ThemeProvider theme={theme} defaultMode='system'>
      <FormComponent />
    </ThemeProvider>
  )
}

export default App
