"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
require("./pages/inicio/welcome");
require("./pages/chat/chat");
const router = new router_1.Router(document.querySelector('.root'));
router.setRoutes([
    { path: '/', component: 'custom-home' },
    { path: '/chat', component: 'chat-page' }
]);
