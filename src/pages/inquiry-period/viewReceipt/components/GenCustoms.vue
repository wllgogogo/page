<template>
    <div>
        <div class="card">
            <Row>
                <Col span="5" class="gray-bg"> <span class="need">*</span>报关类型: </Col>
                <Col span="7">
                    <CheckboxGroup v-model="formItem.declType">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in CUSTOMS_DECLARATION_TYPE" :key="i">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col span="5" class="gray-bg"> <span class="need">*</span>货物类型: </Col>
                <Col span="7">
                    <CheckboxGroup v-model="formItem.cargoType">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in GOODS_TYPE" :key="i" v-show="e.dictionaryKey != 'D'">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
            <Row>
                <Col span="5" class="gray-bg"> <span class="need">*</span>运输方式: </Col>
                <Col span="7">
                    <CheckboxGroup v-model="formItem.trspMode">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in TRANSPORT_MODE" :key="i">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col span="5" class="gray-bg"> <span class="need">*</span>运输类型: </Col>
                <Col span="7">
                    <CheckboxGroup v-model="formItem.trspType">
                        <Checkbox :disabled="Disabled" :label="e.dictionaryKey" v-for="(e, i) in TRANSPORT_TYPE" :key="i">
                            <span>{{ e.dictionaryValue }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Col>
            </Row>
            <!-- 主要申报货物 -->
            <Row>
                <Col span="5" class="gray-bg collr3"> <span class="need">*</span>主要申报货物: </Col>
                <Col span="19" class="collpan collr3">
                    <div class="cargo-main-input">
                        <Input v-model="mainCargo" :disabled="Disabled" placeholder="请输入货物名称"> </Input>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="add(1)">添加</Button>
                    </div>
                    <span class="cargo-item-label" v-for="(e, i) in formItem.mainDeclGoods" :key="i">
                        {{ e }}
                        <svg class="iconfont" @click="del(i, 1)">
                            <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                        </svg>
                    </span>
                </Col>
            </Row>
            <!-- 不能申报货物 -->
            <Row>
                <Col span="5" class="gray-bg collr3"> <span class="need">*</span>不能申报货物: </Col>
                <Col span="19" class="collpan collr3">
                    <div class="cargo-main-input">
                        <Input v-model="unCargo" :disabled="Disabled" placeholder="请输入货物名称"> </Input>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="add(2)">添加</Button>
                    </div>
                    <span class="cargo-item-label" v-for="(e, i) in formItem.banDeclGoods" :key="i">
                        {{ e }}
                        <svg class="iconfont" @click="del(i, 2)">
                            <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                        </svg>
                    </span>
                </Col>
            </Row>
            <!-- 申报关区 -->
            <Row>
                <Col span="5" class="gray-bg collr3"> <span class="need">*</span>申报关区: </Col>
                <Col span="19" class="collpan collr3">
                    <div class="cargo-main-input">
                        <!-- <adt-city-selector :defaultData="formInline.selectCity" labelName="请选择城市" @on-change="changeSelectCity" style="display: inline-block;" /> -->
                        <Select style="width: auto;margin-left: 5px;" :disabled="Disabled" @on-change="changeStationAddr" v-model="formInline.destinationSite" placeholder="请选择关区" clearable>
                            <Option v-for="(option, index) in selcectPlaceList" :key="index" :value="option.value">
                                {{ option.label }}
                            </Option>
                        </Select>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="addcustoms()">添加</Button>
                    </div>
                    <span class="cargo-item-label" v-for="(e, i) in formItem.declCustomsList" :key="i">
                        {{ e.declCuatomsCodeTranslate || e.declCuatomsCode }}
                        <svg class="iconfont" @click="delcustoms(i)">
                            <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                        </svg>
                    </span>
                </Col>
            </Row>
            <!-- 报关单据要求 -->
            <Row class="rowauto">
                <Col span="5" style="border: none;" class="gray-bg">
                    报关单据要求:
                </Col>
                <Col span="19" class="collpan colauto">
                    <div class="cargo-main-input">
                        <Input v-model="customDoc" :disabled="Disabled" placeholder="请输入单据名称"> </Input>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="add(3)">添加</Button>
                    </div>
                    <div class="cargo-item-row" v-for="(e, idx) in formItem.customsBillList" :key="idx">
                        <span class="cargo-item-label">
                            {{ e.certName }}
                            <svg class="iconfont" @click="del(idx, 3)">
                                <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                            </svg>
                        </span>
                        <RadioGroup v-model="e.modeType">
                            <Radio v-show="!(e.modePath && v.dictionaryKey == 'CT')" :label="v.dictionaryKey" v-for="(v, i) in TEMPLATEl_TYPE" :key="i">
                                <span>{{ v.dictionaryValue }}</span>
                            </Radio>
                        </RadioGroup>
                        <Upload
                            v-show="e.modeType == 'CD'"
                            style="display: inline-block"
                            :show-upload-list="false"
                            :format="['jpg', 'jpeg', 'png']"
                            :max-size="2048"
                            :on-success="handleSuccess"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :on-error="handleErr"
                            type="drag"
                            :action="action"
                        >
                            <span class="cargo-item-label" @click="upfile(e)">
                                上传模板附件
                            </span>
                        </Upload>
                        {{ e.modePath }}
                    </div>
                </Col>
            </Row>
            <!-- 作业时间范围 -->
            <Row>
                <Col span="5" class="gray-bg collr3"> <span class="need">*</span>作业时间范围: </Col>
                <Col span="19" class="collpan collr3">
                    <span @click="Disabled || checkTime(e, i)" :class="{ 'cargo-item-date': e.check, uncheck: !e.check }" v-for="(e, i) in dateList" :key="i">{{ e.name }}</span>
                    <div class="cargo-main-input">
                        <TimePicker style="width: auto" @on-change="timeUpdata" :disabled="Disabled" ref="timerange" :value="workTime" type="timerange" placeholder="上下班时间"> </TimePicker>
                    </div>
                </Col>
            </Row>
            <!-- 服务/报价 -->
            <Row class="rowauto">
                <Col span="5" style="border: none;" class="gray-bg"> <span class="need">*</span>服务/报价: </Col>
                <Col span="19" class="collpan colauto">
                    <div class="cargo-main-input">
                        <Input v-model="servePrice" :disabled="Disabled" placeholder="请输入服务项内容"> </Input>
                        <Button style="margin-left:20px" :disabled="Disabled" @click="add(4)">添加</Button>
                    </div>
                    <div class="cargo-item-row" v-for="(e, idx) in formItem.receiptServerList" :key="idx">
                        <span class="cargo-item-label">
                            {{ e.serverName }}
                            <svg class="iconfont" @click="del(idx, 4)">
                                <use xlink:href="#icon-andaotongV3ICON_piliangshanchu"></use>
                            </svg>
                        </span>
                        <Input v-model.number="e.serverNumber"> </Input>
                        <Select style="width:80px;margin-left:10px" v-model="e.serverCurr" clearable>
                            <Option v-for="item in CURRENCY_CODE" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                {{ item.dictionaryValue }}
                            </Option>
                        </Select>
                        <Select style="width:100px;margin-left:10px" v-model="e.serverUnit" clearable>
                            <Option v-for="item in TRANSPORT_TYPE" :key="item.dictionaryKey" :value="item.dictionaryKey">
                                {{ item.dictionaryValue }}
                            </Option>
                        </Select>
                    </div>
                </Col>
            </Row>
        </div>
        <companyItem :Disabled="Disabled" ref="companyItem" @submit-form="submitCompany" />
    </div>
</template>

<script>
/* eslint-disable indent */
import { upload as baseUrl } from '@/api/api'
import { _handelDir } from '@/libs/utils'
export default {
    // 普通关务回执模板
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
            // CUSTOMS_DECLARATION_TYPE: this.$getDictionary('CUSTOMS_DECLARATION_TYPE'), // 报关类型
            // TRANSPORT_MODE: this.$getDictionary('TRANSPORT_MODE'), // 运输方式
            // CURRENCY_CODE: this.$getDictionary('CURRENCY_CODE'), // 币种
            // GOODS_TYPE: this.$getDictionary('GOODS_TYPE'), // 货物类型
            // TRANSPORT_TYPE: this.$getDictionary('TRANSPORT_TYPE'), // 运输类型
            // TEMPLATEl_TYPE: this.$getDictionary('TEMPLATEl_TYPE'), // 模板类型
            CUSTOMS_DECLARATION_TYPE: [
                { dictionaryKey: 'I', dictionaryValue: '进口' },
                { dictionaryKey: 'E', dictionaryValue: '出口' }
            ], // 报关类型
            TRANSPORT_MODE: [
                { dictionaryKey: 'WATERWAY', dictionaryValue: '水运' },
                { dictionaryKey: 'AIRLIFT', dictionaryValue: '空运' },
                { dictionaryKey: 'PUBROAD', dictionaryValue: '公路' },
                { dictionaryKey: 'RAILWAY', dictionaryValue: '铁运' }
            ], // 运输方式
            CURRENCY_CODE: [
                { dictionaryKey: 'CNY', dictionaryValue: '元' },
                { dictionaryKey: 'USD', dictionaryValue: '美元' },
                { dictionaryKey: 'EUR', dictionaryValue: '欧元' }
            ], // 币种
            GOODS_TYPE: [
                { dictionaryKey: 'G', dictionaryValue: '普货' },
                { dictionaryKey: 'C', dictionaryValue: '恒温货' }
            ], // 货物类型
            TRANSPORT_TYPE: [
                { dictionaryKey: 'C', dictionaryValue: '集装箱' },
                { dictionaryKey: 'B', dictionaryValue: '件杂货' }
            ], // 运输类型
            TEMPLATEl_TYPE: [
                { dictionaryKey: 'CT', dictionaryValue: '国家要求模板' },
                { dictionaryKey: 'CD', dictionaryValue: '自定义模板' }
            ], // 模板类型
            dateList: [
                { name: '周一', check: false },
                { name: '周二', check: false },
                { name: '周三', check: false },
                { name: '周四', check: false },
                { name: '周五', check: false },
                { name: '周六', check: false },
                { name: '周日', check: false }
            ], // 星期
            workTime: ['', ''], // 上班时间
            action: `${baseUrl}/file-record/upload`, // 上传
            mainCargo: '', // 主要申报货物 输入框
            unCargo: '', // 不能申报货物 输入框
            customDoc: '', // 报关单据 输入框
            servePrice: '', // 服务报价 输入框
            formInline: {
                selectCity: '',
                destinationSite: ''
            },
            selcectPlaceList: [],
            lastClickTime: 0, // 上一次点击时间的下标
            formItem: {
                inquiryPlanCode: 'IP202012281800493410', // 邮件带过来
                mkblNo: '446c467875bf44ba84402516270469a2', // 邮件带过来
                // receiptId: '',
                declType: [], // [] => ';' 报关类型 I： 进口 E 出口
                cargoType: [], // [] => ';' 货物类型
                trspMode: [], // [] => ';' 运输方式
                trspType: [], // [] => ';' 运输类型
                mainDeclGoods: [], // 主要申报货物 以;拼接
                banDeclGoods: [], // 禁止申报货物 以;拼接
                customsBillList: [
                    // {
                    //     certCode: '',
                    //     certName: '单据一',
                    //     inquiryPlanCode: '',
                    //     mkblNo: '',
                    //     modePath: '',
                    //     modeType: 'CT',
                    //     receiptId: ''
                    // }
                ], // 报关单据要求集合
                declCustomsList: [
                    // {
                    //     declCuatomsCodeTranslate: '关区一',
                    //     declCuatomsCode: 'ccc'
                    //     // inquiryPlanCode: '',
                    //     // mkblNo: '',
                    //     // receiptId: ''
                    // }
                ], // 申报关区代码集合 todo
                receiptPeriodList: [
                    // {
                    //     inquiryPlanCode: '',
                    //     mkblNo: '',
                    //     receiptId: '',
                    //     workCode: '',
                    //     cycle: '',
                    //     workOff: '',
                    //     workShift: ''
                    // }
                ], // 工作周期列表
                receiptServerList: [
                    // {
                    //     inquiryPlanCode: '',
                    //     mkblNo: '',
                    //     receiptId: '',
                    //     serverCode: '',
                    //     serverCurr: '',
                    //     serverName: '服务一',
                    //     serverNumber: 0,
                    //     serverTransType: '',
                    //     serverUnit: ''
                    // }
                ] // 附加服务列表
            }, // 关务入参
            search: {
                inquiryPlanCode: this.$route.query.inquiryPlanCode || 'IP202012281800493410', // 'IP202012281800493410', // 询期询价编号 不能为空
                inquiryType: this.$route.query.inquiryType || 'OT', // 询期询价类型 不能为空
                mkblNo: this.$route.query.mkblNo || '446c467875bf44ba84402516270469a2', // '446c467875bf44ba84402516270469a2', // 制单号 // 不能为空
                serviceType: this.$route.query.serviceType || 'AC' // 询期询价服务类型 不能为空 AC BC(普通 综保报关) AY BY(普通 综保场所)
            } // 当前回执的 询期询价编号 创建时间 货物类型
        }
    },
    methods: {
        // 选择城市
        async changeSelectCity(value) {
            this.formItem.stationAddr = value.value.join(';')
            this.formInline.selectCity = value.value.join(';')
            console.log(this.formInline.selectCity, 'city')
            this.selcectPlaceList = await _handelDir(value.value, true)
            console.log(this.selcectPlaceList, 'guanqu')
        },
        changeStationAddr(value) {
            console.log(value, '关区场所编码', this.formItem.stationAddr)
        },
        // 新增 关区
        addcustoms() {
            if (this.formInline.destinationSite.trimRight() === '') {
                this.$Message.warning('请先选择关区')
                return
            }
            if (this.formItem.declCustomsList >= 5) {
                this.$Message.warning('关区数量不能大于5')
                return
            }
            const item = {
                declCuatomsCodeTranslate: this.formInline.destinationSite,
                declCuatomsCode: this.formInline.destinationSite,
                inquiryPlanCode: '',
                mkblNo: '',
                receiptId: ''
            }
            this.formItem.declCustomsList.unshift(item)
            this.formInline.destinationSite = ''
            this.formInline.selectCity = ''
        },
        // 删除 关区
        delcustoms(i) {
            this.formItem.declCustomsList.splice(i, 1)
        },
        // 新增
        add(type) {
            let recive
            let item = ''
            switch (type) {
                case 1:
                    recive = this.formItem.mainDeclGoods
                    item = this.mainCargo
                    break
                case 2:
                    recive = this.formItem.banDeclGoods
                    item = this.unCargo
                    break
                case 3:
                    recive = this.formItem.customsBillList
                    item = this.customDoc
                    break
                case 4:
                    recive = this.formItem.receiptServerList
                    item = this.servePrice
                    break
            }
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
            if (type === 3) {
                item = {
                    certCode: '',
                    certName: item,
                    // inquiryPlanCode: '',
                    // mkblNo: '',
                    modePath: '',
                    // receiptId: '',
                    modeType: 'CT' // 国家要求模板
                }
            }
            if (type === 4) {
                item = {
                    serverName: item,
                    serverNumber: '',
                    serverCurr: '',
                    serverUnit: ''
                    // serverCode: ''
                    // inquiryPlanCode: '',
                    // mkblNo: '',
                    // receiptId: ''
                }
            }
            recive.unshift(item)
            switch (type) {
                case 1:
                    this.mainCargo = ''
                    break
                case 2:
                    this.unCargo = ''
                    break
                case 3:
                    this.customDoc = ''
                    break
                case 4:
                    this.servePrice = ''
                    break
            }
        },
        // 删除
        del(i, type) {
            switch (type) {
                case 1:
                    this.formItem.mainDeclGoods.splice(i, 1)
                    break
                case 2:
                    this.formItem.banDeclGoods.splice(i, 1)
                    break
                case 3:
                    this.formItem.customsBillList.splice(i, 1)
                    break
                case 4:
                    this.formItem.receiptServerList.splice(i, 1)
                    break
            }
        },
        // 记录点击的单据信息 以便保存文件code
        upfile(data) {
            this.imgData = data
            console.log(this.imgData, '保存上传数据!')
        },
        // 上传成功
        handleSuccess({ data }) {
            console.log(data, '上传成功 响应')
            this.imgData.code = data.code
            this.imgData.file_name = data.name || '文件名'
            console.log('上传成功 绑定参数', this.imgData)
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
            // if (e.check) {
            // } else {
            // }
        },
        parmvalid() {
            // 检验上班时间 周期
            // console.log(this.$refs.timerange.visualValue)
            if (this.formItem.declType.length === 0) {
                this.$Message.warning('请选择报关类型')
                return true
            }
            if (this.formItem.cargoType.length === 0) {
                this.$Message.warning('请选择货物类型')
                return true
            }
            if (this.formItem.trspMode.length === 0) {
                this.$Message.warning('请选择运输方式')
                return true
            }
            if (this.formItem.trspType.length === 0) {
                this.$Message.warning('请选择运输类型')
                return true
            }
            if (this.formItem.mainDeclGoods.length === 0) {
                this.$Message.warning('请输入主要申报货物')
                return true
            }
            if (this.formItem.banDeclGoods.length === 0) {
                this.$Message.warning('请输入禁止申报货物')
                return true
            }
            if (this.formItem.declCustomsList.length === 0) {
                this.$Message.warning('请输入申报关区')
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
            if (this.formItem.receiptServerList.length === 0) {
                this.$Message.warning('请至少输入一个服务')
                return true
            }
            const serveBool = this.formItem.receiptServerList.every((item, idx) => {
                if (item.serverNumber === '' || item.serverNumber === 0) {
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
            return false
        },
        subForm() {
            if (this.parmvalid()) {
                return
            }
            this.$refs.companyItem.subForm()
        },
        // 公司信息 提交
        submitCompany(formItem) {
            const TempData = JSON.parse(JSON.stringify(this.formItem))
            TempData.declType = TempData.declType.join(';') // [], // [] => ';' 报关类型 I： 进口 E 出口
            TempData.cargoType = TempData.cargoType.join(';') // [], // [] => ';' 货物类型
            TempData.trspMode = TempData.trspMode.join(';') // [], // [] => ';' 运输方式
            TempData.trspType = TempData.trspType.join(';') // [], // [] => ';' 运输类型
            TempData.mainDeclGoods = TempData.mainDeclGoods.join(';') // [], // 主要申报货物 以;拼接
            TempData.banDeclGoods = TempData.banDeclGoods.join(';') // [], // 禁止申报货物 以;拼接
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
        }
    }
    // watch: {
    // defaultData: {
    //     handler(val) {
    //         this.formItem = JSON.parse(JSON.stringify(val)) // 拷贝一份父组件传递的数据
    //         console.log(this.formItem, '拷贝一份父组件传递的数据')
    //     },
    //     // immediate: true,
    //     deep: true
    // }
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
        .collp0 {
            padding: 0px;
            .ivu-input-wrapper {
                vertical-align: baseline;
            }
        }
        // vertical-align: bottom;
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
                .rule-item {
                    display: inline-block;
                }
            }
            .rule_right2 {
                display: inline-block;
                height: 42px;
                width: 90%;
                padding-left: 10px;
                .rule-item {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
