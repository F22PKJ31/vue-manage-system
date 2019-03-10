import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/admin'
        },
        {
            path: '/admin',
            redirect: '/admin/blog',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: 'blog',
                    component: resolve => require(['../components/page/BlogTable.vue'], resolve),
                    meta: {title: '博客管理'}
                },
                {
                    path: 'blogCollection',
                    component: resolve => require(['../components/page/BlogCollectionTable.vue'], resolve),
                    meta: {title: '博客收藏管理'}
                },
                {
                    path: 'blogComment',
                    component: resolve => require(['../components/page/BlogCommentTable.vue'], resolve),
                    meta: {title: '博客评论管理'}
                },
                {
                    path: 'post',
                    component: resolve => require(['../components/page/PostTable.vue'], resolve),
                    meta: {title: '帖子管理'}
                },
                {
                    path: 'postComment',
                    component: resolve => require(['../components/page/PostCommentTable.vue'], resolve),
                    meta: {title: '帖子评论管理'}
                },
                {
                    path: 'newsTable',
                    component: resolve => require(['../components/page/NewsTable.vue'], resolve),
                    meta: {title: '新闻管理'}
                },
                {
                    path: 'newsComment',
                    component: resolve => require(['../components/page/NewsCommentTable.vue'], resolve),
                    meta: {title: '新闻评论管理'}
                },
                {
                    path: 'categoryTable',
                    component: resolve => require(['../components/page/CategoryTable.vue'], resolve),
                    meta: {title: '分类管理'}
                },
                {
                    path: 'user',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve),
                    meta: {title: '用户管理'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
