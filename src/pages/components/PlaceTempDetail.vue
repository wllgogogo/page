<template>
    <Drawer
        v-model="isShowDrawer"
        width="1640"
        :closable="false"
        @on-visible-change="drawerChange"
    >
        <h3>场所回执模板</h3>
        <div>
            <div class="card">
                <!-- 场所类别 -->
                <Row>
                    <Col span="5" class="gray-bg">
                        <span class="need">*</span>场所类别:
                    </Col>
                    <Col span="19">
                        <!-- 报关类型 -->
                        <span class="cargo-item-check" v-for="(e,i) in formItem.GEN_STATION_TYPE||['仓库','水港','空港']" :key="i">
                            {{e}}
                        </span>
                    </Col>
                </Row>
                <!-- 运输类型 -->
                <Row>
                    <Col span="5" class="gray-bg">
                        <span class="need">*</span>运输类型:
                    </Col>
                    <Col span="5">
                        <!-- 运输类型 -->
                        <span class="cargo-item-check" v-for="(e,i) in formItem.TRANSPORT_TYPE||['集装箱','件杂货']" :key="i">
                            {{e}}
                        </span>
                    </Col>
                    <Col span="4" class="gray-bg">
                        <span class="need">*</span>货物类型:
                    </Col>
                    <Col span="10">
                        <!-- 货物类型 -->
                        <span class="cargo-item-check" v-for="(e,i) in formItem.GOODS_TYPE||['普货(不控温相关免责条款)','恒温货(温度设定相关免责条款)']" :key="i">
                            {{e}}
                        </span>
                    </Col>
                </Row>
                <!-- 场所位置 -->
                <Row>
                    <Col span="5" class="gray-bg collr1">
                        <span class="need">*</span>场所位置:
                    </Col>
                    <Col span="19" class="collpan collr1">
                        <div class="cargo-main-input">
                            {{ formItem.city || '重庆市' }}
                            {{ formItem.changsuo || '寸滩' }}
                            {{ formItem.detailAdress || '重庆市沙坪坝区寸滩15号' }}
                        </div>
                    </Col>
                </Row>
                <!-- 服务/报价 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg">
                        <span class="need">*</span>服务/报价:
                    </Col>
                    <Col span="19" class="collpan colauto">
                        <div class="cargo-item-row" v-for="(e,idx) in formItem.servePriceList" :key="idx">
                            <span class="cargo-item-label">
                                {{e.name}}
                            </span>
                            {{ e.number || '15'}}
                            {{ e.CURRENCY_CODE || '美元'}}
                            {{ e.TRANSPORT_TYPE || '集装箱'}}
                        </div>
                    </Col>
                </Row>
                <!-- 作业时间范围 -->
                <Row>
                    <Col span="5" class="gray-bg collr3">
                        <span class="need">*</span>作业时间范围:
                    </Col>
                    <Col span="19" class="collpan collr3">
                        <span :class="{'cargo-item-date':e.check,'uncheck':!e.check}" v-for="(e,i) in dateList" :key="i">{{e.name}}</span>
                        <div class="cargo-main-input">
                            {{ formItem.city || '10:00:00 - 18:00:00' }}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <companyItemDetail />
        <div class="public-btns-group">
            <Button class="hoverf9" shape="circle" size="large" @click="save">确定</Button>
            <Button class="hoverf9" shape="circle" size="large" @click="cancel">取消</Button>
        </div>
    </Drawer>
</template>

<script>
export default {
    // 场所回执模板
    name: "PlaceTemplate",
    components: {
        companyItemDetail: () => import("./companyItemDetail.vue")
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
            // GEN_STATION_TYPE : this.$getDictionary('GEN_STATION_TYPE'), //普通场所类别
            // TRANSPORT_TYPE : this.$getDictionary('TRANSPORT_TYPE'), //运输类型
            // CURRENCY_CODE : this.$getDictionary('CURRENCY_CODE'), //币种
            // TRANSPORT_TYPE : this.$getDictionary('TRANSPORT_TYPE'), //运输类型
            dateList: [
                { name: '周一', check: false },
                { name: '周二', check: false },
                { name: '周三', check: false },
                { name: '周四', check: true },
                { name: '周五', check: false },
                { name: '周六', check: false },
                { name: '周日', check: false }
            ], //星期
            servePrice: '', //服务报价 输入框
            detail_station: '', //场所详细位置 输入框
            formInline: {
                selectCity: '',
                destinationSite: ''
            },
            selcectPlaceList: [],
            formItem: {
                servePriceList: [{ name: '服务一' }]
            }
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit("on-visible-change", changeStatus)
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
                this.formItem = JSON.parse(JSON.stringify(val)) //拷贝一份父组件传递的数据
                console.log(this.formItem, '场所回执详情')
            },
            // immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    .rowauto {
        border-bottom: 1px solid #e5e5e5;
        background-color: #F5F6F8;
    }
    .ivu-row {
        border-left: 1px solid #e5e5e5;
        &:first-of-type {
            border-top: 1px solid #e5e5e5;
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
                background-color: #F5F6F8;
                > .need {
                    color: red;
                    font-size: 18px;
                    vertical-align: middle;
                }

            }
            .cargo-item-check {
                display: inline-block;
                padding: 0 10px;
                line-height: 24px;
            }
        }
        .collr3 {
            height: 96px;
        }
        .collr2 {
            height: 84px;
        }
        .collr1 {
            height: 50px;
        }
        .collp0 {
            padding: 0px;
            .ivu-input-wrapper {
                vertical-align: baseline;
            }
        }
        .colauto {
            height: auto;
            padding-bottom: 14px;
            border-bottom: none;
            border-left: 1px solid #e5e5e5;
        }
        .collpan {
            .ivu-cascader-rel {
                width: auto;
            }
            .ivu-input-wrapper{
                width: 160px;
            }
            .cargo-main-input {
                margin: 5px 0 10px 0;
            }
            .cargo-item-row {
                display: inline-block;
                width: 550px;
            }
            /deep/ .ivu-upload-drag {
                overflow: unset;
                border: none !important;
            }
            .cargo-item-label {
                display: inline-block;
                position: relative;
                padding: 0 20px 0 10px;
                margin-right: 20px;
                line-height: 24px;
                background: #E8EFF5;
                border: 1px solid #0FB0B8;
                border-radius: 4px;
                cursor: default;
                .iconfont {
                    position: absolute;
                    top: 3px;
                    right: 0;
                    cursor: pointer;
                    font-size: 18px;
                }
                .iconfont:hover {
                    color: #0FB0B8;
                }
            }
            .cargo-item-date {
                display: inline-block;
                padding: 0 20px;
                margin-top: 20px;
                margin-right: 20px;
                line-height: 24px;
                background: #E8EFF5;
                border: 1px solid #0FB0B8;
                border-radius: 4px;
                cursor: pointer;
            }
            .uncheck {
                display: inline-block;
                padding: 0 20px;
                margin-top: 20px;
                margin-right: 20px;
                line-height: 24px;
                background: #efefef;
                border: 1px solid #efefef;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
}
</style>
