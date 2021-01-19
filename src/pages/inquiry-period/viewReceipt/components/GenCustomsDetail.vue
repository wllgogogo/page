<template>
    <div>
        <div>
            <div class="card">
                <Row>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>报关类型: </Col>
                    <Col span="7">
                        <!-- 报关类型 -->
                        <span class="cargo-item-check" v-for="(e, i) in declType || ['进口']" :key="i">
                            {{ declTypeTrans(e) }}
                        </span>
                    </Col>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>货物类型: </Col>
                    <Col span="7">
                        <!-- 货物类型 -->
                        <span class="cargo-item-check" v-for="(e, i) in cargoType || ['普货']" :key="i">
                            {{ cargoTypeTrans(e) }}
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>运输方式: </Col>
                    <Col span="7">
                        <!-- 运输方式 -->
                        <span class="cargo-item-check" v-for="(e, i) in trspMode || ['空运', '水运']" :key="i">
                            {{ trspModeTrans(e) }}
                        </span>
                    </Col>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>运输类型: </Col>
                    <Col span="7">
                        <!-- 运输类型 -->
                        <span class="cargo-item-check" v-for="(e, i) in trspType || ['集装箱']" :key="i">
                            {{ trspTypeTrans(e) }}
                        </span>
                    </Col>
                </Row>
                <!-- 主要申报货物 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>主要申报货物: </Col>
                    <Col span="19" class="collpan colauto">
                        <span class="cargo-item-label" v-for="(e, i) in mainDeclGoods" :key="i">
                            {{ e }}
                        </span>
                    </Col>
                </Row>
                <!-- 不能申报货物 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>不能申报货物: </Col>
                    <Col span="19" class="collpan colauto">
                        <span class="cargo-item-label" v-for="(e, i) in banDeclGoods" :key="i">
                            {{ e }}
                        </span>
                    </Col>
                </Row>
                <!-- 申报关区 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>申报关区: </Col>
                    <Col span="19" class="collpan colauto">
                        <span class="cargo-item-label" v-for="(e, i) in formItem.declCustomsList" :key="i">
                            {{ e.declCuatomsCodeTranslate || e.declCuatomsCode }}
                        </span>
                    </Col>
                </Row>
                <!-- 报关单据要求 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg">
                        报关单据要求:
                    </Col>
                    <Col span="19" class="collpan colauto">
                        <div class="cargo-item-row" v-for="(e, idx) in formItem.customsBillList" :key="idx">
                            <span class="cargo-item-label">
                                {{ e.certName || '货物单据' }}
                            </span>
                            {{ e.modeType == 'CT' ? '国家要求模板' : '自定义模板' }}
                        </div>
                    </Col>
                </Row>
                <!-- 作业时间范围 -->
                <Row>
                    <Col span="5" class="gray-bg collr3"> <span class="need">*</span>作业时间范围: </Col>
                    <Col span="19" class="collr3 collpan">
                        <span @click="checkTime(e)" :class="{ 'cargo-item-label': e.check, uncheck: !e.check }" v-for="(e, i) in dateList" :key="i">{{ e.name }}</span>
                        <div class="cargo-main-input">
                            {{ timeRange }}
                        </div>
                    </Col>
                </Row>
                <!-- 服务/报价 -->
                <Row class="rowauto">
                    <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>服务/报价: </Col>
                    <Col span="19" class="collpan colauto">
                        <div class="cargo-item-row" v-for="(e, idx) in formItem.receiptServerList" :key="idx">
                            <span class="cargo-item-label">
                                {{ e.serverName }}
                            </span>
                            {{ e.serverNumber }}
                            {{ currTrans(e.serverCurr) }}
                            {{ trspTypeTrans(e.serverUnit) }}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <companyItemDetail :defaultData="companyData" />
    </div>
</template>

