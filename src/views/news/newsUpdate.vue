<template>
    <div>
        <Row>
            <Col>
                <Table :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="id">
                        <span>{{ row.id }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="title">
                        <Input type="text" v-model="editTitle" v-if="editIndex === index"></Input>
                        <span v-else>{{ row.title }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="catelogue">
                        <Select v-model="selectModel"
                                placeholder="请选择新闻分类"

                                :label-in-value="true"
                                v-if="editIndex === index"
                        >
                            <Option v-for="item in newsType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Select v-model="row.categoryName"
                                placeholder="请选择新闻分类"
                                :label-in-value="true"
                                v-else
                                disabled
                        >
                            <Option v-for="item in newsType" :value="item.name" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="content">
                        <Button @click="viewDetails(row,index)">查看详情</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="publisher">
                        <Input type="text" v-model="editPublisher" v-if="editIndex === index"></Input>
                        <span v-else>{{ row.publisher }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="time">
                        <span>{{ row.time }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="readTimes">
                        <span>{{ row.readTimes }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="isrecommend">
                        <i-switch size="large" v-model="isRecommend" v-if="editIndex === index">
                            <span slot="open">推荐</span>
                            <span slot="close">正常</span>
                        </i-switch>
                        <i-switch size="large" v-model="!!row.isrecommend" disabled v-else>
                            <span slot="open">推荐</span>
                            <span slot="close">正常</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="editIndex === index">
                            <Button @click="handleSave(row,index)">保存</Button>
                            <Button @click="editIndex = -1">取消</Button>
                        </div>
                        <div v-else>
                            <Button @click="handleEdit(row, index)">操作</Button>
                        </div>
                    </template>
                </Table>
                <Modal
                        v-model="modal"
                        :title="tempTitle"
                        @on-ok="ok"
                        @on-cancel="cancel"
                        width="800px">
                    <quill-editor v-model="content"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @change="onEditorChange($event)"
                                  @ready="onEditorReady($event)"
                                  class="editor">
                    </quill-editor>
                </Modal>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import {mapState}  from 'vuex'
    Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        name: "newsUpdate",
        data() {
            return {
                columns: [
                    {
                        title: 'ID',
                        slot: 'id'
                    },
                    {
                        title: '标题',
                        slot: 'title'
                    },
                    {
                        title: '分类',
                        slot: 'catelogue'
                    },
                    {
                        title: '内容',
                        slot: 'content'
                    },
                    {
                        title: '发布人',
                        slot: 'publisher'
                    },
                    {
                        title: '发布时间',
                        slot: 'time'
                    },
                    {
                        title: '阅读次数',
                        slot: 'readTimes'
                    },
                    {
                        title: '是否推荐',
                        slot: 'isrecommend'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                data: [
                    {
                        catelogue: "2",
                        content: '',
                        id: 20,
                        isrecommend: 1,
                        pic: "http://websitdevelopment.cn:8080/images/007b7cdb8ba642b59e28a8bc83790800.jpg",
                        publisher: "暂不处理",
                        readtimes: 1,
                        status: 1,
                        time: "2019-03-25T16:00:00.000+0000",
                        title: "我省下月起全面启用双向转诊信息系统",
                    },
                ],
                //title编辑保存
                editTitle: '',
                editPublisher: '',
                //索引编辑保存
                editIndex: -1,
                //对于模态框的状态控制
                modal: false,
                //临时的title保存
                tempTitle: '',
                //临时的内容保存
                tempContent: '',
                //图片数组
                pic: [],
                newsType: [
                    {
                        id: '',
                        name: '',
                    },
                ],
                //用户选择新闻分类
                selectModel: '',
                //记录新闻分类的id
                id: '',
                //富文本编辑器的默认内容
                content: '<h2>请输入内容</h2>',
                //该文章是否被推荐
                isRecommend: false,
                //对于富文本编辑器的一个配置详细
                editorOption: {
                    // some quill options
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'myFile',
                            action: 'http://websitdevelopment.cn:8081/file/uploadPic',
                            response: (res) => {
                                console.log(res);
                                this.pic.push('http://websitdevelopment.cn:8080/' + res.message);
                                return `http://websitdevelopment.cn:8080/${res.message}`;
                            },
                            change: (xhr, formData) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } // 可选参
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                'image': function () {
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                },
            }
        },
        computed:{
            ...mapState(['username'])
        },
        methods: {
            handleEdit(row, index) {
                this.editTitle = row.title;
                this.editPublisher = row.publisher;
                this.content = row.content;
                console.log(row.content);
                this.editIndex = index;
            },
            handleSave(row, index) {
                this.data[index].title = this.editTitle;
                this.data[index].publisher = this.editPublisher;
                this.editIndex = -1;
                this.$ajax.post('http://websitdevelopment.cn:8081/news/updateNews', {
                    id: row.id,
                    title: this.editTitle,
                    publisher: this.editPublisher,
                    content: this.content,
                    catelogue: this.selectModel,
                    pic:this.pic.join(';'),
                })
                    .then(data => {
                        //console.log(data);
                        return data.data.result ?
                            this.$Message.success('更新成功！！！') :
                            this.$Message.error('更新失败！！！');
                    })
                    .catch(err => err);
            },

            ok() {

            },
            cancel() {

            },
            // change(name) {
            //     console.log(name.value)
            //     //console.log(this.selectModel);
            //     this.id = name.value;
           // },
            //点击查看详情
            viewDetails(row, index) {
                this.modal = true;
                //console.log(row.id)
                this.$ajax.post('http://websitdevelopment.cn:8081/news/getSingleById', {
                    id: row.id
                })
                    .then(data => {
                        //console.log(data);
                        this.content = data.data.content;
                        this.tempTitle = data.data.title;
                    })
                    .catch(err => err);
            },
            //富文本编辑器已经准备就绪
            onEditorReady(quill) {
                //console.log('editor ready!', quill)
            },
            //实时监测content内容的变化
            onEditorChange({quill, html, text}) {
                //console.log('editor change!', quill, html, text);
                this.content = html
            },
        },
        created() {
            this.$ajax.post('http://websitdevelopment.cn:8081/news/findAllNews',{
                publisher:this.username
            })
                .then(data => {
                    this.data = data.data;
                    console.log(data);
                })
                .catch(err => err);
            this.$ajax.post('http://websitdevelopment.cn:8080/newsCategory/getAllCategory')
                .then((data) => {
                    console.log(data);
                    this.newsType = data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
</script>

<style scoped>

</style>