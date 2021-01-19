<template>
    <div>
        <div id="RouteInformation" class="public-form-card">
            <Form ref="formItemData" :model="formItem" inline label-colon>
                <div class="wrap">
                    <div class="content-box">
                        <span style="width: 55px; flex-shrink: 0;">启运地:</span>
                        <adt-city-selector :isDisabled="enablefn().scheme()" v-if="!isDetail" :defaultData="search.dispatchCity" @on-change="changeDispatchCity" />
                        <Select v-if="!isDetail" :disabled="enablefn().scheme()" @on-change="dispatchFn1" v-model="search.dispatchSite" clearable>
                            <Option v-for="item in dispatchOptions1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="isDetail">{{ detailData.departurePortTranslate }}</div>
                        <p v-show="startHintShow" class="hint">请输入启运地</p>
                    </div>
                    <div class="icon">
                        <img src="@/assets/images/next-step.png" alt="路线信息" />
                    </div>
                    <div class="content-box">
                        <span style="width: 55px; flex-shrink: 0;">目的地:</span>
                        <adt-city-selector v-if="!isDetail" :isDisabled="enablefn().scheme()" :defaultData="search.destinationCity" @on-change="changeDestinationCity" />
                        <Select v-if="!isDetail" :disabled="enablefn().scheme()" @on-change="dispatchFn2" v-model="search.destinationSite" clearable>
                            <Option v-for="item in dispatchOptions2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div v-if="isDetail">{{ detailData.destinationPortTranslate }}</div>
                        <p class="hint" v-show="endHintShow">请输入目的地</p>
                    </div>
                </div>
            </Form>
        </div>
        <div class="card">
            <Row>
                <Col span="4" class="gray-bg">
                    物流类型：
                </Col>
                <Col span="8">
                    <div v-if="!isDetail" style="text-align: center;">{{ formItem.logisticsTypeTranslate || formItem.logisticsType }}</div>
                    <div v-else>{{ formatLogType(detailData.logisticsType) }}</div>
                </Col>
                <Col span="4" class="gray-bg">
                    运输方式：
                </Col>
                <Col span="8">
                    <RadioGroup v-if="!isDetail" v-model="formItem.trspMode">
                        <Radio label="WATERWAY" :disabled="enablefn().scheme()">
                            水运
                        </Radio>
                        <Radio label="AIRLIFT" style="margin-left: 30px;" :disabled="enablefn().scheme()">
                            空运
                        </Radio>
                        <Radio label="PUBROAD" style="margin-left: 30px;" :disabled="enablefn().scheme()">
                            公路
                        </Radio>
                        <Radio label="RAILWAY" style="margin-left: 30px;" :disabled="enablefn().scheme()">
                            铁路
                        </Radio>
                    </RadioGroup>
                    <div v-else>{{ formatTrspMode(detailData.trspMode) }}</div>
                </Col>
            </Row>
        </div>
        <div v-if="!isDetail && !isEdit" class="public-btns-group">
            <Button type="primary" shape="circle" size="large" @click="submitForm">下一步</Button>
        </div>
    </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { apiGenerateRoute } from '@/api/freightRequirement'
