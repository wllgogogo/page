<template>
    <Drawer v-model="isShowDrawer" width="1640" :closable="false" @on-visible-change="drawerChange">
        <h3>普通关务回执模板</h3>
        <GenCustomsTempDetail :defaultData="tempDetail" />
        <div class="public-btns-group">
            <Button class="hoverf9" shape="circle" size="large" @click="save">确定</Button>
            <Button class="hoverf9" shape="circle" size="large" @click="cancel">取消</Button>
        </div>
    </Drawer>
</template>

<script>
export default {
    // 普通关务回执模板
    components: {
        GenCustomsTempDetail: () => import('../components/GenCustomsTempDetail.vue')
    },
    props: {
        showDrawer: {
            type: Boolean,
            default: false
        },
        defaultData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            isShowDrawer: false,
            tempDetail: {} // 父组件数据
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit('on-visible-change', changeStatus)
        },
        // 确定按钮
        save() {
            this.isShowDrawer = false
        },
        cancel() {
            this.isShowDrawer = false
        }
    },
    watch: {
        showDrawer: {
            handler(newVal) {
                this.isShowDrawer = newVal
            },
            immediate: true
        },
        defaultData: {
            handler(val) {
                this.tempDetail = JSON.parse(JSON.stringify(val)) // 拷贝一份父组件传递的数据
                console.log(this.tempDetail, '关务回执详情')
                // this.formItem
                // this.companyData
            },
            // immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    .ivu-row {
        border-left: 1px solid #e5e5e5;
        &:first-of-type {
            border-top: 1px solid #e5e5e5;
        }
        &.rowauto {
            border-bottom: 1px solid #e5e5e5;
            background-color: #f5f6f8;
        }
        .ivu-col {
            height: 32px;
            line-height: 32px;
            text-align: left;
            padding: 0 20px;
            background-color: #fff;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            &.gray-bg {
                text-align: right;
                background-color: #f5f6f8;
                > .need {
                    color: red;
                    font-size: 18px;
                    vertical-align: middle;
                }
            }
            &.colauto {
                height: auto;
                border-bottom: none;
                border-left: 1px solid #e5e5e5;
            }
            &.collr3 {
                height: 96px;
            }
            &.collpan {
                .ivu-cascader-rel {
                    width: auto;
                }
                .ivu-input-wrapper {
                    width: 160px;
                }
                .cargo-main-input {
                    margin: 5px 0 10px 0;
                }
                .cargo-item-row {
                    display: inline-block;
                    width: 300px;
                }
                /deep/ .ivu-upload-drag {
                    overflow: unset;
                    border: none !important;
                }
                .cargo-item-label {
                    display: inline-block;
                    padding: 0 10px;
                    margin-right: 20px;
                    line-height: 24px;
                    background: #e8eff5;
                    border: 1px solid #0fb0b8;
                    border-radius: 4px;
                    cursor: default;
                }
                .uncheck {
                    display: inline-block;
                    padding: 0 10px;
                    margin-top: 20px;
                    margin-right: 20px;
                    line-height: 24px;
                    background: #efefef;
                    border: 1px solid #efefef;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            .cargo-item-check {
                display: inline-block;
                padding: 0 10px;
                line-height: 24px;
            }
        }
    }
}
</style>
