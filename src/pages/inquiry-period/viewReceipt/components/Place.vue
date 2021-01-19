<template>
    <div>
        <div class="card">
            <!-- 场所类别 -->
            <Row>
                <Col span="5" class="gray-bg"> <span class="need">*</span>场所类别: </Col>
                <Col span="19">
                    <CheckboxGroup v-model="formItem.stationType">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in GEN_STATION_TYPE" :key="i">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
            <!-- 运输类型 -->
            <Row>
                <Col span="5" class="gray-bg"> <span class="need">*</span>运输类型: </Col>
                <Col span="5">
                    <CheckboxGroup v-model="formItem.trspType">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in TRANSPORT_TYPE" :key="i">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col span="4" class="gray-bg"> <span class="need">*</span>货物类型: </Col>
                <Col span="10">
                    <Checkbox :disabled="Disabled" v-model="formItem.cargoType.G">普货</Checkbox>
                    <Radio :disabled="Disabled" v-model="formItem.cargoType.G">(不控温相关免责条款)</Radio>
                    <Checkbox :disabled="Disabled" v-model="formItem.cargoType.C">恒温货</Checkbox>
                    <Radio :disabled="Disabled" v-model="formItem.cargoType.C">(温度设定相关免责条款)</Radio>
                </Col>
            </Row>
            <!-- 场所位置 -->
            <Row>
                <Col span="5" class="gray-bg collr1"> <span class="need">*</span>场所位置: </Col>
                <Col span="19" class="collpan collr1">
                    <div class="cargo-main-input">
                        <!-- <adt-city-selector :defaultData="formInline.selectCity" labelName="请选择城市" @on-change="changeSelectCity" style="display: inline-block;" /> -->
                        <Select style="width: auto;margin-left: 5px;" :disabled="Disabled" @on-change="changeStationAddr" v-model="formInline.destinationSite" placeholder="请选择场所" clearable>
                            <Option v-for="(option, index) in selcectPlaceList" :key="index" :value="option.value">
                                {{ option.label }}
                            </Option>
                        </Select>
                        <Input style="margin-left: 10px;width:250px" :disabled="Disabled" v-model="formItem.stationAddrDetail" placeholder="请输入场所详细位置"> </Input>
                    </div>
                </Col>
            </Row>
            <!-- 服务/报价 -->
            <Row class="rowauto">
                <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>服务/报价: </Col>
                <Col span="19" class="collpan colauto">
                    <div class="cargo-main-input">
                        <Input v-model="servePrice" :disabled="Disabled" placeholder="请输入服务项内容"> </Input>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="add()">添加</Button>
                    </div>
                    <div class="cargo-item-row" v-for="(e, idx) in formItem.receiptServerList" :key="idx">
                        <span class="cargo-item-label">
                            {{ e.serverName }}
                            <svg class="iconfont" @click="del(idx)">
                                <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                            </svg>
                        </span>
                        <Input :disabled="Disabled" v-model.number="e.serverNumber"> </Input>
                        <Select style="width:80px;margin-left:10px" :disabled="Disabled" v-model="e.serverCurr" clearable>
                            <Option v-for="item in CURRENCY_CODE" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                {{ item.dictionaryValue }}
                            </Option>
                        </Select>
                        <Select style="width:100px;margin-left:10px" :disabled="Disabled" v-model="e.serverUnit" clearable>
                            <Option v-for="item in TRANSPORT_TYPE" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                {{ item.dictionaryValue }}
                            </Option>
                        </Select>
                    </div>
                </Col>
            </Row>
            <!-- 作业时间范围 -->
            <Row>
                <Col span="5" class="gray-bg collr3"> <span class="need">*</span>作业时间范围: </Col>
                <Col span="19" class="collpan collr3">
                    <span @click="checkTime(e, i)" :class="{ 'cargo-item-date': e.check, uncheck: !e.check }" v-for="(e, i) in dateList" :key="i">{{ e.name }}</span>
                    <div class="cargo-main-input">
                        <TimePicker style="width: auto" @on-change="timeUpdata" :disabled="Disabled" ref="timerange" format="HH:mm:ss" :value="workTime" type="timerange" placeholder="上下班时间"> </TimePicker>
                    </div>
                </Col>
            </Row>
        </div>
        <companyItem :Disabled="Disabled" ref="companyItem" @submit-form="submitCompany" />
    </div>
