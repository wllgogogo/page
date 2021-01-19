<template>
    <div>
        <div v-for="(formItem, index) in cargoList" :key="index" class="cargo-item">
            <div class="cargo-info">
                <div class="title" @click="onOpen(formItem)">
                    <div class="name">00{{ index + 1 }}货物信息</div>
                    <span class="icon">
                        <Icon v-if="formItem.isShow" type="ios-arrow-down" />
                        <Icon v-else type="ios-arrow-up" />
                    </span>
                </div>
                <Form :model="formItem" :label-width="160" label-colon>
                    <div v-show="formItem.isShow" class="public-form-card">
                        <Row>
                            <Col span="12">
                                <FormItem label="货物名称">
                                    {{ formItem.cargoName }}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装类型">
                                    {{ formItem.firstPackageType && formItem.firstPackageTypeTranslate }}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="HS编码">
                                    {{ formItem.hsCode }}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装毛重"> {{ formItem.firstGrossWeight }} kg </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="毛重"> {{ formItem.grossWeight }} kg </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装净重"> {{ formItem.firstNetWeight }} kg </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物件数">
                                    {{ formItem.cargoQty }}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装件数">
                                    {{ formItem.firstPackQty }}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物体积"> {{ formItem.cargoVol }} m³ </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装体积"> {{ formItem.firstPackVol }} m³ </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物类型">
                                    {{ formItem.cargoType && formItem.cargoTypeTranslate }}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物适宜温度">
                                    {{ formItem.assignTemperature && '指定温度' }}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="formItem.assignTemperature">
                            <Col span="12">
                                <FormItem label="指定温度"> {{ formItem.assignTemperature }} {{ formItem.temperatureUnitTranslate }} </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        defaultData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            cargoList: [{}] // 存放所有的货物信息
        }
    },
    methods: {
        onOpen(formItem) {
            if (formItem.isShow) {
                this.$set(formItem, 'isShow', false)
            } else {
                this.$set(formItem, 'isShow', true)
            }
        },
        transParms(resDataArr = []) {
            // 字段转换
            const reqArr = []
            resDataArr.forEach(item => {
                const reqItem = {
                    cargoName: item.cargoName,
                    firstPackageType: item.cargoName,
                    firstPackageTypeTranslate: item.cargoName,
                    firstGrossWeight: item.cargoName,
                    hsCode: item.cargoName,
                    firstNetWeight: item.cargoName,
                    grossWeight: item.cargoName,
                    firstPackQty: item.cargoName,
                    netWeight: item.cargoName,
                    firstPackVol: item.cargoName,
                    cargoQty: item.cargoName,
                    cargoVol: item.cargoName,
                    cargoType: item.cargoName,
                    cargoTypeTranslate: item.cargoName,
                    suitableTemperature: item.cargoName,
                    assignTemperature: item.cargoName
                }
                reqArr.push(reqItem)
            })
            return reqArr
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                if (val.length >= 1) {
                    this.cargoList = val
                }
            },
            deep: true, // true 深度监听
            immediate: true // 首次触发
        }
    }
}
</script>

<style lang="scss" scoped>
.btns-group {
    /deep/ .ivu-btn {
        display: inline-block;
        &:first-child {
            margin-right: 20px;
        }
        & > span {
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/ .ivu-icon,
            /deep/ svg {
                margin-left: 6px;
                font-size: 16px;
                color: $conventional-font-color;
            }
        }
    }
}
.cargo-item {
    display: flex;
    margin-top: 20px;
    /deep/ .ivu-form-item-content {
        // width: 20px;
        text-align: center;
    }
    .cargo-info {
        flex-grow: 1;
        background-color: #fff;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 20px;
            background-color: #f5f6f8;
            .ivu-icon {
                font-size: 20px;
                cursor: pointer;
            }
        }
        .public-form-card {
            padding: 20px 0 0 0;
        }
    }
}
</style>
