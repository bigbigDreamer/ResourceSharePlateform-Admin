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
        name: "ContentDel",
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
                        title: '推荐状态',
                        key: 'isrecommend',
                        render: (h, params) => {
                            return h('i-switch', {
                                attrs: {
                                    size: 'large',
                                    value: params.row.isrecommend,
                                    disabled: true
                                },
                                domProps: {}

                            }, [
                                h('span', {

                                    attrs: {},
                                    slot: 'open'
                                }, '推荐'),
                                h('span', {
                                    attrs: {},
                                    slot: 'close'
                                }, '正常'),
                            ])
                        }
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
                                        this.$ajax.post('http://websitdevelopment.cn:8081/bunsinessGuidence/deleteGuidenceById', {
                                            id: params.row.id
                                        })
                                            .then(data => {
                                                return data.data.result ?
                                                    this.$ajax.post('http://websitdevelopment.cn:8081/bunsinessGuidence/getAllGuidence')
                                                        .then(data => {
                                                            this.$Message.success('删除成功！！！');
                                                            this.data = data.data;
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
                this.$ajax.post('http://websitdevelopment.cn:8081/bunsinessGuidence/getGuidenceById', {
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
            this.$ajax.post('http://websitdevelopment.cn:8081/bunsinessGuidence/getAllGuidence')
                .then(data => {
                    console.log(data);
                    this.data = data.data;
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>

</style>