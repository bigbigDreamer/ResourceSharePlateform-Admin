<template>
    <div class="AppointmentRecordDel">
        <Row>
            <Col>
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="id">
                        <span>{{ row.id}}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="reservationDate">
                        <span>{{ row.reservationDate }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="reservationProject">
                        <span>{{ row.reservationProject }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="reservationUser">
                        <span>{{ row.reservationUser }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="reservationUnit">
                        <span>{{ row.reservationUnit }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="remove(index,row.id)">删除</Button>
                            <Button @click="editIndex = -1">取消</Button>
                        </div>
                        <div v-else>
                            <Button @click="handleEdit(row, index)">操作</Button>
                        </div>
                    </template>
                </Table>
            </Col>
        </Row>
    </div>
</template>

<script>
    import storage from '../../utils'
    export default {
        name: "AppointmentRecordDel",
        data(){
            return {
                columns: [
                    {
                        title: '序号',
                        slot: 'id'
                    },
                    {
                        title: '预约日期',
                        slot: 'reservationDate'
                    },
                    {
                        title: '预约项目',
                        slot: 'reservationProject'
                    },
                    {
                        title: '预约用户',
                        slot: 'reservationUser'
                    },
                    {
                        title: '预约单位',
                        slot: 'reservationUnit'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        deviceId: 1,
                        id: 1,
                        reservationDate: "2018-05-01T16:00:00.000+0000",
                        reservationProject: "测试项目1",
                        reservationUnit: "测试单位1",
                        reservationUser: "测试用户1",
                    },

                ],

                editIndex: -1,
            }
        },
        methods:{
            //变换按钮
            handleEdit(row, index) {
                this.editIndex = index;
            },
            remove(index, id) {
                //从index开始是删除一个元素
                this.data.splice(index, 1);
                //console.log(id);
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceReservation/deleteById', {
                    id
                })
                    .then(data => {
                       // console.log(data);
                        return data.data.result ?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceReservation/findByUnit',{
                                unitName:storage.getUser()
                            })
                                .then(data => {
                                    this.$Message.info({
                                        content: '删除成功！',
                                        duration: 5
                                    });
                                    this.data = data.data.map(item => item.deviceReservationRecord);
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
        mounted(){
            this.$ajax.post('http://websitdevelopment.cn:8081/deviceReservation/findByUnit',{
                unitName:storage.getUser()
            })
                .then(data => {
                    this.data = data.data.map(item => item.deviceReservationRecord);
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>

</style>