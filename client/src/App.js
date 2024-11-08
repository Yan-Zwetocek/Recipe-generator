import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import AppRouter from "./Components/AppRouter";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
