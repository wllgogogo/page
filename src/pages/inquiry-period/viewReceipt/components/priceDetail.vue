<template>
    <div>
        <div class="card-title">费用信息</div>
        <div class="card">
            <Row>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>计价箱型箱量：</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>集装箱类型：</Col>
                <Col span="6">{{ formItem.contaType }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>集装箱数量：</Col>
                <Col span="6">{{ formItem.contaQty }}</Col>

                <Col class="gray-bg" span="4"><span class="required-tag">*</span>计价免箱期：</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>启运港免箱期：</Col>
                <Col span="6">{{ formItem.departureFreePeriod }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>目的港免箱期：</Col>
                <Col span="6">{{ formItem.destinationFreePeriod }}</Col>

                <Col class="gray-bg" span="4" style="height: 64px;line-height: 64px;"><span
                    class="required-tag">*</span>计价免堆期：
                </Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>启运港免堆期：</Col>
                <Col span="6">{{ formItem.departureFreeStorage }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>目的港免堆期：</Col>
                <Col span="6">{{ formItem.destinationFreeStorage }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>冻箱免费插电期：</Col>
                <Col span="6">{{ formItem.contaPlugPeriod }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>联系人电话：</Col>
                <Col span="6">{{ formItem.contaQty }}</Col>
            </Row>
            <Row>
                <Col class="gray-bg" span="4" style="height: 128px; line-height: 128px;"><span
                    class="required-tag">*</span>计价额外服务项：
                </Col>
                <Col span="20" style="height: 128px; line-height: 128px;">
                    <div class="label-box flex-wrap">
                        <Button class="button-active" size="small"
                                v-for="(item,index) in formItem.addiServerList"
                                :key="index" style="margin-right: 10px">
                            {{ item.serverName }}
                            <Icon @click="delButton(0,index)" type="ios-close"
                                  style="position: absolute;right: 5px;top: 5px"/>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col class="gray-bg" span="4" style="height: 64px;line-height: 64px;"><span
                    class="required-tag">*</span>计费固定条目：
                </Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>运费：</Col>
                <Col span="6">{{ formItem.trspFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>运杂费：</Col>
                <Col span="6">{{ formItem.trspOtherFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>代收费：</Col>
                <Col span="6">{{ formItem.collectFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>附加费：</Col>
                <Col span="6">{{ formItem.addiFee }}</Col>
            </Row>
            <Row>
                <Col class="gray-bg" span="4" style="height: 64px;line-height: 64px;"><span
                    class="required-tag">*</span>计费可能条目：
                </Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>超期费：</Col>
                <Col span="6">{{ formItem.overdFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>更改费：</Col>
                <Col span="6">{{ formItem.changeFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>延误费：</Col>
                <Col span="6">{{ formItem.delayFee }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>取消费：</Col>
                <Col span="6">{{ formItem.cancelFee }}</Col>
            </Row>
            <Row>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>报价有效期：</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>固定航次：</Col>
                <Col span="6">{{ formItem.fixedMeans }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>固定时间：</Col>
                <Col span="6">{{ formItem.fixedTime }}</Col>
            </Row>
        </div>

        <div class="card">
            <Row>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>订舱有效期：</Col>
                <Col span="20">{{ formItem.bookingPeriod }}</Col>
            </Row>
        </div>
        <div class="card">
            <Row>
                <Col class="gray-bg" span="4" style="height: 64px; line-height: 64px;">备注：</Col>
                <Col span="20" style="height: 64px; line-height: 64px;">{{ formItem.remark }}</Col>
            </Row>
        </div>

        <companyItemDetail :defaultData="companyData" />
    </div>
</template>

<script>
export default {
    props: {
        defaultData: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        companyItemDetail: () => import('./companyDetail.vue')
    },
    watch: {
        defaultData: {
            handler(val) {
                const Data = JSON.parse(JSON.stringify(val)) // 拷贝一份父组件传递的数据
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
                this.formItem = {
                    ...val
                }
            },
            deep: true
        }
    },
    data () {
        return {
            formItem: {},
            companyData: {} // 企业信息
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    border: 0;

    td {
        position: relative;
        padding-left: 20px;
    }

    .required-tag {
        position: inherit;
        margin-right: -6px;
    }

    .ivu-input-wrapper, .ivu-select {
        width: 160px;
        margin-top: -2px;
    }

    .ivu-form-item {
        margin: 0;
    }

    .gray-bg {
        padding: 0 20px 0 0;
        text-align: right;
        background-color: #F5F6F8;
    }

}

.table-schedule {
    width: 100%;
    border-collapse: collapse;
    border: 0;
    margin-top: 40px;

    td {
        position: relative;
        text-align: center;
    }

    .required-tag {
        position: inherit;
        margin-right: -6px;
    }

    .ivu-input-wrapper, .ivu-select {
        width: 160px;
        margin-top: -2px;
    }

    .ivu-form-item {
        margin: 0;
    }

    .gray-bg {
        text-align: center;
        background-color: #F5F6F8;
    }

}

.card {
    margin: 40px 0;

    .ivu-row {
        border-left: 1px solid #e5e5e5;

        &:first-of-type {
            border-top: 1px solid #e5e5e5;
        }

        .ivu-col {
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;

            &.gray-bg {
                padding: 0 20px 0 0;
                text-align: right;
                background-color: #F5F6F8;
            }

            &.have-unit {
                display: flex;

                /deep/ .ivu-form-item {
                    & + .ivu-form-item {
                        margin-left: 6px;
                    }

                    .ivu-input-wrapper {
                        width: 100px;
                    }

                    .ivu-select {
                        width: 80px;
                    }
                }
            }

            .required-tag {
                position: inherit;
                margin-right: -6px;
            }

            .ivu-form-item {
                margin: 0;
            }

            .ivu-input-wrapper, .ivu-select {
                width: 160px;
                margin-top: -2px;
            }

            /deep/ .ivu-cascader-rel {
                width: 160px;
                margin-top: 3px;
            }

            .work-time {
                .weeks {
                    pointer-events: all;
                    display: inline-block;
                    margin-top: -2px;
                    border-bottom: 1px solid $border-color;

                    /deep/ .ivu-btn {
                        min-width: 60px;

                        & + .ivu-btn {
                            margin-left: 10px;
                        }
                    }
                }

                /deep/ .ivu-date-picker {
                    width: 160px;
                }
            }

            .prev-day {
                display: flex;
                align-items: center;

                .ivu-input-wrapper {
                    width: 90px;
                    margin: -4px 10px 0 10px;
                }
            }
        }
    }
}

.is-check {
    pointer-events: none;
}

.label-box {
    margin-top: 20px;
}

.error-tips {
    color: #ff001b;
    margin-left: 20px;
}

.button-active {
    position: relative;
    border: 1px solid #02ADB5;
    background-color: #E8EFF5;
    color: #333333;
    padding: 0 30px;
}

.button-box {
    padding: 20px 0;
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px dashed #DCDCDC;
    text-align: right;

    button {
        margin-left: 20px;
    }
}

/deep/ .ivu-form-item-error-tip {
    display: none;
}

/deep/ .ivu-select-single .ivu-select-selection {
    height: 24px;
}

/deep/ .ivu-cascader .ivu-input {
    height: 24px;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    line-height: 24px;
}

/deep/ .ivu-input-wrapper {
    margin-right: 8px;
}

/deep/ .radio .ivu-radio-wrapper {
    margin-right: 80px;
}

/deep/ .form-show-err .ivu-form-item-error-tip {
    display: block;
    left: 160px;
    top: 4px;
}
</style>
