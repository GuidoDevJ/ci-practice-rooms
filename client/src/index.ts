import "./router"
import { state } from "./state";
import { Router } from '@vaadin/router';

(function () {
  // Propuesta:
  // al comenzar (para evitar la primera pantalla)
  state.init()
  // recupera el state del localStorage
  const cs = state.getState()
//   state.sincronizarDatos(1585)
  if(cs.rtdbId && cs.userId){
    Router.go("/chat")

  }
})();
