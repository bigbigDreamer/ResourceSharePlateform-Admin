<template>
    <div class="CategoryManage">
        <Row>
            <Col>
                <div class="equipmentTypeName">
                    <Tag type="border" color="success" class="tag">类目名称</Tag>
                    <Input v-model="equipmentType.CategoryName" class='input' placeholder="请输入设备类别名称"
                           style="width: 300px"></Input>
                </div>
            </Col>
            <Col>
                <div class="equipmentTypeName">
                    <Tag type="border" color="success" class="tag">图标选择</Tag>
                    <AutoComplete
                            v-model="equipmentType.icon"
                            :data="IconList"
                            placeholder="请选择分类图标"
                            style="width:300px">
                    </AutoComplete>
                    <Button icon="ios-color-filter-outline" style="border-radius: 0 80px 80px 0 ;"
                            @click="addEquipMentType">Save
                    </Button>
                </div>
            </Col>
            <br>
            <Divider>Icon 示例</Divider>
            <Col>
                <Row>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-jizhanguanli icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">基站管理</span>
                            <br>
                            <span class="title">icon-jizhanguanli</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-zhunbeiliangchan icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">准备量产</span>
                            <br>
                            <span class="title">icon-zhunbeiliangchan</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-zhanghaoquanxianguanli icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">账号管理</span>
                            <br>
                            <span class="title">icon-zhanghaoquanxianguanli</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-yibiaopan icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">仪表盘</span>
                            <br>
                            <span class="title">icon-yibiaopan</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-yingyongguanli icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">应用管理</span>
                            <br>
                            <span class="title">icon-yingyongguanli</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-quanxianshenpi icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">权限审批</span>
                            <br>
                            <span class="title">icon-quanxianshenpi</span>
                        </div>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-renjijiaohu icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">人机交互</span>
                            <br>
                            <span class="title">icon-renjijiaohu</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-jishufuwu icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">技术服务</span>
                            <br>
                            <span class="title">icon-jishufuwu</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-guanlianshebei icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">关联设备</span>
                            <br>
                            <span class="title">icon-guanlianshebei</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-bianji icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">系统编辑</span>
                            <br>
                            <span class="title">icon-bianji</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-fenxiangfangshi icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">共享方式</span>
                            <br>
                            <span class="title">icon-fenxiangfangshi</span>
                        </div>
                    </Col>
                    <Col :md="{span:4}">
                        <div class="disIcon">
                            <span class="icon-tiaoshi icon iconfont ChildDisIcon"></span>
                            <br>
                            <span class="title">设备调试</span>
                            <br>
                            <span class="title">icon-tiaoshi</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <br>
            <Divider>类目管理</Divider>
            <br>
            <Col>
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="id">
                        <span>{{ row.id }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="name">
                        <Input type="text" v-model="editName" v-if="editIndex === index"></Input>
                        <span v-else>{{ row.name }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="pic">
                        <Input type="text" v-model="editPic" v-if="editIndex === index"></Input>
                        <span v-else>{{ row.pic }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="handleSave(index)">保存</Button>
                            <Button @click="editIndex = -1" style="margin-left: 18px">取消</Button>
                        </div>
                        <div v-else>
                            <Button @click="handleEdit(row, index)">更新</Button>
                            <Button @click="handleDel(row, index)" style="margin-left: 18px">删除</Button>
                        </div>
                    </template>
                </Table>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "CategoryManage",
        data() {
            return {
                equipmentType: {
                    CategoryName: '',
                    icon: '',
                },
                IconList: [
                    'iconfont  icon-jizhanguanli  icon',
                    'iconfont  icon-zhunbeiliangchan  icon',
                    'iconfont  icon-zhanghaoquanxianguanli  icon',
                    'iconfont  icon-yibiaopan  icon',
                    'iconfont  icon-yingyongguanli  icon',
                    'iconfont  icon-quanxianshenpi  icon',
                    'iconfont  icon-renjijiaohu  icon',
                    'iconfont  icon-jishufuwu  icon',
                    'iconfont  icon-guanlianshebei  icon',
                    'iconfont  icon-bianji  icon',
                    'iconfont  icon-fenxiangfangshi  icon',
                    'iconfont  icon-tiaoshi  icon',
                ],
                columns: [
                    {
                        title: 'ID',
                        slot: 'id'
                    },
                    {
                        title: '分类名称',
                        slot: 'name'
                    },
                    {
                        title: 'Icon类',
                        slot: 'pic'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     align:'center',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //                 h('Button', {
                    //                     props: {
                    //                         type: 'success',
                    //                         size: 'small'
                    //                     },
                    //                     style: {
                    //                         marginRight: '5px'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                             this.show(params.index)
                    //                         }
                    //                     }
                    //                 }, '删除'),
                    //                 h('Button', {
                    //                         props: {
                    //                             type: 'success',
                    //                             size: 'small'
                    //                         },
                    //                         style: {
                    //                             marginRight: '5px'
                    //                         },
                    //                         on: {
                    //                             click: () => {
                    //                                 this.show(params.index)
                    //                             }
                    //                         }
                    //                     }, '更新'
                    //                 ),
                    //             ]
                    //         )
                    //     }
                    // }
                ],
                data: [
                    {
                        id: 1,
                        name: '计算机',
                        pic: 'icon',
                    },
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第2列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editPic: '',  // 第3列输入框
                editId: 1,  //第1列id
            }
        },
        methods: {
            //点击编辑，初始化赋值
            handleEdit(row, index) {
                this.editName = row.name;
                this.editPic = row.pic;
                this.editId = row.id;
                this.editIndex = index;
            },
            //保存修改数据
            handleSave(index) {
                this.data[index].name = this.editName;
                this.data[index].pic = this.editPic;
                this.editIndex = -1;
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/updateCategoryById', {
                    id: this.editId,
                    name: this.editName,
                    pic: this.editPic,
                })
                    .then(data => {
                        //console.log(data);
                        return data.data.result ?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/findAll')
                                .then(data => {
                                    this.data = data.data;
                                })
                                .catch(err => err)
                            : this.$Message.info({
                                content: '更新失败！',
                                duration: 5
                            });
                    })
                    .catch(err => err);
            },
            //删除数据
            handleDel(row, index) {
               // console.log(row.id)
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/deleteCategoryById', {
                    id: row.id
                })
                    .then(data => {
                        return data.data.result?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/findAll')
                                .then(data => {
                                    this.data = data.data;
                                })
                                .catch(err => err)
                            : this.$Message.info({
                                content: '删除失败！',
                                duration: 5
                            });
                    })
                    .catch(err => err);
            },
            //添加设备分类
            addEquipMentType() {
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/addDeviceCategory', {
                    name: this.equipmentType.CategoryName,
                    pic: this.equipmentType.icon,
                })
                    .then(data => {
                        //console.log(this.equipmentType.icon);
                        return data.data.result?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/findAll')
                                .then(data => {
                                    this.data = data.data;
                                })
                                .catch(err => err)
                            : this.$Message.info({
                                content: '添加失败！',
                                duration: 5
                            });

                    })
                    .catch(err => err);
            }
        },
        mounted() {
            this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/findAll')
                .then(data => {
                    //console.log(data);
                    this.data = data.data;
                })
                .catch(err => {
                    return err;
                })
        }
    }
</script>

<style scoped lang="less">
    @import "//at.alicdn.com/t/font_1068119_77b9gnli466.css";

    .CategoryManage {
        height: 600px;

        .equipmentTypeName {
            margin-left: 18px;
            margin-top: 25px;

            .tag {

            }
        }

        .disIcon {
            text-align: center;

            &:hover {
                color: #2D8CF0;
            }

            .ChildDisIcon {
                font-size: 30px;
            }

            .title {
                font-size: 16px;
            }
        }
    }
</style>