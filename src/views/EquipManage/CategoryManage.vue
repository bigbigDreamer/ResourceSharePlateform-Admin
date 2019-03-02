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
                </div>
            </Col>
            <Divider/>
            <Col>
                <Table :columns="columns" :data="data"></Table>
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
                IconList: [],
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '分类名称',
                        key: 'name'
                    },
                    {
                        title: 'Icon类',
                        key: 'pic'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                            props: {
                                                type: 'success',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.index)
                                                }
                                            }
                                        }, '更新'
                                    ),
                                ]
                            )
                        }
                    }
                ],
                data: [
                    {
                        id: 1,
                        name: '计算机',
                        pic: 'icon',
                    },
                ]
            }
        },
        methods: {},
        mounted() {
           this.$ajax('http://websitdevelopment.cn:8081/deviceCategory/findAll ')
               .then(data =>{
                   console.log(data);
                   this.data = data.data;
               })
               .catch(err =>{
                   return err;
               })
        }
    }
</script>

<style scoped lang="less">
    .CategoryManage {
        height: auto;

        .equipmentTypeName {
            margin-left: 18px;
            margin-top: 25px;

            .tag {

            }
        }
    }
</style>