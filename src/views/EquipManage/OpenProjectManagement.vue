<template>
    <div class="OpenProjectManagement">
       <Row>
           <Col>
               <Table :columns="columns" :data="data">
                   <template slot-scope="{ row, index }" slot="id">
                       <span >{{ row.id}}</span>
                   </template>

                   <template slot-scope="{ row, index }" slot="projectName">
                       <Input type="text" v-model="editProjectName" v-if="editIndex === index"></Input>
                       <span v-else>{{ row.projectName }}</span>
                   </template>

                   <template slot-scope="{ row, index }" slot="projectDescribe">
                       <Input type="text" v-model="editProjectDescribe" v-if="editIndex === index"></Input>
                       <span v-else>{{ row.projectDescription }}</span>
                   </template>

                   <template slot-scope="{ row, index }" slot="projectRequirements">
                       <Input type="text" v-model="editProjectRequirements" v-if="editIndex === index"></Input>
                       <span v-else>{{ row.sampleRequirements }}</span>
                   </template>
                   <template slot-scope="{ row, index }" slot="price">
                       <Input type="text" v-model="editPrice" v-if="editIndex === index"></Input>
                       <span v-else>{{ row.price }}</span>
                   </template>

                   <template slot-scope="{ row, index }" slot="action">
                       <div v-if="editIndex === index">
                           <Button @click="handleSave(index)">保存</Button>
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
        name: "OpenProjectManagement",
        data () {
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
                        id:1,
                        projectName:'项目名称',
                        projectDescription:'项目描述',
                        projectRequirements:'样品要求',
                        price:'单价',
                    },

                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editProjectName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editProjectDescribe:'',
                editProjectRequirements: '',  // 第二列输入框
                editPrice: '',  // 第三列输入框
                //deviceName:''//
            }
        },
        methods: {
            handleEdit (row, index) {
                this.editProjectName = row.projectName;
                this.editProjectDescribe = row.projectDescription;
                this.editProjectRequirements = row.sampleRequirements;
                this.editPrice = row.price;
                this.editIndex = index;
            },
            handleSave (index) {
                this.data[index].projectName = this.editProjectName;
                this.data[index].projectDescription = this.editProjectDescribe;
                this.data[index].sampleRequirements = this.editProjectRequirements;
                this.data[index].price = this.editPrice;
                this.editIndex = -1;
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/updateProject',{
                    id: Number.parseInt(this.data[index].id),
                    projectName:this.data[index].projectName,
                    description:this.data[index].projectDescription,
                    requirements:this.data[index].sampleRequirements,
                    price:this.data[index].price
                })
                    .then(data => {
                        //根据后台显示的内容进行数据视图的更新
                        return data.data.result?
                            this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/findProjectsByDevice ', {
                                unitName: storage.getUser()
                            })
                                .then(data => {
                                    //console.log(data);
                                    this.$Message.info({
                                        content: '更新成功！',
                                        duration: 5
                                    });
                                    this.data = data.data.map(item => item.deviceOpenProject);
                                })
                                .catch(err => err) :
                            this.$Message.info({
                                content: '更新失败！',
                                duration: 5
                            });
                    })
                    .catch(err => err);
            },
        },
        mounted(){
            //初始化数据
            this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/findProjectsByDevice ', {
                unitName: storage.getUser()
            })
                .then(data => {
                   console.log(data.data);
                    this.data = data.data.map(item => item.deviceOpenProject);
                   // this.deviceName = data.data.map
                })
                .catch(err => err);
        }
    }
</script>

<style scoped lang="less">
.OpenProjectManagement{

}
</style>