<template>
    <div class="layout">
        <Layout>
            <Header :style="{padding: 0}" class="layout-header-bar">
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                      size="24"></Icon>
                <a href="/"><Icon type="md-repeat" size="24" style="margin-left: 1200px"/>退出登录</a>
            </Header>
            <Layout>
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="handleSelect"
                          :open-names="['1']">
                        <Submenu :name="`${index+1}+''`" v-for="(item,index) in routes.children" :key="index">
                            <template slot="title">
                                <Icon :type="item.meta&&item.meta.icon"></Icon>
                                {{item.meta&&item.meta.title}}
                            </template>
                            <MenuItem :name="item1.name" v-if="item.children" v-for="(item1,index1) in item.children">
                                {{item1.meta.title }}
                            </MenuItem>
                            <!--                      <MenuItem name="1-2">新闻审核</MenuItem>-->
                            <!--                      <MenuItem name="1-3">新闻更新</MenuItem>-->
                            <!--                      <MenuItem name="1-4">新闻删除</MenuItem>-->
                            <!--                      <MenuItem name="1-5">驳回管理</MenuItem>-->
                        </Submenu>
                        <!--                  <Submenu name="2">-->
                        <!--                      <template slot="title">-->
                        <!--                          <Icon type="md-build" />-->
                        <!--                          网站维护-->
                        <!--                      </template>-->
                        <!--                      <MenuItem name="2-1">联盟介绍维护</MenuItem>-->
                        <!--&lt;!&ndash;                      <MenuItem name="2-2">法律法规维护</MenuItem>&ndash;&gt;-->
                        <!--                     &lt;!&ndash;<MenuItem name="2-3">设备共享维护</MenuItem>&ndash;&gt;-->
                        <!--                  </Submenu>-->
                        <!--                  <Submenu name="3">-->
                        <!--                      <template slot="title">-->
                        <!--                          <Icon type="ios-aperture" />-->
                        <!--                          设备管理-->
                        <!--                      </template>-->
                        <!--                      <MenuItem name="3-1">类别管理</MenuItem>-->
                        <!--                      <MenuItem name="3-2">设备添加</MenuItem>-->
                        <!--                      <MenuItem name="3-3">设备删除</MenuItem>-->
                        <!--                      <MenuItem name="3-4">设备修改</MenuItem>-->
                        <!--                      <MenuItem name="3-5">项目添加</MenuItem>-->
                        <!--                      <MenuItem name="3-6">项目删除</MenuItem>-->
                        <!--                      <MenuItem name="3-7">项目修改</MenuItem>-->
                        <!--                      <MenuItem name="3-8">预约记录管理</MenuItem>-->
                        <!--                  </Submenu>-->
                        <!--                  <MenuItem name="content">-->
                        <!--                      <Icon type="md-document" />-->
                        <!--                      数据报表</MenuItem>-->
                        <!--                  <Submenu name="4">-->
                        <!--                      <template slot="title">-->
                        <!--                          <Icon type="ios-chatbubbles" />-->
                        <!--                          创业指导-->
                        <!--                      </template>-->
                        <!--                      <MenuItem name="4-1">内容添加</MenuItem>-->
                        <!--                      <MenuItem name="4-2">内容修改</MenuItem>-->
                        <!--                      <MenuItem name="4-3">内容删除</MenuItem>-->
                        <!--                  </Submenu>-->
                        <!--                  <Submenu name="5">-->
                        <!--                      <template slot="title">-->
                        <!--                          <Icon type="ios-pricetags" />-->
                        <!--                          法律法规-->
                        <!--                      </template>-->
                        <!--                      <MenuItem name="5-1">法规添加</MenuItem>-->
                        <!--                      <MenuItem name="5-2">法规修改</MenuItem>-->
                        <!--                      <MenuItem name="5-3">法规删除</MenuItem>-->
                        <!--                  </Submenu>-->
                    </Menu>
                </Sider>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <Router-view></Router-view>
                </Content>
            </Layout>
        </Layout>

    </div>
</template>

<script>
    // @ is an alias to /src
    import logState from '../utils'
    import Log from '../components/Log'
    import filter from '../tools'
    import {mapState} from 'vuex'

    export default {
        name: 'home',
        data() {
            return {
                isCollapsed: false,
                isLog: false,
                routes: ''
            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            ...mapState(['username'])
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            /**
             * @time  2018/12/19 16:13
             * @author  Bill Wang <vuejs@vip.qq.com>
             * @desc 处理每一栏目的点击
             */
            handleSelect(name) {
                console.log(name);
                this.$router.push({name});
            }
        },
        mounted() {
            // if(logState.getData()) {
            //     this.isLog = true;
            // }
            // this.$router.push({name:'content'})
            this.$ajax.post('http://websitdevelopment.cn:3001/findRoutesByUser',{
                username:this.username
            })
                .then(data => {
                   // console.log(data.data[0])
                    logState.getRoutes();
                    this.routes = filter.filterRouter(data.data[0].belongRoutes);
                })
                .catch(err => console.log(err))

        }
    }
</script>

<style scoped >
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }


</style>