import { _handelDir } from '@/libs/utils'
export default {
    props: {
        isDetail: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        defaultData: {
            type: Array,
            default: () => []
        },
        detailData: {
            type: Object,
            default: () => ({})
        },
        editData: {
            type: Object,
            default: () => ({})
        },
        eStatus: {
            type: String,
            default: 'CREATEs' // 委托状态
        },
        judge: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            logisticsTypeListData: [], // this.$getDictionary('LOGISTICS_TYPE'), // 物流类型
            search: {
                dispatchCity: '',
                dispatchSite: '',
                destinationCity: '',
                destinationSite: ''
            },
            dispatchOptions1: [], // 场所1
            dispatchOptions2: [], // 场所2
            // 启运地提示
            startHintShow: false,
            // 目的地提示
            endHintShow: false,
            formItem: {
                logisticsType: '',
                logisticsTypeTranslate: '',
                trspMode: '',
                trspModeTranslate: ''
            }
        }
    },
    mounted() {
        if (this.isDetail) {
            if (this.defaultData.length > 0) {
                this.search.dispatchCity = this.defaultData[0].departurePortTranslate || '重庆'
                this.search.destinationCity = this.defaultData[0].destinationPortTranslate || '北京'
                this.formItem.logisticsType = this.defaultData[0].logisticsType || '国内'
                this.formItem.trspMode = this.defaultData[0].trspMode || '空运'
            }
            // 获取关区
            // apiGetTranslate ( {data: 'CUSTOMS'} ).then(res => {
            //     this.customsCode = res.data
            // })
        }
    },
    methods: {
        submitForm() {
            // 校验启运地
            if (this.search.dispatchCity == false || this.search.dispatchCity == undefined) {
                this.startHintShow = true
                return
            } else {
                this.startHintShow = false
            }
            // 校验目的地
            if (this.search.destinationCity == false || this.search.destinationCity == undefined) {
                this.endHintShow = true
                return
            } else {
                this.endHintShow = false
            }
            if (this.formItem.trspMode === '' || this.formItem.trspMode === undefined || this.formItem.trspMode === null) {
                this.$Message.warning('请选择运输类型')
                return
            }
            const site1 = this.search.dispatchSite ? ';' + this.search.dispatchSite : ''
            const site2 = this.search.destinationSite ? ';' + this.search.destinationSite : ''
            const data = {
                startPlace: [this.search.dispatchCity + site1],
                endPlace: [this.search.destinationCity + site2],
                ctransitPlace: []
            }
            console.log(data, 'data')
            apiGenerateRoute({ data }).then(({ data }) => {
                sessionStorage.setItem('routeListObject', JSON.stringify(this.formItem)) // 保存 物流类型 运输类型
                this.$emit('submit-form', data[0])
            })
        },
        // 选择启运地城市
        async changeDispatchCity(value) {
            this.search.dispatchCity = value.value.join(';')
            this.search.dispatchSite = '' // 启运场所清空
            this.dispatchOptions1 = await _handelDir(value.value) // 拿到场所 列表地点
            if (this.search.dispatchCity && this.search.destinationCity) {
                // 校验 国际 国内
                const a = this.search.dispatchCity.split(';')
                const b = this.search.destinationCity.split(';')
                if (a[0] === 'CN' && b[0] === 'CN') {
                    // 国内
                    this.formItem.logisticsTypeTranslate = '国内'
                    this.formItem.logisticsType = 'N'
                } else {
                    // 国际
                    this.formItem.logisticsTypeTranslate = '国际'
                    this.formItem.logisticsType = 'I'
                }
            }
        },
        // 选择目的地城市
        async changeDestinationCity(value) {
            this.search.destinationCity = value.value.join(';')
            this.search.destinationSite = '' // 目的场所清空
            this.dispatchOptions2 = await _handelDir(value.value)
            if (this.search.dispatchCity && this.search.destinationCity) {
                // 校验 国际 国内
                const a = this.search.dispatchCity.split(';')
                const b = this.search.destinationCity.split(';')
                if (a[0] === 'CN' && b[0] === 'CN') {
                    // 国内
                    this.formItem.logisticsTypeTranslate = '国内'
                    this.formItem.logisticsType = 'N'
                } else {
                    // 国际
                    this.formItem.logisticsTypeTranslate = '国际'
                    this.formItem.logisticsType = 'I'
                }
            }
        },
        // 判断保税
        dispatchFn1(value) {
            if (!this.search.dispatchSite || !this.search.destinationSite) {
                return
            }
            let boo1 = false
            let boo2 = false
            this.dispatchOptions1.forEach(item => {
                if (item.value === value) {
                    boo1 = item.label.includes('综保区')
                }
            })
            this.dispatchOptions2.forEach(item => {
                if (item.value === this.search.destinationSite) {
                    boo2 = item.label.includes('综保区')
                }
            })
            if (boo1 && boo2) {
                // 保税
                this.formItem.logisticsTypeTranslate = '保税'
                this.formItem.logisticsType = 'B'
            } else {
                this.formItem.logisticsTypeTranslate = '国内'
                this.formItem.logisticsType = 'N'
            }
        },
        // 判断保税
        dispatchFn2(value) {
            if (!this.search.dispatchSite || !this.search.destinationSite) {
                return
            }
            let boo1 = false
            let boo2 = false
            this.dispatchOptions2.forEach(item => {
                if (item.value === value) {
                    boo1 = item.label.includes('综保区')
                }
            })
            this.dispatchOptions1.forEach(item => {
                if (item.value === this.search.dispatchSite) {
                    boo2 = item.label.includes('综保区')
                }
            })
            if (boo1 && boo2) {
                // 保税
                this.formItem.logisticsTypeTranslate = '保税'
                this.formItem.logisticsType = 'B'
            } else {
                this.formItem.logisticsTypeTranslate = '国内'
                this.formItem.logisticsType = 'N'
            }
        },
        formatTrspMode(value) {
            if (!value) return
            let transName = ''
            switch (value) {
                case 'AIRLIFT':
                    transName = '空运'
                    break
                case 'WATERWAY':
                    transName = '水运'
                    break
                case 'PUBROAD':
                    transName = '公路'
                    break
                case 'RAILWAY':
                    transName = '铁路'
                    break
                default:
                    transName = '空运'
                    break
            }
            return transName
        },
        formatLogType(value) {
            if (!value) return
            let transName = ''
            switch (value) {
                case 'I':
                    transName = '国际'
                    break
                case 'N':
                    transName = '国内'
                    break
                case 'B':
                    transName = '保税'
                    break
                default:
                    transName = '国际'
                    break
            }
            return transName
        },
        // 是否禁用 判断
        enablefn() {
            const aa = 'CREATE'
            const bb = 'AFORM'
            const cc = 'RECEIVE'
            const dd = 'REJECT'
            const ee = 'CANCEL'
            const ff = 'UNCONFIRM'
            const gg = 'PLANPUSH'
            const hh = 'WAIT'
            const ii = 'EXECUTE'
            const jj = 'EXEXE'
            const kk = 'EXFIN'
            const ll = 'FINISH'
            const mm = 'VCLR'
            // 进入方式 输入类型 状态 委托类型
            const e = this.judge.enter
            const i = this.judge.input
            const s = this.eStatus
            const t = this.judge.coopType
            // console.log(e,i,s,t,'coopType');
            return {
                // 方案信息
                scheme: () => {
                    if (t == 'S') {
                        // 单次
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                if (s == aa || s == bb || s == dd || s == ee) {
                                    // 未发送 已发送 已拒绝 已取消
                                    return false // 可编辑
                                } else {
                                    return true // 不可编辑
                                }
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            return true // 不可编辑
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true // 不可编辑
                        }
                    } else {
                        // 合同
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                return true // 不可编辑
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            return true // 不可编辑
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true
                        }
                    }
                },
                // 费用
                cost: () => {
                    if (t == 'S') {
                        // 单次
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                if (s == aa || s == bb || s == dd || s == ee) {
                                    // 未发送 已发送 已拒绝 已取消
                                    return false // 可编辑
                                } else {
                                    return true // 不可编辑
                                }
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                if (s == aa || s == bb || s == dd || s == ee) {
                                    // 未发送 已发送 已拒绝 已取消
                                    return false // 可编辑
                                } else {
                                    return true // 不可编辑
                                }
                            }
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true // 不可编辑
                        }
                    } else {
                        // 合同
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                return true // 不可编辑
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                return true // 不可编辑
                            }
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true
                        }
                    }
                },
                // 时间要求
                time: () => {
                    if (t == 'S') {
                        // 单次
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                if (s == aa || s == bb || s == dd || s == ee) {
                                    // 未发送 已发送 已拒绝 已取消
                                    return false // 可编辑
                                } else {
                                    return true // 不可编辑
                                }
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                if (s == aa || s == bb || s == dd || s == ee) {
                                    // 未发送 已发送 已拒绝 已取消
                                    return false // 可编辑
                                } else {
                                    return true // 不可编辑
                                }
                            }
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true
                        }
                    } else {
                        // 合同
                        if (e == 'send') {
                            // 直接发起
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                return true // 不可编辑
                            }
                        }
                        if (e == 'noreqsend') {
                            // 不带货运要求
                            if (i == 'input') {
                                // 录入
                                return false // 可编辑
                            }
                            if (i == 'edit') {
                                // 编辑
                                return true // 不可编辑
                            }
                        }
                        if (e == 'reqsend') {
                            // 带货运要求
                            return true
                        }
                    }
                },
                // 基本信息
                base: () => {
                    if (t == 'S') {
                        // 单次
                        if (i == 'input') {
                            // 录入
                            return false // 可编辑
                        }
                        if (i == 'edit') {
                            // 编辑
                            if (s == aa || s == bb || s == dd || s == ee) {
                                // 未发送 已发送 已拒绝 已取消
                                return false // 可编辑
                            } else {
                                return true // 不可编辑
                            }
                        }
                    } else {
                        // 合同
                        if (i == 'input') {
                            // 录入
                            return false // 可编辑
                        }
                        if (i == 'edit') {
                            // 编辑
                            return true // 不可编辑
                        }
                    }
                }
            }
        }
    },
    watch: {
        editData: {
            async handler(val) {
                this.search.dispatchCity = val.dispatchCity
                this.search.dispatchSite = val.dispatchSite
                if (val.dispatchSite) {
                    this.dispatchOptions1 = await _handelDir(val.dispatchCity.split(';')) // 拿到场所地点
                }
                if (val.destinationSite) {
                    this.dispatchOptions2 = await _handelDir(val.destinationCity.split(';')) // 拿到场所地点
                }
                this.search.destinationCity = val.destinationCity
                this.search.destinationSite = val.destinationSite
                this.formItem.logisticsType = val.logisticsType
                this.formItem.logisticsTypeTranslate = val.logisticsTypeTranslate
                this.formItem.trspMode = val.trspMode
                // console.log(val,'回想啊2');
            },
            deep: true, // true 深度监听
            immediate: true // 首次触发
        }
    }
}
</script>

