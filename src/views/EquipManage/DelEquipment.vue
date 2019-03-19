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
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
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
                                        this.remove(params.index)
                                    }
                                }
                            }, 'Delete');

                        }
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            remove(index) {
                this.data6.splice(index, 1);
            }
        },
        mounted() {
            console.log(storage.getUser());
            //删除设备
            this.$ajax.post('http://websitdevelopment.cn:8081/device/getUnitDevice', {
                unit: storage.getUser()
            })
                .then(data => {
                    console.log(data);
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>
.DelEquipment{
    margin-top: 18px;  
}
</style>