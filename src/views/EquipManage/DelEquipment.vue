<template>
    <div class="DelEquipment">
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    import storage from '../../utils'

    export default {
        name: "DelEquipment",
        data() {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.id)
                            ]);
                        }
                    },
                    {
                        title: '类别',
                        key: 'catalogue'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index, params.row.id)
                                    }
                                }
                            }, 'Delete');

                        }
                    }
                ],
                data: [
                    {
                        catalogue: "光电子",
                        id: 1,
                        name: "光学相干扫描成像仪（OCT）",
                        pic: null,
                        type: "自研",
                    },
                ]
            }
        },
        methods: {
            remove(index, id) {
                this.data.splice(index, 1);
                console.log(id);
                this.$ajax.post('http://websitdevelopment.cn:8081/device/deleteById', {
                    id
                })
                    .then(data => {
                        console.log(data);
                        return data.data.result ?
                            this.$ajax.post('http://websitdevelopment.cn:8081/device/getUnitDevice', {
                                unit: storage.getUser()
                            })
                                .then(data => {
                                    this.$Message.info({
                                        content: '删除成功！',
                                        duration: 5
                                    });
                                    //console.log(data);
                                    this.data = data.data;
                                })
                                .catch(err => err) :
                            this.$Message.info({
                                content: '删除失败！',
                                duration: 5
                            });

                    })
                    .catch(err => err);
            }
        },
        mounted() {
            console.log(storage.getUser());
            //删除设备
            this.$ajax.post('http://websitdevelopment.cn:8081/device/getUnitDevice', {
                unit: storage.getUser()
            })
                .then(data => {
                    //console.log(data);
                    this.data = data.data;
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>
    .DelEquipment {
        margin-top: 18px;
    }
</style>