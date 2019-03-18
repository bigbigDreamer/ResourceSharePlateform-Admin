<template>
    <div class="log">
        <div class="logFrame">
            <h2 style="text-align: left">欢迎登录</h2>
            <Divider/>
            <Form :label-width="80">
                <Input v-model="formItem.username" placeholder="Enter username......" style="width: 100%;">
                    <Icon type="ios-person-outline" slot="prepend" style="font-size: 18px"></Icon>
                </Input>
                <br>
                <Input v-model="formItem.password" placeholder="Enter password......" type="password"
                       style="width: 100%;">
                    <Icon type="ios-lock-outline" slot="prepend" style="font-size: 18px"></Icon>
                </Input>
                <br>
                <Button type="info" long @click="login">Login</Button>
            </Form>
        </div>
    </div>
</template>

<script>
    import stateSet from '../utils'

    export default {
        name: "Log",
        data() {
            return {
                formItem: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            //用户点击登录
            login() {

                if (this.formItem.username === 'admin' && this.formItem.password === '000000') {
                    window.location.href = 'http://websitdevelopment.cn:84'
                } else {
                    this.$ajax.post('http://websitdevelopment.cn:8081/user/userLogin', {
                        username: this.formItem.username,
                        password: this.formItem.password,
                    })
                        .then(data => {
                            console.log(data)
                            return data.status === 200 && !!data.data ?
                                (function IIFE() {
                                    stateSet.savaData(true);
                                    window.history.go(0);
                                })() :
                                this.$Message.error('用户名或密码错误！');

                        })
                        .catch(err => err);
                }
            },
            mounted() {

            }
        }
    }
</script>

<style scoped lang="less">
    .log {
        background-image: url("../assets/log.jpg");
        width: 100%;
        height: 680px;

        .logFrame {
            width: 300px;
            height: 300px;
            background-color: #FFFFFF;
            z-index: 2;
            border: 1px solid white;
            border-radius: 8px;
            left: 800px;
            position: relative;
            top: 80px;
            padding: 20px;

        }
    }

</style>