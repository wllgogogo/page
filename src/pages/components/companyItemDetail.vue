<template>
  <div style="margin-top:20px">
    <div class="card">
        <!-- 公司名称 公司地址 -->
        <Row>
            <Col span="4" class="gray-bg">
                <span class="need">*</span>公司名称:
            </Col>
            <Col span="4">
                {{ formItem.companyname || "公司名称公司名称公司名称" }}
            </Col>
            <Col span="4" class="gray-bg">
                <span class="need">*</span>公司地址:
            </Col>
            <Col span="12">
                {{ formItem.companyadress || "公司地址公司地址公司地址" }}
            </Col>
        </Row>
        <!-- 统一社会信用代码 -->
        <Row>
            <Col span="4" class="gray-bg">
                <span class="need">*</span>统一社会信用代码:
            </Col>
            <Col span="4">
                {{ formItem.companycode || "Kl45121544566565656" }}
            </Col>
            <Col span="4" class="gray-bg">
                <span class="need">*</span>业务联系人:
            </Col>
            <Col span="4">
                {{ formItem.companypeople || "王五" }}
            </Col>
            <Col span="4" class="gray-bg">
                <span class="need">*</span>电话:
            </Col>
            <Col span="4">
                {{ formItem.companytel || "13452534568" }}
            </Col>
        </Row>
        <!-- 平台结算规则 -->
        <Row align="top">
            <Col span="4" class="gray-bg collr2">
                <span class="need">*</span>平台结算规则:
            </Col>
            <Col span="20" class="rule_style collp0 collr2">
                <!-- 对账期 -->
                <div>
                    <div class="rule_left1">对账期</div>
                    <div class="rule_right1 collpan">
                        <RadioGroup v-model="formItem.duizhang">
                            <Radio disabled :label="e.dictionaryKey" v-for="(e,i) in SETTLEMENT_RULE_TYPE" :key="i">
                                <span>{{e.dictionaryValue}}</span>
                            </Radio>
                        </RadioGroup>
                        <span style="display: inline-block;width: 150px;" v-show="formItem.duizhang == 'G'">
                            {{ formItem.companytelv || "24" }}
                            {{ formItem.fukuans || '美元' }}
                            /次
                        </span>
                        <span style="display: inline-block;width: 150px;" v-show="formItem.duizhang == 'S'">
                            完成后
                            {{ formItem.days || '15' }}
                            天
                        </span>
                        <span class="cargo-item-label" @click="lookBill">
                            查看对账单模板
                        </span>
                    </div>
                </div>
                <!-- 付款期 -->
                <div>
                    <div class="rule_left2">付款期</div>
                    <div class="rule_right2">
                        <RadioGroup v-model="formItem.fukuan">
                            <Radio disabled :label="e.dictionaryKey" v-for="(e,i) in SETTLEMENT_RULE_TYPE" :key="i">
                                <span>{{e.dictionaryValue}}</span>
                            </Radio>
                        </RadioGroup>
                        <span style="display: inline-block;" v-show="formItem.fukuan == 'G'">
                            {{ formItem.companytelg || "34" }}
                            {{ formItem.yuan || '元' }}
                            /次
                        </span>
                        <span style="display: inline-block;" v-show="formItem.fukuan == 'S'">
                            完成后
                            {{ formItem.dayts || '20' }}
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
export default {
    // name: '',
    props: {
        defaultData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            SETTLEMENT_RULE_TYPE: [{ dictionaryKey: 'dd', dictionaryValue: '111' }, { dictionaryKey: 'gg', dictionaryValue: '222' }], //平台结算规则类型
            formItem: {
                fukuan: 'G',
                duizhang: 'S'
            }
        }
    },
    methods: {
        lookBill() {
            console.log('查看对账单模板')
        }
    },
    defaultData: {
        handler(val) {
            this.formItem = JSON.parse(JSON.stringify(val))
            console.log(this.formItem, '企业信息 组件 接收数据')
        },
        // immediate: true,
        deep: true
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
                background-color: #F5F6F8;
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
                    .ivu-input-wrapper{
                        width: 160px;
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
