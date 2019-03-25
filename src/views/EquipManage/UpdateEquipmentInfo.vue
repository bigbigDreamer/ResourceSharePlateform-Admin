<template>
    <div class="UpdateEquipmentInfo">
        <Row v-show="disTable">
            <Col :md="{
            span:24
            }">
                <Table border :columns="columns" :data="data"
                       @on-row-click='handleClick'
                ></Table>
            </Col>
        </Row>
        <Row v-show="disDetails">

            <Col class="equipmentType" :md="{
            span:24
            }">
                <Tag color="primary">设备类别</Tag>
                <AutoComplete
                        v-model="typeChoose"
                        :data="typeData"
                        placeholder="请选择分类信息"
                        style="width:300px">
                </AutoComplete>
                &emsp;
                <Tag color="primary">设备名称</Tag>
                <Input v-model="deviceDetail.deviceName" style="width: 300px;" placeholder="请输入设备名称">
                </Input>
            </Col>
            <br>
            <br>
            <Col class="equipmentName">
                <Tag color="primary">所属单位</Tag>
                <Input v-model="deviceDetail.affiliationUnit" style="width: 300px;" placeholder="请输入所属单位">
                </Input>
                &emsp;
                <Tag color="primary">管理人员</Tag>
                <Input v-model="deviceDetail.deviceManager" style="width: 300px;" placeholder="请输入设备管理员">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">人员电话</Tag>
                <Input v-model="deviceDetail.telephone" style="width: 300px;" placeholder="请输入电话">
                </Input>
                &emsp;
                <Tag color="primary">人员邮箱</Tag>
                <Input v-model="deviceDetail.eMail" style="width: 300px;" placeholder="请输入邮箱">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">英文名称</Tag>
                <Input v-model="deviceDetail.englishName" style="width: 300px;" placeholder="请输入设备的英文名称">
                </Input>
                &emsp;
                <Tag color="primary">设备编号</Tag>
                <Input v-model="deviceDetail.deviceNum" style="width: 300px;" placeholder="请输入设备的编号">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">生产厂家</Tag>
                <Input v-model="deviceDetail.manufacture" style="width: 300px;" placeholder="请输入生产厂家">
                </Input>
                &emsp;
                <Tag color="primary">主要应用</Tag>
                <Input v-model="deviceDetail.mainApplication" style="width: 300px;" placeholder="请输入主要应用">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">样品要求</Tag>
                <Input v-model="deviceDetail.sampleRequirements" style="width: 300px;" placeholder="请输入样品要求">
                </Input>
                &emsp;
                <Tag color="primary">放置地点</Tag>
                <Input v-model="deviceDetail.deviceLocation" style="width: 300px;" placeholder="请输入放置地点">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">设备型号</Tag>
                <Input v-model="deviceDetail.deviceType" style="width: 300px;" placeholder="请输入设备型号">
                </Input>
                &emsp;
                <Tag color="primary">厂家国别</Tag>
                <Input v-model="deviceDetail.manufactureNation" style="width: 300px;" placeholder="请输入厂家国别">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">设备说明</Tag>
                <Input v-model="deviceDetail.description" style="width: 300px;" placeholder="请输入设备说明">
                </Input>
                &emsp;
                <Tag color="primary">所属部门</Tag>
                <Input v-model="deviceDetail.department" style="width: 300px;" placeholder="请输入设备所属部门">
                </Input>
            </Col>
            <Col class="equipmentName">
                <Tag color="primary">性能指标</Tag>
                <Input v-model="deviceDetail.performance" style="width: 680px;"
                       type="textarea"
                       placeholder="请输入设备性能指标">
                </Input>
            </Col>
            <Col class="uploadPic">
                <Upload
                        type="drag"
                        action="http://websitdevelopment.cn:8081/file/uploadPic"
                        name="myFile"
                        :on-success="handleSuccess"
                        style="width: 750px;float: left"
                >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或者点击图片进行上传</p>
                    </div>
                </Upload>
                <Button icon="ios-color-wand-outline"
                        @click="updateDevice"
                        class="btn">
                    更新
                </Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    import storage from '../../utils'

    export default {
        name: "UpdateEquipmentInfo",
        data() {
            return {
                //类别选择
                typeChoose: '',
                deviceDetail:
                    {
                        affiliationUnit: "",
                        department: null,
                        description: "",
                        deviceLocation: "",
                        deviceManager: "",
                        deviceName: "",
                        deviceNum: null,
                        deviceType: "",
                        eMail: "",
                        englishName: "",
                        id: 1,
                        mainApplication: '',
                        manufacture: "",
                        manufactureNation: "",
                        performance: '',
                        sampleRequirements: '',
                        telephone: ''
                    },
                //设备类别
                typeData: [
                    '光电子'
                ],
                //图片回转地址
                picAddress: '',
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
                ],
                data: [
                    {
                        catalogue: "光电子",
                        id: 1,
                        name: "光学相干扫描成像仪（OCT）",
                        pic: null,
                        type: "自研",
                    },
                ],
                //是否显示细节
                disDetails: false,
                disTable: true,
            }
        },
        methods: {
            //图片上传成功的回调
            handleSuccess(res, file, filList) {
                console.log(res);
                //图片上传完成之后产生回调进行图片地址回调
                this.picAddress = `http://websitdevelopment.cn:8080/${res.message}`
            },
            //更新一个子设备
            updateDevice() {
                this.$ajax.post('http://websitdevelopment.cn:8081/device/updateById', {
                    id: this.deviceDetail.id,
                    name: this.deviceDetail.deviceName,
                    type: this.deviceDetail.deviceType,
                    affiliationUnit: this.deviceDetail.affiliationUnit,
                    catalogue: this.typeChoose,
                    pic: this.picAddress,
                    deviceManager: this.deviceDetail.deviceManager,
                    deviceNum: this.deviceDetail.deviceNum,
                    mainApplication: this.deviceDetail.mainApplication,
                    deviceLocation: this.deviceDetail.deviceLocation,
                    description: this.deviceDetail.description,
                    department: this.deviceDetail.department,
                    telephone: this.deviceDetail.telephone,
                    EMail: this.deviceDetail.eMail,
                    englishName: this.deviceDetail.englishName,
                    manufacture: this.deviceDetail.manufacture,
                    sampleRequirements: this.deviceDetail.sampleRequirements,
                    manufactureNation: this.deviceDetail.manufactureNation,
                    performance: this.deviceDetail.performance,
                })
                    .then(data => {
                        console.log(data)
                        return data.data.result ?
                            this.$ajax.post('http://websitdevelopment.cn:8081/device/getDeviceDetailById', {
                                id: this.deviceDetail.id
                            })
                                .then(data => {
                                    this.$Message.info({
                                        content: '更新成功！',
                                        duration: 5
                                    });
                                    this.deviceDetail = data.data;
                                })
                                .catch(err => err)
                            :
                            this.$Message.info({
                                content: '分类错误，更新失败！',
                                duration: 5
                            });
                    })
                    .catch(err => err);
            },
            //单击某一行进入详情
            handleClick(row) {
                //console.log(row.id);
                this.$ajax.post('http://websitdevelopment.cn:8081/device/getDeviceDetailById', {
                    id: row.id
                })
                    .then(data => {
                        //console.log(data);
                        this.deviceDetail = data.data;
                        this.disTable = false;
                        this.disDetails = true;
                    })
                    .catch(err => err);
            }
        },
        mounted() {
            this.$ajax.post('http://websitdevelopment.cn:8081/device/getUnitDevice', {
                unit: storage.getUser()
            })
                .then(data => {
                    //console.log(data);
                    this.data = data.data;
                })
                .catch(err => err);
            this.$ajax.post('http://websitdevelopment.cn:8081/deviceCategory/findAll')
                .then(data => {
                    // console.log(data);
                    this.typeData = data.data.map((item, index) => {
                        return item.name;
                    });
                })
                .catch(err => {
                    return err;
                })
        },

    }
</script>

<style scoped lang="less">
    @marginValue: 18px;
    .UpdateEquipmentInfo {
        margin-top: @marginValue;
        margin-left: @marginValue;
        height: 600px;

        .equipmentType {

        }

        .equipmentName {
            margin-top: @marginValue;
        }

        .uploadPic {
            margin-top: @marginValue;

            .btn {
                width: 150px;
                height: 50px;
                float: left;
                margin-top: 50px;
                margin-left: 18px;
            }
        }
    }
</style>