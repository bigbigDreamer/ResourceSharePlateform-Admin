<template>
    <div>
        <Row>
            <Col :md="{span:24}" style="margin-top: 8px;margin-left: 400px">
                <Button style="width: 200px;" @click="handlerAddContent">添加</Button>
            </Col>
            <Col :md="{span:24}" style="margin: 8px auto;">
                <label>
                    <Input placeholder="请输入标题" v-model="title"></Input>
                </label>
            </Col>
            <Col :md="{span:24}" style="margin: 8px auto; ">
                <quill-editor v-model="content"
                              ref="myQuillEditor"
                              :options="editorOption"
                              @change="onEditorChange($event)"
                              @ready="onEditorReady($event)"
                              class="editor">
                </quill-editor>
            </Col>
            <Col :md="{span:24}" style="margin: 18px auto; ">
                <Upload
                        name="myFile"
                        multiple
                        type="drag"
                        action="http://websitdevelopment.cn:8081/file/uploadFile"
                        :on-success="handleSuccess"
                        @clearFiles='handleClear'>
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>上传附件</p>
                    </div>
                </Upload>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: "LawsAdd",
        data() {
            return {
                pic: [],
                content: '<h2>请输入内容</h2>',
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
                title: '',
                filePath: ''
            }
        },
        methods: {
            onEditorReady(quill) {
                console.log('editor ready!', quill)
            },
            //实时监测content内容的变化
            onEditorChange({quill, html, text}) {
                console.log('editor change!', quill, html, text)
                this.content = html
            },
            handleSuccess(res, file, fileList) {

                this.filePath = `http://websitdevelopment.cn:8081/${res.message}`
                console.log(this.filePath)
            },
            handleClear() {
            },
            handlerAddContent() {
                this.$ajax.post('http://websitdevelopment.cn:8081/policy/addPolicy', {
                    title: this.title,
                    publisher: 'Admin',
                    content: this.content,
                    filePath: this.filePath
                })
                    .then(data => {
                        //console.log(data);
                        return data.data.result ?
                            (() => {
                                this.title = '';
                                this.content = '';
                                this.handleClear();
                                this.$Message.success('添加成功!!!');
                            })() :
                            this.$Message.error('添加失败！！！');
                    })
                    .catch(err => err);
            }

        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    div {
        padding: 5px;

        .editor {
            height: 400px;
        }
    }
</style>