import {BrowserRouter, Route, Switch } from "react-router-dom";
import { NewRoom } from "./pages/NewRoom"; 
import { Home } from "./pages/Home";
import {AuthContextProvider} from './contexts/AuthContext'
import { Room } from "./pages/Room";

function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* exact siguinifica que a rota tem que ser exatamente do jeito que está no atributo path */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new"  component={NewRoom}/>
          <Route path="/rooms/:id"  component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  
  );
}

export default App;