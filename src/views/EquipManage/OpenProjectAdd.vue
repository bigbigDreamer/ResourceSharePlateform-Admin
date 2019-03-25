<template>
    <div class="OpenProjectAdd">
        <Row>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Tag color="primary">设备名称</Tag>
                <AutoComplete
                        v-model="typeChoose"
                        :data="typeData"
                        placeholder="请选择设备信息"
                        style="width:500px">
                </AutoComplete>
            </Col>
            <br>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Tag color="primary">项目名称</Tag>
                <Input v-model="projectInfo.projectName" style="width:500px"></Input>
            </Col>
            <br>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Tag color="primary">项目描述</Tag>
                <Input v-model="projectInfo.description" style="width:500px"></Input>
            </Col>
            <br>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Tag color="primary">样品要求</Tag>
                <Input v-model="projectInfo.requirements" style="width:500px"></Input>
            </Col>
            <br>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Tag color="primary">项目价格</Tag>
                <Input v-model="projectInfo.price" style="width:500px"></Input>
            </Col>
            <Col :md="{span:24}" style="margin-top: 18px">
                <Button type="success" style="width:570px" @click="handleClick">添加</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    import storage from '../../utils'

    export default {
        name: "OpenProjectAdd",
        data() {
            return {
                typeData: [
                    '123',
                    '456',
                ],
                typeChoose: '',
                projectInfo: {
                    projectName: '',
                    price: '',
                    requirements: '',
                    description: '',
                }
            }
        },
        methods: {
            //点击添加以后的情况
            handleClick() {
                this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/addProject', {
                    projectName: this.projectInfo.projectName,
                    requirements: this.projectInfo.requirements,
                    description: this.projectInfo.description,
                    price: this.projectInfo.price,
                    deviceName: this.typeChoose,
                })
                    .then(data => data.data.result ?
                        (IIFE => {
                            this.$Message.info({
                                content: '添加成功！',
                                duration: 5
                            });
                            this.projectInfo.projectName = '';
                            this.projectInfo.requirements = '';
                            this.projectInfo.description = '';
                            this.projectInfo.price = '';
                            this.typeChoose = '';
                        })()
                        :
                        this.$Message.info({
                            content: '添加失败！',
                            duration: 5
                        })
                    )
                    .catch(err => err);
            }
        },
        mounted() {
            // this.$ajax.post('http://websitdevelopment.cn:8081/deviceOpenProject/addProject')
            this.$ajax.post('http://websitdevelopment.cn:8081/device/getUnitDevice', {
                unit: storage.getUser()
            })
                .then(data => {
                    //console.log(data);
                    this.typeData = data.data.map(item => item.name)
                })
                .catch(err => err);
        }
    }
</script>

<style scoped lang="less">

    .OpenProjectAdd {
        margin-left: 18px;
    }
</style>