</template>

<script>
import { _handelDir } from '@/libs/utils'
export default {
    // 场所回执模板
    name: 'PlaceTemplate',
    components: {
        companyItem: () => import('./company.vue')
    },
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
            // GEN_STATION_TYPE: this.$getDictionary('GEN_STATION_TYPE'), // 普通场所类别
            // TRANSPORT_TYPE: this.$getDictionary('TRANSPORT_TYPE'), // 运输类型
            // CURRENCY_CODE: this.$getDictionary('CURRENCY_CODE'), // 币种
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
            dateList: [
                { name: '周一', check: false },
                { name: '周二', check: false },
                { name: '周三', check: false },
                { name: '周四', check: false },
                { name: '周五', check: false },
                { name: '周六', check: false },
                { name: '周日', check: false }
            ], // 星期
            workTime: ['', ''], // 上下班时间
            servePrice: '', // 服务报价 输入框
            formInline: {
                selectCity: '',
                destinationSite: ''
            }, // 城市
            selcectPlaceList: [], // 场所选择数据
            lastClickTime: 0, // 上一次点击时间的下标
            formItem: {
                inquiryPlanCode: 'IP202012281800493410', // 邮件带过来
                mkblNo: '446c467875bf44ba84402516270469a2', // 邮件带过来
                // receiptId: '',
                receiptPeriodList: [
                    // {
                    //     cycle: '',
                    //     inquiryPlanCode: '',
                    //     mkblNo: '',
                    //     receiptId: '',
                    //     workCode: '',
                    //     workOff: '',
                    //     workShift: ''
                    // }
                ], // 上下班周期
                receiptServerList: [
                    // {
                    //     // inquiryPlanCode: '',
                    //     // mkblNo: '',
                    //     // receiptId: '',
                    //     // serverCode: '',
                    //     serverCurr: '',
                    //     serverName: 'dddd',
                    //     serverNumber: null,
                    //     serverUnit: ''
                    // }
                ], // 服务列表
                stationAddrDetail: '', // '' 场所详细地址
                stationAddr: 'fffff', // req [] => ';' 场所编码
                cargoType: {
                    G: false,
                    C: false
                }, // req JSON 货物类型
                stationType: [], // req [] => ';' 场所类别
                trspType: [] // req [] => ';' 运输类型
            },
            search: {
                inquiryPlanCode: this.$route.query.inquiryPlanCode || 'IP202012281800493410', // 'IP202012281800493410', // 询期询价编号 不能为空
                inquiryType: this.$route.query.inquiryType || 'OT', // 询期询价类型 不能为空
                mkblNo: this.$route.query.mkblNo || '446c467875bf44ba84402516270469a2', // '446c467875bf44ba84402516270469a2', // 制单号 // 不能为空
                serviceType: this.$route.query.serviceType || 'AC' // 询期询价服务类型 不能为空 AC BC(普通 综保报关) AY BY(普通 综保场所)
            }, // 当前回执的 询期询价编号 创建时间 货物类型
            scData: {} // 父组件数据
        }
    },
    methods: {
        // 选择城市
        async changeSelectCity(value) {
            // 赋值场所编码 this.formItem.stationAddr
            this.formItem.stationAddr = value.value.join(';')
            this.formInline.selectCity = value.value.join('~')
            console.log(this.formItem.stationAddr, value, 'city')
            if (value.value.length === 0) return
            this.selcectPlaceList = await _handelDir(value.value, false)
            console.log(this.selcectPlaceList, 'guanqu')
        },
        changeStationAddr(value) {
            console.log(value, '关区场所编码', this.formItem.stationAddr)
            this.formItem.stationAddr = this.formItem.stationAddr + ';' + value
        },
        // 时间变化的保存
        timeUpdata(value) {
            console.log(value, this.lastClickTime, '时间变化')
            this.dateList[this.lastClickTime].time = value.join(';')
        },
        checkTime(e, i) {
            e.check = !e.check
            this.lastClickTime = i // 纪录当前时间
            if (e.time) {
                this.workTime = e.time.split(';')
                console.log('时间赋值', e.time)
            } else {
                this.workTime = ['', '']
            }
        },
        subForm() {
            if (this.parmvalid()) {
                return
            }
            this.$refs.companyItem.subForm()
        },
        parmvalid() {
            // 检验上班时间 周期
            if (this.formItem.stationType.length === 0) {
                this.$Message.warning('请选择场所类别')
                return true
            }
            if (this.formItem.trspType.length === 0) {
                this.$Message.warning('请选择运输类型')
                return true
            }
            if (this.formItem.cargoType.G === false && this.formItem.cargoType.C === false) {
                this.$Message.warning('请选择货物类型')
                return true
            }
            if (this.formItem.stationAddr === '') {
                this.$Message.warning('请选择场所')
                return true
            }
            if (this.formItem.stationAddrDetail.trimRight() === '') {
                this.$Message.warning('请输入场所详细地址')
                return true
            }
            if (this.formItem.receiptServerList.length === 0) {
                this.$Message.warning('请至少输入一个服务')
                return true
            }
            const serveBool = this.formItem.receiptServerList.every((item, idx) => {
                if (item.serverNumber === '' || item.serverNumber === 0 || item.serverNumber === null) {
                    this.$Message.warning(`请输入服务${idx + 1}的价格`)
                    return false
                }
                if (item.serverCurr === '' || item.serverCurr === undefined) {
                    this.$Message.warning(`请输入服务${idx + 1}的货币单位`)
                    return false
                }
                if (item.serverUnit === '' || item.serverUnit === undefined) {
                    this.$Message.warning(`请输入服务${idx + 1}的货物类型`)
                    return false
                }
                return true
            })
            if (!serveBool) {
                return true
            }
            let timeBool = true
            const arr = []
            this.dateList.forEach(e => {
                if (e.check) {
                    // eslint-disable-next-line no-unused-vars
                    timeBool = false
                    let time = e.time
                    if (!time) {
                        time = '00:00:00;00:00:00'
                    }
                    arr.push({
                        cycle: e.name,
                        // inquiryPlanCode: '',
                        // mkblNo: '',
                        // receiptId: '',
                        // workCode: '',
                        workOff: time.split(';')[0],
                        workShift: time.split(';')[1]
                    })
                }
            })
            if (timeBool) {
                this.$Message.warning('请选择周期')
                return true
            }
            if (this.$refs.timerange.visualValue === '') {
                this.$Message.warning('请选择上下班时间')
                return true
            } else {
                // const time = this.$refs.timerange.visualValue.split(' - ')
                // // 上下班时间赋值
                // arr.forEach(e => {
                //     e.workShift = time[0]
                //     e.workOff = time[1]
                // })
                this.formItem.receiptPeriodList = arr
            }
            return false
        },
        // 公司信息 提交
        submitCompany(formItem) {
            const TempData = JSON.parse(JSON.stringify(this.formItem))
            // TempData.cargoType = JSON.stringify(TempData.cargoType) // {G:true,C:true} => 'G;C' 货物类型
            let cargoTypeStr = ''
            for (const key in TempData.cargoType) {
                if (TempData.cargoType[key]) {
                    cargoTypeStr += cargoTypeStr ? ';' + key : key
                }
            }
            TempData.cargoType = cargoTypeStr // 'G;C' 货物类型
            TempData.stationType = TempData.stationType.join(';') // [] => ';' 场所类别
            TempData.trspType = TempData.trspType.join(';') // [] => ';' 运输类型
            for (const key in formItem) {
                if (formItem[key]) {
                    TempData[key] = formItem[key]
                }
            }
            for (const key in this.search) {
                if (this.search[key]) {
                    TempData[key] = this.search[key]
                }
            }
            this.$emit('submit-form', TempData)
        },
        // 新增
        add() {
            let item = ''
            const recive = this.formItem.receiptServerList
            item = this.servePrice
            if (item.trimRight() === '') {
                this.$Message.warning('请输入内容')
                return
            }
            if (item.length >= 20) {
                this.$Message.warning('名称长度过长')
                return
            }
            if (recive.length >= 5) {
                this.$Message.warning('数量不能大于5')
                return
            }
            recive.unshift({ serverName: item })
            this.servePrice = ''
        },
        // 删除
        del(i) {
            this.formItem.receiptServerList.splice(i, 1)
        }
    }
    // watch: {
    //     defaultData: {
    //         handler(val) {
    //             this.scData = JSON.parse(JSON.stringify(val)) // 父组件数据
    //             console.log(this.scData, '父组件数据')
    //         },
    //         // immediate: true,
    //         deep: true
    //     }
    // }
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
