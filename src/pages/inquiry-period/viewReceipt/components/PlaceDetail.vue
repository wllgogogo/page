<template>
    <div>
        <div>
            <div class="card">
                <!-- 场所类别 -->
                <Row>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>场所类别: </Col>
                    <Col span="19">
                        <!-- 场所类别 -->
                        <span class="cargo-item-check" v-for="(e, i) in stationType || ['仓库', '水港', '空港']" :key="i">
                            {{ declTypeTrans(e) }}
                        </span>
                    </Col>
                </Row>
                <!-- 运输类型 -->
                <Row>
                    <Col span="5" class="gray-bg"> <span class="need">*</span>运输类型: </Col>
                    <Col span="5">
                        <!-- 运输类型 -->
                        <span class="cargo-item-check" v-for="(e, i) in trspType || ['集装箱', '件杂货']" :key="i">
                            {{ trspTypeTrans(e) }}
                        </span>
                    </Col>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>货物类型: </Col>
                    <Col span="10">
                        <!-- 货物类型 -->
                        <span class="cargo-item-check" v-for="(e, i) in cargoType" :key="i">
                            {{ cargoTypeTrans(e) }}
                        </span>
                    </Col>
                </Row>
                <!-- 场所位置 -->
                <Row>
                    <Col span="5" class="gray-bg collr1"> <span class="need">*</span>场所位置: </Col>
                    <Col span="19" class="collpan collr1">
                        <div class="cargo-main-input">
                            {{ formItem.etcpAddr || formItem.etcpAddrTranslate || '无翻译' }}
                            {{ formItem.stationAddrDetail || '无详细地址返回' }}
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
                            {{ e.serverNumber || '无number' }}
                            {{ currTrans(e.serverCurr) }}
                            {{ trspTypeTrans(e.serverUnit) }}
                            <!-- || e.serverCurrTranslate || '无curr翻译' -->
                            <!-- || e.serverUnitTranslate || '无type翻译' -->
                        </div>
                    </Col>
                </Row>
                <!-- 作业时间范围 -->
                <Row>
                    <Col span="5" class="gray-bg collr3"> <span class="need">*</span>作业时间范围: </Col>
                    <Col span="19" class="collpan collr3">
                        <span @click="checkTime(e)" :class="{ 'cargo-item-date': e.check, uncheck: !e.check }" v-for="(e, i) in dateList" :key="i">{{ e.name }}</span>
                        <div class="cargo-main-input">
                            {{ timeRange }}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <companyItemDetail />
    </div>
</template>

