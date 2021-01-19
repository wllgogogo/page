<template>
    <Drawer
        v-model="isShowDrawer"
        width="1100"
        :closable="false"
        @on-visible-change="drawerChange"
    >
        <h3>查看协同协作</h3>
        <div>
            <div v-for="(formItem, index) in cargoList" :key="index" class="cargo-item">
                <div class="cargo-info">
                    <div class="title">
                        <div class="name">协同协作{{ index+1 }}</div>
                        <span class="icon">
                            <Icon
                                v-if="formItem.isShow"
                                type="ios-arrow-down"
                                @click="onClose(formItem)"
                            />
                            <Icon
                                v-else
                                type="ios-arrow-up"
                                @click="onOpen(formItem)"
                            />
                        </span>
                    </div>
                    <div v-show="formItem.isShow" class="form-card">
                        <Row>
                            <Col span="24">
                                <span class="tlabel" :class="{active:e.ac}" :key="i" v-for="(e,i) in formItem.cj||[{name:'场景一'},{name:'场景二'}]">{{e.name}}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24" class="titleCol">
                                <Col span="3">协同协作内容</Col>
                                <Col span="21" class="lineCol"></Col>
                            </Col>
                            <Col span="24" class="contentCol">
                                dasd
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24" class="titleCol">
                                <Col span="3">协同协作方</Col>
                                <Col span="21" class="lineCol"></Col>
                            </Col>
                            <Col span="24" class="contentCol">
                                dsad
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="public-btns-group">
            <Button class="hoverf9" shape="circle" size="large" @click="save">确定</Button>
            <Button class="hoverf9" shape="circle" size="large" @click="cancel">取消</Button>
        </div>
    </Drawer>
</template>

<script>
export default {
    // 查看协同协作模板
    name: 'collaborationDetail',
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
            cargoList: [{ isShow: true }, { isShow: true }],
            formItem: {}
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit("on-visible-change", changeStatus)
        },
        onOpen(formItem) {
            this.$set(formItem, 'isShow', true)
        },
        onClose(formItem) {
            this.$set(formItem, 'isShow', false)
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
                this.formItem = JSON.parse(JSON.stringify(val))
                console.log(this.formItem, '查看协同协作模板')
            },
            // immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.cargo-item {
    display: flex;
    margin-top: 20px;
    .cargo-info {
        flex-grow: 1;
        background-color: #fff;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 20px;
            background-color: #FFF6E5;
            .ivu-icon {
                font-size: 20px;
                cursor: pointer;
            }
        }
        .form-card {
            padding: 20px;
            background-color: #F9F9F9;
            .active {
                color: #333333;
                background: #E8EFF5;
                border: 1px solid #02ADB5;
            }
            .tlabel {
                display: inline-block;
                text-align: center;
                width: 99px;
                height: 24px;
                background: #E5E5E5;
                border-radius: 4px;
                margin-right: 20px;
                color: #666666;
                cursor: pointer;
            }
            .titleCol {
                font-size:16px;
                margin-top:20px;
                font-weight: bold;
            }
            .lineCol {
                height:1px;
                background-color: #D7D8DF;
                margin: 11px 0
            }
            .contentCol {
                padding:20px;
                line-height:20px;
                font-size:14px;
                margin:10px 0;
                height: auto;
                background: #ffffff;
            }
        }
    }
}
</style>