<script>
export default {
    // 普通关务回执模板
    name: 'GenCustomsTempDetail',
    components: {
        companyItemDetail: () => import('./companyDetail.vue')
    },
    props: {
        defaultData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            isShowDrawer: false,
            timeRange: '',
            CUSTOMS_DECLARATION_TYPE: [
                { dictionaryKey: 'I', dictionaryValue: '进口' },
                { dictionaryKey: 'E', dictionaryValue: '出口' }
            ], // 报关类型
            TRANSPORT_MODE: [
                { dictionaryKey: 'WATERWAY', dictionaryValue: '水运' },
                { dictionaryKey: 'AIRLIFT', dictionaryValue: '空运' },
                { dictionaryKey: 'PUBROAD', dictionaryValue: '公路' },
                { dictionaryKey: 'RAILWAY', dictionaryValue: '铁运' }
            ], // 运输方式
            CURRENCY_CODE: [
                { dictionaryKey: 'CNY', dictionaryValue: '元' },
                { dictionaryKey: 'USD', dictionaryValue: '美元' },
                { dictionaryKey: 'EUR', dictionaryValue: '欧元' }
            ], // 币种
            GOODS_TYPE: [
                { dictionaryKey: 'G', dictionaryValue: '普货' },
                { dictionaryKey: 'C', dictionaryValue: '恒温货' }
            ], // 货物类型
            TRANSPORT_TYPE: [
                { dictionaryKey: 'C', dictionaryValue: '集装箱' },
                { dictionaryKey: 'B', dictionaryValue: '件杂货' }
            ], // 运输类型
            TEMPLATEl_TYPE: [
                { dictionaryKey: 'CT', dictionaryValue: '国家要求模板' },
                { dictionaryKey: 'CD', dictionaryValue: '自定义模板' }
            ], // 模板类型
            arrList: [
                { name: '周一', check: false },
                { name: '周二', check: true },
                { name: '周三', check: false },
                { name: '周四', check: true },
                { name: '周五', check: false },
                { name: '周六', check: true },
                { name: '周日', check: false }
            ], // 星期
            formItem: {
                declCustomsList: [],
                mainDeclGoods: '',
                banDeclGoods: '',
                customsBillList: [
                    // { name: '单据一', type: 'G' },
                    // { name: '单据一', type: 'G' },
                    // { name: '单据一', type: 'G' },
                    // { name: '单据一', type: 'G' }
                ],
                trspType: '', // ';' => []
                trspMode: '', // ';' => []
                declType: '', // ';' => []
                cargoType: '',
                receiptPeriodList: [],
                receiptServerList: [{ serverName: '服务一', serverNumber: 15, serverCurr: '元', serverUnit: '集装箱' }]
            }, // 组件数据
            companyData: {} // 企业信息
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit('on-visible-change', changeStatus)
        },
        declTypeTrans(e) {
            const item = this.CUSTOMS_DECLARATION_TYPE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        trspModeTrans(e) {
            const item = this.TRANSPORT_MODE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        trspTypeTrans(e) {
            const item = this.TRANSPORT_TYPE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        tempTypeTrans(e) {
            const item = this.TEMPLATEl_TYPE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        currTrans(e) {
            const item = this.CURRENCY_CODE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        cargoTypeTrans(e) {
            if (e === 'G') {
                return '普货(不控温相关免责条款)'
            } else {
                return '恒温货(温度设定相关免责条款)'
            }
        },
        checkTime(e) {
            if (!e.check) {
                return
            }
            if (e.time) {
                // this.workTime = e.time.split(' - ')
                this.timeRange = e.time
                console.log('时间赋值', e.time)
            } else {
                this.timeRange = ''
                // this.workTime = ['', '']
            }
        },
        // 确定按钮
        save() {
            this.isShowDrawer = false
        },
        cancel() {
            this.isShowDrawer = false
        }
    },
    computed: {
        cargoType() {
            return this.formItem.cargoType.split(';')
        }, // '{}' => parse()
        declType() {
            return this.formItem.declType.split(';')
        }, // ';' => []
        trspType() {
            return this.formItem.trspType.split(';')
        },
        trspMode() {
            return this.formItem.trspMode.split(';')
        },
        mainDeclGoods() {
            return this.formItem.mainDeclGoods.split(';')
        },
        banDeclGoods() {
            return this.formItem.banDeclGoods.split(';')
        },
        dateList() {
            this.arrList.forEach(e => {
                this.formItem.receiptPeriodList.forEach(v => {
                    if (e.name === v.cycle) {
                        e.check = true
                        e.time = v.workShift + ' - ' + v.workOff
                    } else {
                        e.check = false
                    }
                })
            })
            return this.arrList
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                const Data = JSON.parse(JSON.stringify(val)) // 拷贝一份父组件传递的数据
                this.formItem = {
                    cargoType: Data.cargoType, // ';' => []
                    banDeclGoods: Data.banDeclGoods, // ';' => []
                    mainDeclGoods: Data.mainDeclGoods, // ';' => []
                    customsBillList: Data.customsBillList,
                    declCustomsList: Data.declCustomsList,
                    inquiryPlanCode: Data.inquiryPlanCode,
                    receiptPeriodList: Data.receiptPeriodList,
                    receiptServerList: Data.receiptServerList,
                    trspType: Data.trspType, // ';' => []
                    trspMode: Data.trspMode, // ';' => []
                    declType: Data.declType // ';' => []
                }
                this.companyData = {
                    etcpName: Data.etcpName, // 公司名称
                    etcpAddr: Data.etcpAddr, // 公司地址
                    enterpriseCode: Data.enterpriseCode, // 社会统一信用代码
                    businessEr: Data.businessEr, // 业务联系人
                    businessTel: Data.businessTel, // 业务联系人电话
                    billNumber: Data.billNumber, // 对账期数值
                    billPath: Data.billPath, // 对账期模板路径 todo
                    billType: Data.billType, // 对账期类型
                    billUnit: Data.billUnit, // 对账期单位
                    payUnit: Data.payUnit, // 付款期单位
                    payType: Data.payType, // 付款期类型
                    payNumber: Data.payNumber // 付款期数值
                }
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
