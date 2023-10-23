import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Four0Four from "./components/Four0Four";
import Auth from "./page/Auth/Auth";
import Chat from "./page/Chat/Chat";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Four0Four />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
