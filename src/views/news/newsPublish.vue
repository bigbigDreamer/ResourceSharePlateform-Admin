<template>
    <Row>
        <Col span="24" class="publishBtn">
            <Button :size="buttonSize" icon="ios-cloud-upload-outline" class="btn" @click="publicNews">发布</Button>
        </Col>
        <Col span="24">
            <Input v-model="title" type="textarea" placeholder="请输入文章标题" class="title"/>
        </Col>
        <br>
        <Col span="24">
            <quill-editor v-model="content"
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
        name: "newsPublish",
        data() {
            return {
                //按钮大小
                buttonSize: 'large',
                //新闻内容
                content: '<h2>请输入你的内容......</h2>',
                //图片相对地址
                pic: '',
                //文章标题
                title: '',
                //发布人
                publisher: '',
                //富文本编辑器相关配置
                editorOption: {
                    // some quill options
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'myFile',
                            action: '/file/uploadPic',
                            response: (res) => {
                                console.log(res);
                                this.pic = res.message;
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
                }
            }
        },
        methods: {
            //富文本编辑器失去焦点
            onEditorBlur(quill) {
                //console.log('editor blur!', quill)
            },
            //富文本编辑器获取焦点
            onEditorFocus(quill) {
                // console.log('editor focus!', quill)
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
             */
            publicNews() {
                this.$ajax.post('/news/saveNews', {
                    publisher: '暂不处理',
                    title: `<h1>${this.title}</h1>`,
                    content: this.content,
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
    @import "newsPublish";
</style>