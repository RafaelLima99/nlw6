import {BrowserRouter, Route } from "react-router-dom";
import { NewRoom } from "./pages/NewRoom"; 
import { Home } from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      {/* exact siguinifica que a rota tem que ser exatamente do jeito que está no atributo path */}
      <Route path="/" exact component={Home}/>
      <Route path="/rooms/new" component={NewRoom}/>

    </BrowserRouter>
  
  );
}

export default App;