<template>
    <div style="margin-top:20px">
        <div class="card">
            <!-- 公司名称 公司地址 -->
            <Row>
                <Col span="4" class="gray-bg"> <span class="need">*</span>公司名称: </Col>
                <Col span="4">
                    {{ formItem.etcpName || '' }}
                </Col>
                <Col span="4" class="gray-bg"> <span class="need">*</span>公司地址: </Col>
                <Col span="12">
                    {{ formItem.etcpAddr || '' }}
                </Col>
            </Row>
            <!-- 统一社会信用代码 -->
            <Row>
                <Col span="4" class="gray-bg"> <span class="need">*</span>统一社会信用代码: </Col>
                <Col span="4">
                    {{ formItem.enterpriseCode || '' }}
                </Col>
                <Col span="4" class="gray-bg"> <span class="need">*</span>业务联系人: </Col>
                <Col span="4">
                    {{ formItem.businessEr || '' }}
                </Col>
                <Col span="4" class="gray-bg"> <span class="need">*</span>电话: </Col>
                <Col span="4">
                    {{ formItem.businessTel || '' }}
                </Col>
            </Row>
            <!-- 平台结算规则 -->
            <Row align="top">
                <Col span="4" class="gray-bg collr2"> <span class="need">*</span>平台结算规则: </Col>
                <Col span="20" class="rule_style collp0 collr2">
                    <!-- 对账期 -->
                    <div>
                        <div class="rule_left1">对账期</div>
                        <div class="rule_right1 collpan">
                            <RadioGroup v-model="formItem.billType">
                                <Radio disabled :label="e.dictionaryKey" v-for="(e, i) in SETTLEMENT_RULE_TYPE" :key="i">
                                    <span>{{ e.dictionaryValue }}</span>
                                </Radio>
                            </RadioGroup>
                            <span style="display: inline-block;width: 150px;" v-show="formItem.billType == 'G'">
                                {{ Number(formItem.billNumber) }}
                                {{ querTrans(formItem.billUnit) }}
                                /次
                            </span>
                            <span style="display: inline-block;width: 150px;" v-show="formItem.billType == 'S'">
                                完成后
                                {{ Number(formItem.billNumber) }}
                                天
                            </span>
                            <span class="cargo-item-label" v-show="formItem.billPath" @click="lookBill(formItem.billPath)">
                                下载对账单模板
                            </span>
                        </div>
                    </div>
                    <!-- 付款期 -->
                    <div>
                        <div class="rule_left2">付款期</div>
                        <div class="rule_right2">
                            <RadioGroup v-model="formItem.payType">
                                <Radio disabled :label="e.dictionaryKey" v-for="(e, i) in SETTLEMENT_RULE_TYPE" :key="i">
                                    <span>{{ e.dictionaryValue }}</span>
                                </Radio>
                            </RadioGroup>
                            <span style="display: inline-block;" v-show="formItem.payType == 'G'">
                                {{ Number(formItem.paylNumber) }}
                                {{ querTrans(formItem.payUnit) }}
                                /次
                            </span>
                            <span style="display: inline-block;" v-show="formItem.payType == 'S'">
                                完成后
                                {{ Number(formItem.payNumber) }}
                                天
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { aDownLoadFile } from '@/libs/utils'
export default {
    // name: '',
    props: {
        defaultData: {
            type: Object,
            default: () => ({
                // etcpName: 'a', // 公司名称
                // etcpAddr: 'd', // 公司地址
                // enterpriseCode: 'd', // 社会统一信用代码
                // businessEr: 'qa', // 业务联系人
                // businessTel: 13597854156, // 业务联系人电话
                // billNumber: 1, // 对账期数值
                // billPath: '', // 对账期模板路径 todo
                // billType: 'S', // 对账期类型
                // billUnit: '', // 对账期单位
                // payUnit: '', // 付款期单位
                // payType: 'S', // 付款期类型
                // payNumber: 1 // 付款期数值
            })
        }
    },
    data() {
        return {
            SETTLEMENT_RULE_TYPE: [
                { dictionaryKey: 'G', dictionaryValue: '固定方式' },
                { dictionaryKey: 'S', dictionaryValue: '单次' }
            ], // 平台结算规则类型
            QUARTER_UNIT: [
                { dictionaryKey: 'Q', dictionaryValue: '季度' },
                { dictionaryKey: 'Y', dictionaryValue: '年' },
                { dictionaryKey: 'M', dictionaryValue: '月' }
            ], // 季度单位
            formItem: {
                billType: 'G',
                payType: 'S'
            }
        }
    },
    methods: {
        lookBill(url) {
            // 文件下载公共方法 名字 code
            console.log('下载对账单模板', url)
            if (url.split('~').length !== 2) {
                console.log('缺少下载参数(名或code)', url)
                return
            }
            const name = url.split('~')[0]
            const code = url.split('~')[1]
            aDownLoadFile(name, code)
        },
        querTrans(e) {
            const item = this.QUARTER_UNIT.find(v => v.dictionaryKey === e)
            return item && item.dictionaryValue
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                this.formItem = val
            },
            immediate: true,
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
            &.collr2 {
                height: 84px;
            }
            &.collp0 {
                padding: 0px;
            }
            &.rule_style {
                .collpan {
                    .ivu-input-wrapper {
                        width: 160px;
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
                    }
                }
                .rule_left1 {
                    display: inline-block;
                    text-align: center;
                    height: 41px;
                    width: 10%;
                    background-color: #f5f6f8;
                    border-right: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                }
                .rule_left2 {
                    display: inline-block;
                    text-align: center;
                    height: 42px;
                    width: 10%;
                    background-color: #f5f6f8;
                    border-right: 1px solid #e5e5e5;
                }
                .rule_right1 {
                    display: inline-block;
                    height: 41px;
                    width: 90%;
                    padding-left: 10px;
                    border-bottom: 1px solid #e5e5e5;
                }
                .rule_right2 {
                    display: inline-block;
                    height: 42px;
                    width: 90%;
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>
