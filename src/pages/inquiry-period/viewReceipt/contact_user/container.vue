<template>
    <div style="margin-top:20px">
        <Form ref="formCompany" :model="formItem" :rules="ruleformItem" inline>
            <div class="card">
                <!-- 公司名称 公司地址 -->
                <Row>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>公司名称: </Col>
                    <Col span="4" class="collp0">
                        <FormItem prop="etcpName">
                            <Input v-model="formItem.etcpName" :disabled="Disabled" placeholder="请输入"> </Input>
                        </FormItem>
                    </Col>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>公司地址: </Col>
                    <Col span="12" class="collp0">
                        <FormItem prop="etcpAddr">
                            <Input v-model="formItem.etcpAddr" :disabled="Disabled" placeholder="请输入"> </Input>
                        </FormItem>
                    </Col>
                </Row>
                <!-- 统一社会信用代码 -->
                <Row>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>统一社会信用代码: </Col>
                    <Col span="4" class="collp0">
                        <FormItem prop="enterpriseCode">
                            <Input v-model="formItem.enterpriseCode" :disabled="Disabled" placeholder="请输入"> </Input>
                        </FormItem>
                    </Col>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>业务联系人: </Col>
                    <Col span="4" class="collp0">
                        <FormItem prop="businessEr">
                            <Input v-model="formItem.businessEr" :disabled="Disabled" placeholder="请输入"> </Input>
                        </FormItem>
                    </Col>
                    <Col span="4" class="gray-bg"> <span class="need">*</span>电话: </Col>
                    <Col span="4" class="collp0">
                        <FormItem prop="businessTel">
                            <Input v-model="formItem.businessTel" :disabled="Disabled" placeholder="请输入"> </Input>
                        </FormItem>
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
                                    <Radio :label="e.dictionaryKey" :disabled="Disabled" v-for="(e, i) in SETTLEMENT_RULE_TYPE" :key="i">
                                        <span>{{ e.dictionaryValue }}</span>
                                    </Radio>
                                </RadioGroup>
                                <span style="display: inline-block;width: 320px;" v-show="formItem.billType == 'G'">
                                    <Input style="width:150px;vertical-align: middle;" :disabled="Disabled" type="number" v-model="formItem.billNumber" placeholder="请输入"> </Input>
                                    <Select style="width:100px;margin-left:10px" :disabled="Disabled" v-model="formItem.billUnit" clearable>
                                        <Option v-for="item in QUARTER_UNIT" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                    /次
                                </span>
                                <span style="display: inline-block;width: 320px;" v-show="formItem.billType == 'S'">
                                    完成后
                                    <Input style="width:150px;vertical-align: middle;" :disabled="Disabled" type="number" v-model="formItem.billNumber" placeholder="请输入"> </Input>
                                    <Select style="width:100px;margin-left:10px" :disabled="Disabled" v-model="formItem.billUnit" clearable>
                                        <Option v-for="item in TIME_UNIT" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                </span>
                                <Upload
                                    style="display: inline-block"
                                    :disabled="Disabled"
                                    :show-upload-list="false"
                                    :format="['jpg', 'jpeg', 'png']"
                                    :max-size="2048"
                                    :on-success="billSuccess"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :on-error="handleErr"
                                    type="drag"
                                    :action="action"
                                >
                                    <span class="cargo-item-label">
                                        上传对账单模板
                                    </span>
                                </Upload>
                            </div>
                        </div>
                        <!-- 付款期 -->
                        <div>
                            <div class="rule_left2">付款期</div>
                            <div class="rule_right2">
                                <RadioGroup v-model="formItem.payType">
                                    <Radio :label="e.dictionaryKey" :disabled="Disabled" v-for="(e, i) in SETTLEMENT_RULE_TYPE" :key="i">
                                        <span>{{ e.dictionaryValue }}</span>
                                    </Radio>
                                </RadioGroup>
                                <span style="display: inline-block;width: 320px;" v-show="formItem.payType == 'G'">
                                    <Input style="width:150px;vertical-align: middle;" :disabled="Disabled" type="number" v-model.number="formItem.payNumber" placeholder="请输入"> </Input>
                                    <Select style="width:100px;margin-left:10px" :disabled="Disabled" v-model="formItem.payUnit" clearable>
                                        <Option v-for="item in QUARTER_UNIT" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                    /次
                                </span>
                                <span style="display: inline-block;width: 320px;" v-show="formItem.payType == 'S'">
                                    完成后
                                    <Input style="width:150px;vertical-align: middle;" :disabled="Disabled" type="number" v-model.number="formItem.payNumber" placeholder="请输入"> </Input>
                                    <Select style="width:100px;margin-left:10px" :disabled="Disabled" v-model="formItem.payUnit" clearable>
                                        <Option v-for="item in TIME_UNIT" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
