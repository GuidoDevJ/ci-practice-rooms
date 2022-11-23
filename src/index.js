"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./router");
const state_1 = require("./state");
const router_1 = require("@vaadin/router");
(function () {
    // Propuesta:
    // al comenzar (para evitar la primera pantalla)
    state_1.state.init();
    // recupera el state del localStorage
    const cs = state_1.state.getState();
    //   state.sincronizarDatos(1585)
    if (cs.rtdbId && cs.userId) {
        router_1.Router.go("/chat");
    }
})();
