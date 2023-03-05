import { Routes, Route, Navigate } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import TodoPage from "./pages/todo";


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
       */}
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route index exact path="/todo" element={<TodoPage />} />
       </Routes>
    </div>
  );
}

export default App;
