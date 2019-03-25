<template>
    <div class="OpenProjectDel">
        <Row>
            <Col>
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="id">
                        <span>{{ row.id}}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="projectName">
                        <span>{{ row.projectName }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="projectDescribe">
                        <span>{{ row.projectDescription }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="projectRequirements">
                        <span>{{ row.sampleRequirements }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="price">
                        <span>{{ row.price }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="handleDel(row)">删除</Button>
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
        name: "OpenProjectDel",
        data() {
            return {
                columns: [
                    {
                        title: '序号',
                        slot: 'id'
                    },
                    {
                        title: '项目名称',
                        slot: 'projectName'
                    },
                    {
                        title: '项目描述',
                        slot: 'projectDescribe'
                    },
                    {
                        title: '样品要求',
                        slot: 'projectRequirements'
                    },
                    {
                        title: '单价',
                        slot: 'price'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        id: 1,
                        projectName: '项目名称',
                        projectDescribe: '项目描述',
                        projectRequirements: '样品要求',
                        price: '单价',
                    },

                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editProjectName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editProjectDescribe: '',
                editProjectRequirements: '',  // 第二列输入框
                editPrice: '',  // 第三列输入框
            }
        },
        methods: {
            handleEdit(row, index) {
                this.editProjectName = row.projectName;
                this.editProjectDescribe = row.projectDescribe;
                this.editProjectRequirements = row.projectRequirements;
                this.editPrice = row.price;
                this.editIndex = index;
            },
            handleDel(row) {
                //在删除之后立马更新数据视图
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/deleteById', {
                    id: row.id
                })
                    .then(data => {
                        //假如数据更新成功，那么就是及时的提醒用户，数据更新的状态
                        return data.data.result ?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/findProjectsByDevice ', {
                                unitName: storage.getUser()
                            })
                                .then(data => {
                                    //console.log(data);
                                    this.$Message.info({
                                        content: '删除成功！',
                                        duration: 5
                                    });
                                    this.data = data.data.map(item => item.deviceOpenProject);
                                })
                                .catch(err => err) :
                            this.$Message.info({
                                content: '删除失败！',
                                duration: 5
                            });
                    })
                    .catch(err => err);
                this.editIndex = -1;
            },
        },
        mounted() {
            //在组件挂在前进行数据的初始化
            this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/findProjectsByDevice ', {
                unitName: storage.getUser()
            })
                .then(data => {
                    //console.log(data);
                    this.data = data.data.map(item => item.deviceOpenProject);
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>

</style>