<script>
export default {
    // 场所回执模板
    name: 'PlaceTemplate',
    components: {
        companyItemDetail: () => import('./companyDetail.vue')
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
            timeRange: '',
            // GEN_STATION_TYPE : this.$getDictionary('GEN_STATION_TYPE'), //普通场所类别
            // TRANSPORT_TYPE : this.$getDictionary('TRANSPORT_TYPE'), //运输类型
            // CURRENCY_CODE : this.$getDictionary('CURRENCY_CODE'), //币种
            GEN_STATION_TYPE: [
                { dictionaryKey: 'CK', dictionaryValue: '仓库' },
                { dictionaryKey: 'HZ', dictionaryValue: '货站' },
                { dictionaryKey: 'JZX', dictionaryValue: '集装箱堆场' },
                { dictionaryKey: 'SG', dictionaryValue: '水港' },
                { dictionaryKey: 'LG', dictionaryValue: '陆港' },
                { dictionaryKey: 'KG', dictionaryValue: '空港' }
            ], // 普通场所类别
            TRANSPORT_TYPE: [
                { dictionaryKey: 'C', dictionaryValue: '集装箱' },
                { dictionaryKey: 'B', dictionaryValue: '件杂货' }
            ], // 运输类型
            CURRENCY_CODE: [
                { dictionaryKey: 'CNY', dictionaryValue: '元' },
                { dictionaryKey: 'USD', dictionaryValue: '美元' },
                { dictionaryKey: 'EUR', dictionaryValue: '欧元' }
            ], // 币种
            arrList: [
                { name: '周一', check: false },
                { name: '周二', check: false },
                { name: '周三', check: false },
                { name: '周四', check: true },
                { name: '周五', check: false },
                { name: '周六', check: false },
                { name: '周日', check: false }
            ], // 星期
            companyData: {
                // etcpName: '公司一',
                // etcpAddr: '公司一地址',
                // enterpriseCode: 'hghg448485454',
                // businessEr: '王五',
                // businessTel: '13594526847',
                // billCurr: 'CNY',
                // billNumber: '4',
                // billPath: 'ggggggg',
                // billType: 'G',
                // payCurr: 'CNY',
                // payType: 'S',
                // paylNumber: '10'
                etcpName: '',
                etcpAddr: '',
                enterpriseCode: '',
                businessEr: '',
                businessTel: '',
                billCurr: '',
                billNumber: '',
                billPath: '',
                billType: '',
                payCurr: '',
                payType: '',
                paylNumber: ''
            }, // 企业信息
            formItem: {
                stationAddr: '',
                stationAddrDetail: '',
                inquiryPlanCode: '',
                receiptPeriodList: [
                    {
                        cycle: '周一',
                        // inquiryPlanCode: '',
                        // mkblNo: '',
                        // receiptId: '',
                        // workCode: '',
                        workOff: '18:10:00',
                        workShift: '08:24:00'
                    }
                ],
                receiptServerList: [
                    // {
                    //     // inquiryPlanCode: '',
                    //     // mkblNo: '',
                    //     // receiptId: '',
                    //     // serverCode: '',
                    //     serverCurr: 'CNY',
                    //     serverCurrTranslate: '元',
                    //     serverName: '服务一',
                    //     serverNumber: 10,
                    //     serverUnit: 'C',
                    //     serverUnitTranslate: '集装箱'
                    // }
                ],
                // trspMode: '',
                // cargoType: 'G;C', // '{}' => parse()
                // declType: 'CK;SG;LG', // ';' => []
                // trspType: 'C;B' // ';' => []
                stationType: '',
                cargoType: '', // '{}' => parse()
                // declType: '', // ';' => []
                trspType: '' // ';' => []
            }
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit('on-visible-change', changeStatus)
        },
        declTypeTrans(e) {
            const item = this.GEN_STATION_TYPE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        },
        trspTypeTrans(e) {
            const item = this.TRANSPORT_TYPE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        }, // currTrans UnitTrans
        cargoTypeTrans(e) {
            if (e === 'G') {
                return '普货(不控温相关免责条款)'
            } else {
                return '恒温货(温度设定相关免责条款)'
            }
        },
        currTrans(e) {
            const item = this.CURRENCY_CODE.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
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
        stationType() {
            return this.formItem.stationType.split(';')
        }, // ';' => []
        trspType() {
            return this.formItem.trspType.split(';')
        }, // ';' => []
        dateList() {
            this.arrList.forEach(e => {
                this.formItem.receiptPeriodList.forEach(v => {
                    if (e.name === v.cycle) {
                        e.check = true
                        // workOff: time.split(';')[0],
                        // workShift: time.split(';')[1]
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
        showDrawer: {
            handler(newVal) {
                this.isShowDrawer = newVal
            },
            immediate: true
        },
        defaultData: {
            handler(val) {
                const Data = JSON.parse(JSON.stringify(val)) // 拷贝一份父组件传递的数据
                this.formItem = {
                    cargoType: Data.cargoType, // '{}' => parse()
                    stationType: Data.stationType, // ';' => []
                    trspType: Data.trspType, // ';' => []
                    stationAddr: Data.stationAddr,
                    stationAddrTranslate: Data.stationAddr,
                    stationAddrDetail: Data.stationAddrDetail,
                    inquiryPlanCode: Data.inquiryPlanCode,
                    receiptPeriodList: Data.receiptPeriodList,
                    receiptServerList: Data.receiptServerList
                }
                // departurePort 启运地 只有启运地 是节点
                // destinationPort 目的地 两者都有是路段
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
        background-color: #f5f6f8;
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
                background-color: #f5f6f8;
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
            .ivu-input-wrapper {
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
                background: #e8eff5;
                border: 1px solid #0fb0b8;
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
                    color: #0fb0b8;
                }
            }
            .cargo-item-date {
                display: inline-block;
                padding: 0 20px;
                margin-top: 20px;
                margin-right: 20px;
                line-height: 24px;
                background: #e8eff5;
                border: 1px solid #0fb0b8;
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
