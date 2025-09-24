import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/ui/Header";
import { DirectorView } from "./components/directores/DirectorView";
import { GeneroView } from "./components/generos/GeneroView";
import { MediaView } from "./components/medias/MediaView";
import { ProductoraView } from "./components/productoras/ProductoraView";
import { TipoView } from "./components/tipos/TipoView";
import { MediaEdit } from "./components/medias/MediaEdit";

const App = () => {
  return (
    <Router>
      <Header />          
      <Switch>
        <Route exact path="/" component={MediaView} />
        <Route exact path="/directores" component={DirectorView} /> 
        <Route exact path="/generos" component={GeneroView} />        
        <Route exact path="/productoras" component={ProductoraView} />
        <Route exact path="/tipos" component={TipoView} />
        <Route exact path="/medias/edit/:id" component={MediaEdit} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export { App };