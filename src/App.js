import logo from './logo.svg';
import './App.css';
import MainHeader from './components/MainHeader/MainHeader.tsx';
import MainContent from './components/MainContent/MainContent.js';
function App() {
  return (
    <div className="App">
      <MainHeader />
      <MainContent />
    </div>
  );
}

export default App;
