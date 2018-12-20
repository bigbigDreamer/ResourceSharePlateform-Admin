<template>
    <Row>
        <Col span="24" class="table">
            <Table border :columns="columns" :data="data"></Table>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "auditNews",
        data() {
            return {
                recommend: '',
                columns: [
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            let temp;
                            if (params.row.title.includes('<h1>')) {
                                temp = params.row.title.slice(4, -5);
                                console.log(typeof params.row.title)
                                return h('div', [
                                    h('strong', temp)
                                ]);
                            } else {
                                return h('div', [
                                    h('strong', params.row.title)
                                ]);
                            }

                        }
                    },
                    {
                        title: '发布人',
                        key: 'publisher'
                    },
                    {
                        title: '发布时间',
                        key: 'time'
                    },
                    {
                        title: '审核状态',
                        key: 'status',
                        render: function (h, params) {
                            return h('div',
                                params.row.status === 0 ? '未审核' : '已审核')
                        }
                    },
                    {
                        title: '是否推荐',
                        key: 'isrecommend',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        size: 'large',

                                    },
                                    on: {
                                        'on-change': (status) => {
                                            this.recommend = status;
                                            console.log(status)
                                        }
                                    }
                                },)])
                        }
                    },
                    {
                        title: '操作',
                        key: 'option',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            //传递索引给show方法
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row.id+'---'+this.recommend)
                                            this.$ajax.post('/news/dealNews', {
                                                id: params.row.id,
                                                recommend: this.recommend,
                                                status: 1
                                            })
                                                .then((data) => {
                                                    console.log(data);
                                                    this.$ajax.post('/news/getUncheckedNews')
                                                        .then((data) => {
                                                            console.log(data);
                                                            this.data = data.data;

                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }
                                    }
                                }, '审核'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$ajax.post('/news/dealNews', {
                                                id: params.row.id,
                                                recommend: this.recommend,
                                                status: -1
                                            })
                                                .then((data) => {
                                                    console.log(data);
                                                    this.$ajax.post('/news/getUncheckedNews')
                                                        .then((data) => {
                                                            console.log(data);
                                                            this.data = data.data;

                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }
                                    }
                                }, '驳回')
                            ]);
                        },
                    }
                ],
                data: [
                    {
                        title: 'John Brown',
                        content: 18,
                        publisher: 'New York No. 1 Lake Park',
                        time: '2018.3.6',
                        status: false,
                        isrecommend: 0,
                    },
                ]
            }
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: '新闻详情',
                    width: '800px',
                    closable: true,
                    scrollable: true,
                    content: `标题：${this.data[index].title}<br>发布时间：${this.data[index].time}<br>发布人：${this.data[index].publisher}<br/>主要内容：${this.data[index].content}`
                })
            },
            remove(index) {
                this.data.splice(index, 1);
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        watch: {
            data: function () {

            }
        },
        mounted() {
            this.$ajax.post('/news/getUncheckedNews')
                .then((data) => {
                    console.log(data);
                    this.data = data.data;

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped lang="less">
    @import "auditNews";
</style>