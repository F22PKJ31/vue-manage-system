import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import url from './components/common/apiUrl'
import api from './components/common/apiUtil'
import utils from './components/common/utils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.axiosProxy = api.generateApiMap(url);
Vue.prototype.$axios = axios;
Vue.use(utils);
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ADMIN');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

