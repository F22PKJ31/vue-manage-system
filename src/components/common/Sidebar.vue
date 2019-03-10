<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'blog',
                        title: '博客管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'blogCollection',
                        title: '博客收藏管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'blogComment',
                        title: '博客评论管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'post',
                        title: '帖子管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'postComment',
                        title: '帖子评论管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'newsTable',
                        title: '新闻管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'newsComment',
                        title: '新闻评论管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'categoryTable',
                        title: '新闻分类管理'
                    },{
                        icon: 'el-icon-lx-cascades',
                        index: 'user',
                        title: '用户管理'
                    }

                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
