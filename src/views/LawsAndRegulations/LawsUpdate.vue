<template>
    <div>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="id">
                <span>{{ row.id }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="title">
                <Input type="text" v-model="editTitle" v-if="editIndex === index"></Input>
                <span v-else>{{ row.title }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="content">
                <Button @click="viewDetails(row,index)">查看详情</Button>
            </template>
            <template slot-scope="{ row, index }" slot="publisher">
                <Input type="text" v-model="editPublisher" v-if="editIndex === index"></Input>
                <span v-else>{{ row.publisher }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="publishDate">
                <span >{{ row.publishDate }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="readTimes">
                <span >{{ row.readTimes }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="filePath">
                <span >{{ row.filePath }}</span>
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
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        name: "LawsUpdate",
        data(){
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
                        title: '内容',
                        slot: 'content'
                    },
                    {
                        title: '发布人',
                        slot: 'publisher'
                    },
                    {
                        title: '发布时间',
                        slot: 'publishDate'
                    },
                    {
                        title: '阅读次数',
                        slot: 'readTimes'
                    },
                    {
                        title: '文件路径',
                        slot: 'filePath'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                data: [
                    {
                        filePath: null,
                        id: 1,
                        publishDate: "2018-03-12T16:00:00.000+0000",
                        publisher: "Admin",
                        readTimes: 7,
                        title: "杭州经济技术开发区关于推进科技创新创业的若干政策",
                    },
                ],
                //title编辑保存
                editTitle: '',
                editPublisher:'',
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
        methods:{
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
                this.$ajax.post('http://websitdevelopment.cn:8081/policy/updatePolicyById',{
                        id:row.id,
                        title:this.editTitle,
                        publisher:this.editPublisher,
                        content:this.content,
                        filePath:row.filePath,
                })
                    .then(data => {
                        //console.log(data);
                        return data.data.result?
                            this.$Message.success('更新成功！！！'):
                            this.$Message.error('更新失败！！！');
                    })
                    .catch(err => err);
            },

            ok() {

            },
            cancel() {

            },
            //点击查看详情
            viewDetails(row, index) {
                this.modal = true;
                //console.log(row.id)
                this.$ajax.post('http://websitdevelopment.cn:8081/policy/getPolicyById', {
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
            this.$ajax.post('http://websitdevelopment.cn:8081/policy/getAllPolicies')
                .then(data => {
                    this.data = data.data;
                    //console.log(data);
                })
                .catch(err => err);
        }
    }
</script>

<style scoped>

</style>