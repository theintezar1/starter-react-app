import React from "react";
import { BrowserRouter} from "react-router-dom";
import RouteComponent from "./Components/Routes/route.config";



function App() {
  return (
    <BrowserRouter>
    <RouteComponent/>
    </BrowserRouter>
  );
}

export default App;