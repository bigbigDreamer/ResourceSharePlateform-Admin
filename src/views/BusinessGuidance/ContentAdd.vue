<template>
    <div>
        <Row>
            <Col :md="{span:24}" style="margin-top: 8px;margin-left: 500px">
                <Button type="success" @click="publishContent" style="margin-right: 18px">发布</Button>

                <i-switch size="large" v-model="isRecommend">
                    <span slot="open">推荐</span>
                    <span slot="close">正常</span>
                </i-switch>
            </Col>
            <Col :md="{
            span:24
            }" style="margin: 18px auto;">
                <Input placeholder="请输入标题" v-model="title"></Input>
            </Col>
            <Col :md="{
            span:24
            }">
                <quill-editor v-model="content"
                              ref="myQuillEditor"
                              :options="editorOption"
                              @change="onEditorChange($event)"
                              @ready="onEditorReady($event)"
                              class="editor">
                </quill-editor>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: "ContentAdd",
        data() {
            return {
                //图片地址
                pic: [],
                content: '<h2>请输入内容</h2>',
                isRecommend: false,
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
            }
        },
        // manually control the data synchronization
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            // onEditorBlur(quill) {
            //     console.log('editor blur!', quill)
            // },
            // onEditorFocus(quill) {
            //     console.log('editor focus!', quill)
            // },
            onEditorReady(quill) {
                console.log('editor ready!', quill)
            },
            //实时监测content内容的变化
            onEditorChange({quill, html, text}) {
                console.log('editor change!', quill, html, text)
                this.content = html
            },
            //发布内容
            publishContent() {
                this.$ajax.post('http://websitdevelopment.cn:8081/bunsinessGuidence/addGuidence', {
                    title: this.title,
                    content: this.content,
                    picPath: this.pic.join(';'),
                    isRecommend: this.isRecommend,
                })
                    .then(data => {
                        console.log(data);
                        return data.data.result ?
                            (() => {
                                this.content = '';
                                this.title = '';
                                this.isRecommend = false;
                                this.$Message.success('添加成功！！！');
                            })() :
                            this.$Message.error('添加失败！！！');

                    })
                    .catch(err => err);
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            console.log('this is current quill instance object', this.editor)
        }
    }
</script>

<style scoped lang="less">
    div {
        .editor {
            height: 500px;
        }
    }
</style>