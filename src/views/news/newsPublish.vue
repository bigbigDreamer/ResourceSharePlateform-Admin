<template>
    <Row>
        <Col span="24" class="publishBtn">
            <Button :size="buttonSize" icon="ios-cloud-upload-outline" class="btn" @click="publicNews">发布</Button>
            <Select v-model="model"
                    style="width:150px;margin-left: 40px;margin-top: 10px"
                    placeholder="请选择新闻分类"
                    @on-change="change"
                    :label-in-value="true"
            >
                <Option v-for="item in newsType" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </Col>
        <Col span="24">
            <Input v-model="title" type="textarea" placeholder="请输入文章标题" class="title"/>
        </Col>
        <Col span="24">
            <Input v-model="summaryContent" type="textarea" placeholder="请输入文章摘要" class="title"/>
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
    import storage from '../../utils'

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
                pic: [],
                //文章标题
                title: '',
                //发布人
                publisher: '',
                //新闻摘要
                summaryContent: '',
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
                newsType: [
                    {
                        id: '',
                        name: '',
                    },
                ],
                model: '',
                id: ''
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
                this.$ajax.post('http://websitdevelopment.cn:8081/news/saveNews', {
                    publisher: storage.getUserName(),
                    title: `${this.title}`,
                    content: this.content,
                    pic: this.pic.join(';'),
                    summaryContent: this.summaryContent,
                    catelogue: this.id
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
            this.$Notice.warning({
                title: '管理员请注意',
                desc: '上传第一张图片的大小必须符合640*360格式！！！',
                duration: 10,
            });
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

<style scoped lang="less">
    .publishBtn {
        text-align: center;

        .btn {
            margin-top: 10px;
        }
    }

    .title {
        margin: 10px;
    }

    .editor {
        height: 500px;
    }
</style>