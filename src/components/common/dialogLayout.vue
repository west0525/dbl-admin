<template>
    <div>
        <div class="pop-fade" v-show="visible"></div>
        <div class="right-layout" :class="{'toggled': visible, 'pt20': !title}"
            :style="{width: width, left: show ? `calc(100% - ${width})` : 'calc(100% + 40px)'}">
            <span class="close-btn" @click="closeLayout">
                <i class="el-icon-close close-btn-icon"></i>
            </span>
            <h3 class="title" v-if="title">{{title}}</h3>
            <div class="main" :class="{'hasFooter': showFooter, 'hidden': loading}"
                :style="{height: showFooter ? 'calc(100% - 115px)' : 'calc(100% - 55px)'}" v-loading="loading"
                :element-loading-text="loadingText">
                <div class="main-content" ref="scrollBody">
                    <slot class="inner-content"></slot>
                </div>
            </div>
            <div class="footer" v-if="showFooter">
                <slot name="foot" class="demo"></slot>
                <slot name="footer" class="demo"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "RightLayout",
        props: {
            width: { // 宽度
                type: String,
                default: "600px"
            },
            visible: { // 是否显示
                type: Boolean,
                default: false
            },
            title: { // 标题
                type: String,
                default: ""
            },
            loading: {
                type: Boolean,
                default: false
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
            appendToBody: { // 是否插入到body中
                type: Boolean,
                default: false
            },
        },
        components: {},
        data() {
            return {
                show: false,
            };
        },
        watch: {
            visible(val) {
                if (val) {
                    if (this.$refs.scrollBody) {
                        this.$refs.scrollBody.scrollTop = 0; // 滚动到最顶端
                    }

                    if (this.appendToBody) {
                        setTimeout(() => {
                            this.show = val;
                        }, 50)
                        document.body.appendChild(this.$el);
                    } else {
                        this.show = val;
                    }
                } else {
                    this.show = val;
                    setTimeout(() => {
                        if (this.appendToBody && this.$el && this.$el.parentNode) {
                            this.$el.parentNode.removeChild(this.$el);
                        }
                    }, 500)
                }
            }
        },
        computed: {
            showFooter() {
                return !!this.$slots.foot || !!this.$slots.footer
            }
        },
        mounted() {
            if (this.visible) {
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            }
        },
        methods: {
            closeLayout() {
                this.$emit("update:visible", false);
                this.$emit("closeLayout");
            },
        },
    };
</script>
<style lang="scss" scoped>
    .right-layout {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #f0f0f0;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        transition: left .5s ease-in-out;
        display: flex;
        flex-direction: column;

        &.pt20 {
            padding-top: 20px;
        }

        & .footer {


            >div {
                background-color: white;
                z-index: 10;
                min-height: 2px;
                padding: 10px 20px;
                box-shadow: 0 0 8px 0 rgba(61, 73, 102, 0.15);
                text-align: right;

                .left {
                    float: left;
                }

                .text-left {
                    text-align: left;
                }


            }

            .checkDiv {
                height: 20px !important;
                background: #f7f9fd !important;
                padding: 0 !important;
                box-shadow: none !important;
            }


        }

        &.toggled {
            left: 100%;
        }

        & .close-btn {
            display: block;
            height: 40px;
            width: 40px;
            line-height: 40px;
            text-align: center;
            color: #AEB0B8;
            top: 5px;
            cursor: pointer;
            left: -40px;
            background: #f0f0f0;
            position: absolute;
            border-radius: 2px 0 0 2px;

            .close-btn-icon {
                width: 12px;
                height: 12px;
                display: block;
                position: absolute;
                left: 15px;
                top: 14px;
                transition: transform .3s linear;
            }

            &:hover .close-btn-icon {
                transform: rotate(90deg);
            }
        }

        .title {
            height: 55px;
            display: table;
            font-weight: 600;
            width: 100%;
            position: relative;
            box-sizing: border-box;
            line-height: 55px;
            padding-left: 19px;
            color: #262C3A;
        }

        .main {
            height: calc(100% - 55px);
            overflow-y: auto;
            overflow-x: hidden;
            flex: 1;
            display: flex;
            flex-direction: column;

            &.hidden {
                overflow: hidden;
            }

            .main-content {
                flex: 1;
                height: 100%;
                overflow: auto;
                overflow-x: hidden;
                display: flex;
                flex-direction: column;

                >* {
                    background-color: #fff;
                    margin: 0 20px 20px;
                    padding: 20px;
                }

                /deep/ .el-form-item {
                    margin-bottom: 14px;
                }

                /deep/ {
                    // 解决富文本编辑器被遮住问题
                    .edui-default .edui-editor {
                        z-index: 2010 !important;
                    }
                }
            }
        }
    }

    .pop-fade {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 2000;
    }
</style>