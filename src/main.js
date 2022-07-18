import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router.js';
import store from './index.js';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseComment from './components/ui/BaseComment.vue';

library.add(fas);

const app = createApp(App);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('base-comment', BaseComment);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store);
app.use(router);
app.mount('#app');