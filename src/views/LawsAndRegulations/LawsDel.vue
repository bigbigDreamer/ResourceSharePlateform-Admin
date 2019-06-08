<template>
    <div>
        <Row>
            <Col>
                <Table border :columns="columns" :data="data"></Table>
                <Modal
                        v-model="modal"
                        :title="title"
                        width="700px">
                    <p v-html="content"></p>
                </Modal>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "LawsDel",
        data() {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '内容',
                        key: 'content',
                        render: (h, params) => {
                            return h('Button', {
                                on: {
                                    click: () => {
                                        this.clickHandler(params);
                                    }
                                },
                            }, '查看详情')
                        }
                    },
                    {
                        title:'发布人',
                        key:'publisher'
                    },
                    {
                        title: '发布时间',
                        key: 'publishDate'
                    },
                    {
                        title: '阅读次数',
                        key: 'readTimes'
                    },
                    {
                        title: '文件路径',
                        key: 'filePath'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('Button', {
                                attrs: {
                                    type: 'error'
                                },
                                domProps: {},
                                on: {
                                    click: () => {
                                        this.$ajax.post('http://websitdevelopment.cn:8081/policy/deletePolicyById', {
                                            id: params.row.id
                                        })
                                            .then(data => {
                                                return data.data.result ?
                                                    this.$ajax.post('http://websitdevelopment.cn:8081/policy/getAllPolicies')
                                                        .then(data => {
                                                            this.$Message.success('删除成功!!!');
                                                            this.data = data.data;
                                                            //console.log(data);
                                                        })
                                                        .catch(err => err) :
                                                    this.$Message.error('删除失败!!!');
                                            })
                                            .catch(err => err);

                                    }
                                }
                            }, '删除')
                        }
                    }
                ],
                data: [
                    {
                        id: 1,
                        title: '默认内容',
                        publishDate: "2019-04-12T16:00:00.000+0000",
                        readTimes: 0
                    }
                ],
                modal: false,
                title: '',
                content: '',
            }
        },
        methods: {
            clickHandler(params) {
                console.log(params);
                this.modal = true;
                this.$ajax.post('http://websitdevelopment.cn:8081/policy/getPolicyById', {
                    id: params.row.id
                })
                    .then(data => {
                        //console.log(data);
                        this.content = data.data.content;
                        this.title = data.data.title;
                    })
                    .catch(err => err);
            }
        },
        mounted() {
            this.$ajax.post('http://websitdevelopment.cn:8081/policy/getAllPolicies')
                .then(data => {
                    this.data = data.data;
                    //console.log(data);
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>

</style>