</template>

<script>
import { upload as baseUrl } from '@/api/api'
import validateRules from '@/libs/validateRules'
export default {
    // name: '',
    props: {
        Disabled: {
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
            action: `${baseUrl}/file-record/upload`, // 上传
            // SETTLEMENT_RULE_TYPE: this.$getDictionary('SETTLEMENT_RULE_TYPE'), // 平台结算规则类型
            // CURRENCY_CODE: this.$getDictionary('CURRENCY_CODE'), // 币种
            SETTLEMENT_RULE_TYPE: [
                { dictionaryKey: 'G', dictionaryValue: '固定方式' },
                { dictionaryKey: 'S', dictionaryValue: '单次' }
            ], // 平台结算规则类型
            CURRENCY_CODE: [
                { dictionaryKey: 'CNY', dictionaryValue: '元' },
                { dictionaryKey: 'USD', dictionaryValue: '美元' },
                { dictionaryKey: 'EUR', dictionaryValue: '欧元' }
            ], // 币种
            ruleformItem: {
                etcpName: [validateRules.required('公司名称')[0]],
                etcpAddr: [validateRules.required('公司地址')[0]],
                enterpriseCode: [validateRules.required('社会统一信用代码')[0]],
                businessEr: [validateRules.required('业务联系人')[0]],
                businessTel: [validateRules.phone('电话')[0]]
            },
            TIME_UNIT: [
                { dictionaryKey: 'D', dictionaryValue: '天' },
                { dictionaryKey: 'H', dictionaryValue: '小时' }
            ], // 时间单位
            QUARTER_UNIT: [
                { dictionaryKey: 'Q', dictionaryValue: '季度' },
                { dictionaryKey: 'Y', dictionaryValue: '年' },
                { dictionaryKey: 'M', dictionaryValue: '月' }
            ], // 季度单位
            formItem: {
                etcpName: '', // 公司名称
                etcpAddr: '', // 公司地址
                enterpriseCode: '', // 社会统一信用代码
                businessEr: '', // 业务联系人
                businessTel: '', // 业务联系人电话
                billNumber: '', // 对账期数值
                billPath: '', // 对账期模板路径 todo
                billType: 'G', // 对账期类型
                billUnit: '', // 对账期单位
                payUnit: '', // 付款期单位
                payType: 'G', // 付款期类型
                payNumber: '' // 付款期数值
            }
        }
    },
    methods: {
        subForm() {
            this.$refs.formCompany.validate(valid => {
                if (valid) {
                    if (this.parmvalid()) {
                        console.log('验证失败')
                    } else {
                        this.$emit('submit-form', this.formItem)
                    }
                }
            })
        },
        // 检验对账期 付账期
        parmvalid() {
            const bNumber = Number(this.formItem.billNumber)
            const pNumber = Number(this.formItem.payNumber)
            if (!bNumber) {
                this.$Message.warning('请输入对账期数值')
                return true
            }
            if (!this.formItem.billUnit) {
                this.$Message.warning('对账期单位不能为空')
                return true
            }
            if (!pNumber) {
                this.$Message.warning('请输入付款期数值')
                return true
            }
            if (!this.formItem.payUnit) {
                this.$Message.warning('付款期单位不能为空')
                return true
            }
        },
        // 上传格式错误
        handleFormatError() {
            this.$Message.error({
                background: true,
                content: '请上传jpg、jpeg、png格式的文件',
                duration: 3
            })
        },
        // 超过最大尺寸
        handleMaxSize() {
            this.$Message.error({
                background: true,
                content: '上传尺寸最大2048kb'
            })
        },
        // 上传报错
        handleErr() {
            this.$Message.error({
                background: true,
                content: '上传失败'
            })
        },
        billSuccess({ data }) {
            console.log(data, '上传成功 对账单模板 响应')
            // this.formItem.billPath = ''
        }
    }
    // watch:{}
    // defaultData: {
    //     handler(val) {
    //         this.formItem = JSON.parse(JSON.stringify(val))
    //         console.log(this.formItem, '企业信息 编辑')
    //     },
    //     // immediate: true,
    //     deep: true
    // }
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
        }
        .collr2 {
            height: 84px;
        }
        .collp0 {
            padding: 0px;
            .ivu-input-wrapper {
                vertical-align: baseline;
            }
        }
        .collpan {
            .ivu-input-wrapper {
                width: 160px;
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
            }
        }
        .rule_style {
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
</style>