<style lang="scss" scoped>
#RouteInformation {
    background: #ffffff;
    margin-top: 30px;
    padding: 20px;
    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 76px;
        background: #f9f9f9;
        margin-bottom: 20px;
        .content-box {
            flex-grow: 8;
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/ .ivu-form-item {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin: 20px;
                .ivu-form-item-content {
                    width: 160px;
                }
            }
            /deep/ .ivu-select {
                width: 160px;
                margin-left: 20px;
            }
            .hint {
                color: red;
            }
        }

        .icon {
            flex-grow: 2;
            text-align: center;
            vertical-align: middle;
            .iconfont {
                width: 10em;
                height: 2em;
                color: #02adb5;
            }
        }
    }
}
.card {
    .ivu-row {
        border-left: 1px solid #e5e5e5;
        &:first-of-type {
            border-top: 1px solid #e5e5e5;
        }
        &.last-type {
            border-bottom: 1px solid #e5e5e5;
        }
        .ivu-col {
            height: 34px;
            line-height: 34px;
            text-align: left;
            padding: 0 5px;
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
            > .ivu-select {
                width: 180px;
                margin-right: 10px;
                vertical-align: middle;
            }
            > button {
                vertical-align: middle;
            }
        }
    }
}
button {
    margin-top: 30px;
}
</style>
