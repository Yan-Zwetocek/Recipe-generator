import { BrowserRouter } from "react-router-dom";
import Heder from "./Components/Heder/Heder";
import AppRouter from "./Components/AppRouter";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Heder/>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
