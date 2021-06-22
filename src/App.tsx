
import {BrowserRouter, Route } from "react-router-dom";
import { NewRoom } from "./pages/NewRoom";
// import { Home } from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={NewRoom}/>
    </BrowserRouter>
  );
}

export default App;