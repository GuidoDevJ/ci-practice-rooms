import {Router} from '@vaadin/router';
import"./pages/inicio/welcome"
import"./pages/chat/chat"

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'custom-home'},
  {path: '/chat', component: 'chat-page'}
]);