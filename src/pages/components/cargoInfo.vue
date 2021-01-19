<template>
    <div>
        <div class="btns-group">
            <Button @click="addCargoInfo">
                添加货物信息
                <svg class="iconfont">
                    <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                </svg>
            </Button>
            <Button @click="delCargoInfo">
                删除
                <svg class="iconfont">
                    <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                </svg>
            </Button>
        </div>
        <div v-for="(formItem, index) in cargoList" :key="index" class="cargo-item">
            <Checkbox v-model="formItem.checked" />
            <div class="cargo-info">
                <div class="title" @click="onOpen(formItem)">
                    <div class="name">00{{ index + 1 }}货物信息</div>
                    <span class="icon">
                        <Icon v-if="formItem.isShow" type="ios-arrow-down" />
                        <Icon v-else type="ios-arrow-up" />
                    </span>
                </div>
                <Form :model="formItem" :rules="ruleValidate" :ref="`formItemData_${index}`" :label-width="160" label-colon>
                    <div v-show="formItem.isShow" class="public-form-card">
                        <Row>
                            <Col span="12">
                                <FormItem label="货物名称" prop="cargoName">
                                    <Select v-model="formItem.cargoName" filterable label-in-value placeholder="请输入货物关键字搜索" @on-change="changeCargoName" :remote-method="remoteMethod1" :loading="loading">
                                        <Option v-for="(item, idx) in nameList" :tag="index" :value="item.cargoName" :key="idx">{{ item.cargoName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装类型" prop="packType">
                                    <Select v-model="formItem.packType" clearable>
                                        <Option v-for="item in packageType" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="HS编码" prop="hscode">
                                    <Input v-model.number="formItem.hscode" disabled> </Input>
                                    <!-- <Select v-model="formItem.hscode" filterable label-in-value placeholder="请输入HS关键字搜索" @on-change="changeHsCode" :remote-method="remoteMethod2" :loading="loading">
                                        <Option v-for="(item, idx) in hsList" :tag="index" :value="item.hsId" :key="idx">{{ item.hscode }}</Option>
                                    </Select> -->
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装毛重" prop="packGrossWeight">
                                    <Input v-model.number="formItem.packGrossWeight">
                                        <span slot="append">kg</span>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="毛重" prop="grossWeight">
                                    <Input v-model.number="formItem.grossWeight">
                                        <span slot="append">kg</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装净重" prop="packNetWeight">
                                    <Input v-model.number="formItem.packNetWeight">
                                        <span slot="append">kg</span>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物件数" prop="cargoQty">
                                    <Input v-model.number="formItem.cargoQty"> </Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装件数" prop="packQty">
                                    <Input v-model.number="formItem.packQty"> </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物体积">
                                    <Input v-model.number="formItem.cargoVol">
                                        <span slot="append">m³</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="一级包装体积" prop="packVol">
                                    <Input v-model.number="formItem.packVol">
                                        <span slot="append">m³</span>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物类型">
                                    <Select v-model="formItem.cargoType" clearable>
                                        <Option v-for="item in goodsType" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="货物适宜温度">
                                    <Select v-model="formItem.suitableTemperature" clearable>
                                        <Option v-for="item in suitableTemperatureList" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                            {{ item.dictionaryValue }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="formItem.suitableTemperature == 'assign'">
                            <Col span="12">
                                <FormItem label="指定温度">
                                    <Input v-model.number="formItem.assignTemperature">
                                        <Select slot="append" v-model="formItem.temperatureUnit" style="width:80px">
                                            <Option v-for="item in temperatureUnitList" :value="item.dictionaryKey" :key="item.dictionaryKey">{{ item.dictionaryValue }}</Option>
                                        </Select>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import validateRules from '@/libs/validateRules'
import { apiShcodeDetailList } from '@/api/shCode'
export default {
    props: {
        defaultData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // 货物名称 供选择
            nameList: [],
            hsList: [],
            loading: false,
            cargoListName: [],
            temperatureUnitList: [
                { dictionaryKey: 'C', dictionaryValue: '°C' },
                { dictionaryKey: 'F', dictionaryValue: '°F' }
            ], // this.$getDictionary('TEMPERATURE_UNIT'), // 温度单位
            goodsType: [
                { dictionaryKey: 'G', dictionaryValue: '普货' },
                { dictionaryKey: 'C', dictionaryValue: '恒温货' }
            ], // this.$getDictionary('GOODS_TYPE'), // 货物类型
            packageType: [
                { dictionaryKey: 'G', dictionaryValue: '普货' },
                { dictionaryKey: 'C', dictionaryValue: '恒温货' }
            ], // this.$getDictionary('PACKAGE_TYPE'), // 包装类型
            // 货物适宜温度
            suitableTemperatureList: [
                {
                    dictionaryKey: 'assign',
                    dictionaryValue: '指定温度'
                }
            ],
            cargoList: [
                {
                    isShow: false,
                    assignTemperature: '',
                    // cargoCode: '',
                    cargoName: '',
                    cargoQty: null,
                    cargoType: '',
                    cargoVol: null,
                    grossWeight: '',
                    hscode: '',
                    // inquiryPlanCode: '',
                    // marksCode: '',
                    // mkblNo: '',
                    packGrossWeight: null,
                    packQty: null,
                    packSpecialRequest: '',
                    packType: '',
                    packNetWeight: null,
                    packVol: null,
                    suitableTemperature: '',
                    temperatureUnit: '',
                    volUnit: 'm³',
                    weightUnit: 'kg'
                }
            ], // 存放所有的货物信息
            ruleValidate: {
                cargoName: [validateRules.select('货物名称')[0]],
                hscode: [validateRules.required('HS编码')[0]],
                grossWeight: [validateRules.requiredNumber('毛重')[0]],
                cargoQty: [validateRules.requiredNumber('货物件数')[0]],
                packType: [validateRules.select('一级包装类型')[0]],
                packGrossWeight: [validateRules.requiredNumber('一级包装毛重')[0]],
                packNetWeight: [validateRules.requiredNumber('一级包装净重')[0]],
                packQty: [validateRules.requiredNumber('一级包装件数')[0]],
                packVol: [validateRules.requiredNumber('一级包装体积')[0]]
            }
        }
    },
    methods: {
        remoteMethod1(query) {
            if (query !== '') {
                if (this.loading === false) {
                    this.loading = true
                    setTimeout(() => {
                        const data = {
                            cargoName: query,
                            page: 1,
                            size: 10
                        }
                        apiShcodeDetailList({ data }).then(({ data }) => {
                            if (data) {
                                this.nameList = data.content
                            } else {
                                this.nameList = []
                            }
                            this.loading = false
                        })
                        // this.nameList = list.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 1000)
                }
            } else {
                this.nameList = []
            }
        },
        remoteMethod2(query) {
            if (query !== '') {
                if (this.loading === false) {
                    this.loading = true
                    setTimeout(() => {
                        const data = {
                            hsCode: query,
                            page: 1,
                            size: 10
                        }
                        apiShcodeDetailList({ data }).then(({ data }) => {
                            if (data) {
                                this.hsList = data.content
                                // this.hsPage = data.number+1;
                            } else {
                                this.hsList = []
                            }
                            this.loading = false
                        })
                        // this.hsList = list.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 1000)
                }
            } else {
                this.hsList = []
            }
        },
        submitForm() {
            let allValid = true
            for (let i = 0; i < this.cargoList.length; i++) {
                this.$refs[`formItemData_${i}`][0].validate(valid => {
                    if (!valid) {
                        allValid = false
                        // 展开校验未通过的货物信息
                        this.cargoList[i].isShow = true
                    }
                })
            }
            // 至少添加一个货物信息
            if (!this.cargoList.length) {
                this.$Message.warning('请至少添加一个货物')
                return
            }
            if (allValid) {
                this.$emit('submit-form', this.cargoList)
            } else {
                this.$Message.warning('货物信息还有必填项没有填写')
                this.$emit('submit-form', [])
            }
        },
        addCargoInfo() {
            if (this.cargoList.length >= 5) {
                this.$Message.warning('货物最多五个')
                return
            }
            let s = ''
            if (this.cargoList[0]) {
                s = this.cargoList[0].cargoType
            }
            // hscode: ''
            // inquiryPlanCode: ''
            // cargoCode: ''
            // packSpecialRequest: ''
            // marksCode: ""
            // mkblNo: ""
            this.cargoList.push({ isShow: true, cargoType: s, volUnit: 'm³', weightUnit: 'kg' })
        },
        delCargoInfo() {
            const len = this.cargoList.length
            let delBool = true
            for (let i = 0; i < len; i++) {
                if (this.cargoList[i].checked && len !== 1) {
                    delBool = false
                    this.cargoList.splice(i, 1)
                    i--
                }
                if (len === 1 && this.cargoList[i].checked) {
                    delBool = false
                    this.$Message.warning('至少有一个货物')
                }
            }
            if (delBool) {
                this.$Message.warning('请选择货物')
            }
        },
        onOpen(formItem) {
            if (formItem.isShow) {
                this.$set(formItem, 'isShow', false)
            } else {
                this.$set(formItem, 'isShow', true)
            }
        },
        // 选择名称后直接赋值
        changeCargoName(item) {
            // console.log(item,this.nameList);
            const data = this.nameList.find(e => e.cargoName === item.value)
            this.chooseInfo(this.cargoList[item.tag], data)
        },
        // 选择hs后直接赋值
        changeHsCode(item) {
            const data = this.hsList.find(e => e.cargoName === item.value)
            this.chooseInfo(this.cargoList[item.tag], data)
        },
        chooseInfo(formItem, data) {
            formItem.hscode = data.hsCode
            formItem.cargoType = data.cargoType
            formItem.suitableTemperature = data.hghtTemperature && 'assign'
            formItem.assignTemperature = data.hghtTemperature
            formItem.temperatureUnit = data.temperatureUnit
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                if (val.length >= 1) {
                    this.cargoList = val
                    console.log(val, 'valvalval')
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
    /deep/ .ivu-checkbox-wrapper {
        width: 20px;
        margin-top: 10px;
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
