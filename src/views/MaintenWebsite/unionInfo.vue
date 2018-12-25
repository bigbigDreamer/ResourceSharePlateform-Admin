<template>
    <Row>
        <Col span="24" class="publishBtn">
            <Button :size="buttonSize" icon="ios-cloud-upload-outline" class="btn" @click="publicNews">更新</Button>
        </Col>
        <br>
        <Col span="24">
            <Input v-model="name" type="textarea" placeholder="请输入联盟名称" class="title"/>
        </Col>
        <Col span="24">
            <quill-editor v-model="introduction"
                          ref="myQuillEditor"
                          :options="editorOption"
                          @change="onEditorChange($event)"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)"
                          class="editor">
            </quill-editor>
        </Col>
    </Row>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: "unionInfo",
        data() {
            return {
                //按钮大小
                buttonSize: 'large',
                //新闻内容
                introduction: '<h2>请输入你的内容......</h2>',
                //联盟标题
                name: '',
                //图片相对地址
                pic: [],
                //富文本编辑器相关配置
                editorOption: {
                    // some quill options
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'myFile',
                            action: 'http://websitdevelopment.cn:8081/file/uploadPic',
                            response: (res) => {
                                console.log(res);
                                this.pic.push('http://websitdevelopment.cn:8081/' + res.message);
                                return `http://websitdevelopment.cn:8081/${res.message}`;
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
        methods: {
            change(name) {
                //console.log(name.value)
                console.log(this.model)
                this.id = name.value;
            },
            //富文本编辑器失去焦点
            onEditorBlur(quill) {
                //console.log('editor blur!', quill)
            },
            //富文本编辑器获取焦点
            onEditorFocus(quill) {
                //

            },
            //富文本编辑器已经做好准备
            onEditorReady(quill) {
                //console.log('editor ready!', quill)
            },
            //当富文本编辑器内容改变的时候，获取html富文本
            onEditorChange({quill, html, text}) {
                console.log(html);
                this.content = html
            },
            /**
             * @time  2018/12/19 20:04
             * @author  Bill Wang <vuejs@vip.qq.com>
             * @desc  发布图片
             * @todo  发布新闻需要的多张图片，记录路径，在发布时以分号隔开发送
             */
            publicNews() {
                console.log(this.model)
                this.$ajax.post('http://websitdevelopment.cn:8081/alliance/saveMemberInfo', {
                    name: this.name,
                    introduction: this.introduction,
                    pic: this.pic,
                })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            //此处需要解决的一个问题就是对于这个富文本编辑器的图片上传作何处理
            //console.log('this is current quill instance object', this.editor)
        }
    }
</script>

<style scoped lang="less">
    .publishBtn {
        text-align: center;

        .btn {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

    .title {
        margin: 10px;
    }

    .editor {
        height: 500px;
    }
</style>