<template>
    <div>
        <div class="card">
            <Row>
                <Col class="gray-bg" span="4" style="height: 160px; line-height: 160px;"><span
                    class="required-tag">*</span>合适运输工具：
                </Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>接货时间：</Col>
                <Col span="6">{{ formItem.pickGoodsTime }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>接货地点：</Col>
                <Col span="6">{{ formItem.pickGoodsAddr }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>启运时间：</Col>
                <Col span="6">{{ formItem.departureDatetime }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>运输工具号：</Col>
                <Col span="6">{{ formItem.departureDatetime }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>航次：</Col>
                <Col span="6">{{ formItem.meansNum }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>运抵时间：</Col>
                <Col span="6">{{ formItem.shipDatetime }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>联系人：</Col>
                <Col span="6">{{ formItem.contactEr }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>联系电话：</Col>
                <Col span="6">{{ formItem.contactTel }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>提货时间：</Col>
                <Col span="6">{{ formItem.takeCargoTime }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>提货地点：</Col>
                <Col span="6">{{ formItem.takeCargoAddr }}</Col>
            </Row>
            <Row>
                <Col class="gray-bg" span="4" style="height: 160px; line-height: 160px;"><span
                    class="required-tag">*</span>服务水平：
                </Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>直达/中转：</Col>
                <Col span="6">{{ formItem.hasTransfer }}</Col>
                <Col class="gray-bg" span="4"><span class="required-tag">*</span>整箱/拼箱：</Col>
                <Col span="6">{{ formItem.hasLcl }}</Col>
                <Col class="gray-bg" span="4" style="height: 128px; line-height: 128px;"><span
                    class="required-tag">*</span>固定/附加服务：
                </Col>
                <Col span="16" style="height: 128px; line-height: 128px;">
                    <div class="label-box flex-wrap">
                        <Button class="button-active" size="small"
                                v-for="(item,index) in formItem.receiptServerList"
                                :key="index" style="margin-right: 10px">
                            {{ item.serverName }}
                            <Icon @click="delButton(1,index)" type="ios-close"
                                  style="position: absolute;right: 5px;top: 5px"/>
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>

        <div class="card-title">班期信息</div>
        <table class="table-schedule" border="1">
            <template v-for="(item,index) in formItem.receiptScheduleList">
                <tr>
                    <td class="gray-bg" style="width: 50px;">序号</td>
                    <td class="gray-bg" rowspan="4" style="width: 140px"><span class="required-tag">*</span>服务时间周期
                    </td>
                    <td class="gray-bg" style="width: 102px">停靠时间</td>
                    <td style="width: 190px">{{ item.stopTheTime }}</td>
                    <td class="gray-bg" style="width: 130px">运输工具号</td>
                    <td class="gray-bg" style="width: 130px">航次</td>
                    <td class="gray-bg" style="width: 130px">运输失效</td>
                    <td class="gray-bg" rowspan="4" style="width: 140px"><span class="required-tag">*</span>截止时间：
                    </td>
                    <td class="gray-bg" style="width: 102px">截关时间</td>
                    <td style="width: 190px">{{ item.letDeclareDatetime }}</td>
                </tr>
                <tr>
                    <td rowspan="3">{{ index + 1 }}</td>
                    <td class="gray-bg" style="width: 102px">接货时间</td>
                    <td style="width: 192px">{{ item.jhsj2 }}</td>
                    <td rowspan="3">{{ item.trspCode }}</td>
                    <td rowspan="3">{{ item.meansNum }}</td>
                    <td rowspan="3">{{ item.transportTime }}</td>
                    <td class="gray-bg" style="width: 102px">截港时间</td>
                    <td style="width: 102px">{{ item.letApproachDatetime }}</td>
                </tr>
                <tr>
                    <td class="gray-bg" style="width: 102px">驶离时间</td>
                    <td style="width: 192px">{{ item.departureDatetime }}</td>
                    <td class="gray-bg" style="width: 102px">截单时间</td>
                    <td style="width: 102px">{{ item.letBillDatetime }}</td>
                </tr>
                <tr>
                    <td class="gray-bg" style="width: 102px">运抵时间</td>
                    <td style="width: 192px">{{ item.shipDatetime }}</td>
                    <td class="gray-bg" style="width: 102px">截VGM时间</td>
                    <td style="width: 102px">{{ item.letPassDatetime }}</td>
                </tr>
            </template>
        </table>
        <div class="card">
            <Row>
                <Col class="gray-bg" span="4" style="height: 64px; line-height: 64px;">备注：</Col>
                <Col span="20" style="height: 64px; line-height: 64px;">{{ formItem.remark }}</Col>
            </Row>
        </div>

        <companyItemDetail :defaultData="companyData"/>
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
            handler (val) {
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
