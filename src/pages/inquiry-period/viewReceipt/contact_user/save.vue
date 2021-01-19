<template>
    <div>
        <div>
            <!-- 联系人 -->
            <div class="card">
                <Row>
                    <Col class="gray-bg" span="2"><span class="need">*</span>发货人:</Col>
                    <Col span="6">
                        <Select v-if="!isDetail" v-model="senderFormItemindex" @on-clear="onclear(1)" clearable @on-change="chooseName(1)">
                            <Option v-for="(item, index) in sender" :key="index" :value="index">
                                {{ item.attenName }}
                            </Option>
                        </Select>
                        <div v-else>{{ senderFormItem.attenName }}</div>
                        <Button v-if="!isDetail" @click="addPeople(1)">添加发货人</Button>
                    </Col>
                    <Col class="gray-bg" span="2"><span class="need">*</span>收货人:</Col>
                    <Col span="6">
                        <Select v-if="!isDetail" v-model="takerFormItemindex" @on-clear="onclear(2)" clearable @on-change="chooseName(2)">
                            <Option v-for="(item, index) in taker" :key="item.code" :value="index">
                                {{ item.attenName }}
                            </Option>
                        </Select>
                        <div v-else>{{ takerFormItem.attenName }}</div>
                        <Button v-if="!isDetail" @click="addPeople(2)">添加收货人</Button>
                    </Col>
                    <Col class="gray-bg" span="2"><span class="need">*</span>通知人:</Col>
                    <Col span="6">
                        <Select v-if="!isDetail" v-model="notifierFormItemindex" @on-clear="onclear(3)" clearable @on-change="chooseName(3)">
                            <Option v-for="(item, index) in notifier" :key="item.code" :value="index">
                                {{ item.attenName }}
                            </Option>
                        </Select>
                        <div v-else>{{ notifierFormItem.attenName }}</div>
                        <Button v-if="!isDetail" @click="addPeople(3)">添加通知人</Button>
                    </Col>
                </Row>
            </div>
            <!-- 电话 -->
            <div class="card">
                <Row>
                    <Col class="gray-bg" span="2">电话:</Col>
                    <Col span="6">
                        {{ senderFormItem.attenTel }}
                    </Col>
                    <Col class="gray-bg" span="2">电话:</Col>
                    <Col span="6">
                        {{ takerFormItem.attenTel }}
                    </Col>
                    <Col class="gray-bg" span="2">电话:</Col>
                    <Col span="6">
                        {{ notifierFormItem.attenTel }}
                    </Col>
                </Row>
            </div>
            <!-- 代码 -->
            <div class="card">
                <Row>
                    <Col class="gray-bg" span="2">代码:</Col>
                    <Col span="6">
                        {{ senderFormItem.code }}
                    </Col>
                    <Col class="gray-bg" span="2">代码:</Col>
                    <Col span="6">
                        {{ takerFormItem.code }}
                    </Col>
                    <Col class="gray-bg" span="2">代码:</Col>
                    <Col span="6">
                        {{ notifierFormItem.code }}
                    </Col>
                </Row>
            </div>
            <!-- 地址 -->
            <div class="card">
                <Row>
                    <Col class="gray-bg" span="2">地址:</Col>
                    <Col span="6">
                        {{ senderFormItem.attenAddr }}
                    </Col>
                    <Col class="gray-bg" span="2">地址:</Col>
                    <Col span="6">
                        {{ takerFormItem.attenAddr }}
                    </Col>
                    <Col class="gray-bg" span="2">地址:</Col>
                    <Col span="6">
                        {{ notifierFormItem.attenAddr }}
                    </Col>
                </Row>
            </div>
            <!-- 传真 -->
            <div class="card">
                <Row>
                    <Col class="gray-bg" span="2">传真:</Col>
                    <Col span="6">
                        {{ senderFormItem.attenFax }}
                    </Col>
                    <Col class="gray-bg" span="2">传真:</Col>
                    <Col span="6">
                        {{ takerFormItem.attenFax }}
                    </Col>
                    <Col class="gray-bg" span="2">传真:</Col>
                    <Col span="6">
                        {{ notifierFormItem.attenFax }}
                    </Col>
                </Row>
            </div>
            <!-- 邮箱 -->
            <div class="card">
                <Row class="last-type">
                    <Col class="gray-bg" span="2">邮箱:</Col>
                    <Col span="6">
                        {{ senderFormItem.attenEmail }}
                    </Col>
                    <Col class="gray-bg" span="2">邮箱:</Col>
                    <Col span="6">
                        {{ takerFormItem.attenEmail }}
                    </Col>
                    <Col class="gray-bg" span="2">邮箱:</Col>
                    <Col span="6">
                        {{ notifierFormItem.attenEmail }}
                    </Col>
                </Row>
            </div>
        </div>
        <Drawer v-model="isShowDrawer" width="1100">
            <h3>录入{{ addType === 1 ? '发货人' : addType === 2 ? '收货人' : '通知人' }}信息</h3>
            <Form :model="popFormItem" :rules="popRuleValidate" label-position="top" ref="popFormItemData" label-colon>
                <Row>
                    <Col span="12">
                        <!-- <FormItem label="发货人名称" prop="attenName">
                            <Input v-model="popFormItem.attenName" type="text"/>
                        </FormItem> -->
                        <FormItem :label="`${addType === 1 ? '发货人' : addType === 2 ? '收货人' : '通知人'}名称`" prop="attenName">
                            <Input v-model="popFormItem.attenName" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话" prop="attenTel">
                            <Input v-model="popFormItem.attenTel" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="代码" prop="code">
                            <Input v-model="popFormItem.code" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="地址" prop="attenAddr">
                            <Input v-model="popFormItem.attenAddr" type="text" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="传真" prop="attenFax">
                            <Input v-model="popFormItem.attenFax" type="text" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱" prop="attenEmail">
                            <Input v-model="popFormItem.attenEmail" type="text" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="drawer-btns">
                <Button type="primary" shape="circle" size="large" @click="submitPopForm">确定</Button>
                <Button shape="circle" size="large" @click="cancel">取消</Button>
            </div>
        </Drawer>
        <div v-if="!isDetail" class="public-btns-group">
            <Button type="primary" shape="circle" size="large" @click="submitForm">下一步</Button>
        </div>
    </div>
</template>

<script>
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import validateRules from '@/libs/validateRules'
export default {
    props: {
        defaultData: {
            type: Array,
            default: () => []
        },
        isDetail: {
            type: Boolean,
            default: true
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
            isShowDrawer: false,
            addType: 1, // 1: 添加发货人， 2: 添加收货人， 3： 添加通知人
            sender: [
                {
                    attenName: '发货人1',
                    attenTel: '13452531574',
                    code: '111',
                    attenAddr: '地址1',
                    attenFax: '传真1',
                    attenEmail: '3518696374@qq.com'
                },
                {
                    attenName: '发货人',
                    attenTel: '15512080001',
                    code: '222',
                    attenAddr: '地址',
                    attenFax: '传真',
                    attenEmail: '3518696534@qq.com'
                }
            ], // 发货人列表
            taker: [
                {
                    attenName: '收货人1',
                    attenTel: '13452531572',
                    code: '234',
                    attenAddr: '地址',
                    attenFax: '传真',
                    attenEmail: '3518696341@qq.com'
                },
                {
                    attenName: '收货人',
                    attenTel: '15512080002',
                    code: '567',
                    attenAddr: '地址',
                    attenFax: '传真',
                    attenEmail: '3451869634@qq.com'
                }
            ], // 收货人列表
            notifier: [
                {
                    attenName: '通知人1',
                    attenTel: '13452531571',
                    code: '789',
                    attenAddr: '地址1',
                    attenFax: '传真1',
                    attenEmail: '351869634@qq.com'
                },
                {
                    attenName: '通知人',
                    attenTel: '15512080003',
                    code: '9686',
                    attenAddr: '地址',
                    attenFax: '传真',
                    attenEmail: '3518696234@qq.com'
                }
            ], // 通知人列表
            senderFormItemindex: -1, // 发送人选中 index
            takerFormItemindex: -1, // 收货人选中 index
            notifierFormItemindex: -1, // 通知人选中 index
            senderFormItem: {
                // index: -1, //默认选中项为 空
                attenName: '嘻嘻',
                attenTel: '',
                code: '',
                attenAddr: '',
                attenFax: '',
                attenEmail: '',
                linkType: '1'
            },
            takerFormItem: {
                // index: -1, //默认选中项为 空
                attenName: '离散',
                attenTel: '',
                code: '',
                attenAddr: '',
                attenFax: '',
                attenEmail: '',
                linkType: '2'
            },
            notifierFormItem: {
                // index: -1, //默认选中项为 空
                attenName: 'dasdasd',
                attenTel: '',
                code: '',
                attenAddr: '',
                attenFax: '',
                attenEmail: '',
                linkType: '3'
            },
            senderRuleValidate: {
                attenName: [validateRules.select('发货人名称')[0]]
            },
            takerRuleValidate: {
                attenName: [validateRules.select('收货人名称')[0]]
            },
            notifierRuleValidate: {
                attenName: [validateRules.select('通知人名称')[0]]
            },
            popFormItem: {
                attenName: '',
                attenTel: '',
                code: '',
                attenAddr: '',
                attenFax: '',
                attenEmail: '',
                linkType: '1'
            },
            popRuleValidate: {
                attenName: [validateRules.required('名称')[0]],
                attenTel: [validateRules.required('联系电话')[0], validateRules.phone()[0]],
                attenAddr: [validateRules.required('地址')[0]],
                attenEmail: [validateRules.email()[0]]
            }
        }
    },
    created() {
        // 需要的接口 获取1 2 3类型的所有人员列表 3个
        // 需要的接口 新增1 2 3类型的人员列表 3个
        if (this.defaultData.length > 1) {
            // 保存前 回显可更改
            // console.log('created');
            // let tel1 = this.defaultData[0].attenTel
            // let tel2 = this.defaultData[1].attenTel
            // let tel3 = this.defaultData[2].attenTel
            // this.senderFormItemindex = this.sender.findIndex(({attenTel})=>{return attenTel==tel1}) //发送人选中 index
            // this.takerFormItemindex = this.taker.findIndex(({attenTel})=>{return attenTel==tel2}) //收货人选中 index
            // this.notifierFormItemindex = this.notifier.findIndex(({attenTel})=>{return attenTel==tel3}) //通知人选中 index
            // this.senderFormItem = this.defaultData[0] //发送人选中 index
            // this.takerFormItem = this.defaultData[1] //收货人选中 index
            // this.notifierFormItem = this.defaultData[2] //通知人选中 index
        }
    },
    methods: {
        // 下一步操作 传参
        submitForm() {
            if (this.senderFormItem.attenName === '') {
                this.$Message.warning('请选择发货人')
                return
            }
            if (this.takerFormItem.attenName === '') {
                this.$Message.warning('请选择收货人')
                return
            }
            if (this.notifierFormItem.attenName === '') {
                this.$Message.warning('请选择通知人')
                return
            }
            // 获取数据并传递参数 0 1 2 发送人 收货人 通知人
            // linkType
            this.senderFormItem.linkType = '发货人'
            this.takerFormItem.linkType = '收货人'
            this.notifierFormItem.linkType = '通知人'
            let data = [this.senderFormItem, this.takerFormItem, this.notifierFormItem]
            this.$emit('submit-form', data)
        },
        addPeople(type) {
            this.addType = type
            this.isShowDrawer = !this.isShowDrawer
        },
        cancel() {
            this.isShowDrawer = false
            this.$refs.popFormItemData.resetFields() // 重置验证
        },
        // 新增 发货 收货 通知人
        submitPopForm() {
            this.$refs.popFormItemData.validate(valid => {
                if (valid) {
                    console.log(this.addType, this.popFormItem)
                    let addObj = JSON.parse(JSON.stringify(this.popFormItem))
                    // 要发送请求保存信息,后端判断是否重复
                    // 如果不重复
                    if (this.addType === 1) {
                        this.popFormItem.linkType = '发货人' // 现在是随便写的，还没定
                        this.sender.push(addObj)
                    }
                    if (this.addType === 2) {
                        this.popFormItem.linkType = '收货人' // 现在是随便写的，还没定
                        this.taker.push(addObj)
                    }
                    if (this.addType === 3) {
                        this.popFormItem.linkType = '通知人' // 现在是随便写的，还没定
                        this.notifier.push(addObj)
                    }
                    this.isShowDrawer = false
                    this.$refs.popFormItemData.resetFields() // 重置验证
                }
            })
        },
        chooseName(type) {
            // 过滤 触发方式(清空也会触发)
            if (type === 1 && (this.senderFormItemindex == true || this.senderFormItemindex == 0)) {
                this.senderFormItem = this.sender[this.senderFormItemindex]
            }
            // 过滤 触发方式(清空也会触发)
            if (type === 2 && (this.takerFormItemindex == true || this.takerFormItemindex == 0)) {
                this.takerFormItem = this.taker[this.takerFormItemindex]
            }
            // 过滤 触发方式(清空也会触发)
            if (type === 3 && (this.notifierFormItemindex == true || this.notifierFormItemindex == 0)) {
                this.notifierFormItem = this.notifier[this.notifierFormItemindex]
            }
        },
        // 清空 1/2/3 类型的数据
        onclear(type) {
            let emptyObj = {
                attenName: '',
                attenTel: '',
                code: '',
                attenAddr: '',
                attenFax: '',
                attenEmail: '',
                linkType: type
            }
            if (type === 1) {
                this.senderFormItem = emptyObj
            }
            if (type === 2) {
                this.takerFormItem = emptyObj
            }
            if (type === 3) {
                this.notifierFormItem = emptyObj
            }
        },
        // 是否禁用 判断
        enablefn() {
            let aa = 'CREATE',
                bb = 'AFORM',
                cc = 'RECEIVE',
                dd = 'REJECT',
                ee = 'CANCEL',
                ff = 'UNCONFIRM',
                gg = 'PLANPUSH',
                hh = 'WAIT',
                ii = 'EXECUTE',
                jj = 'EXEXE',
                kk = 'EXFIN',
                ll = 'FINISH',
                mm = 'VCLR'
            // 进入方式 输入类型 状态 委托类型
            let e = this.judge.enter,
                i = this.judge.input,
                s = this.eStatus,
                t = this.judge.coopType
            // console.log(e,i,s,t,'coopType');
            return {
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
        defaultData: {
            handler(val, oldVal) {
                if (val.length >= 1) {
                    let tel1 = val[0].attenTel
                    let tel2 = val[1].attenTel
                    let tel3 = val[2].attenTel
                    this.senderFormItemindex = this.sender.findIndex(({ attenTel }) => {
                        return attenTel == tel1
                    }) // 发送人选中 index
                    this.takerFormItemindex = this.taker.findIndex(({ attenTel }) => {
                        return attenTel == tel2
                    }) // 收货人选中 index
                    this.notifierFormItemindex = this.notifier.findIndex(({ attenTel }) => {
                        return attenTel == tel3
                    }) // 通知人选中 index
                    this.senderFormItem = val[0] // 发送人选中 index
                    this.takerFormItem = val[1] // 收货人选中 index
                    this.notifierFormItem = val[2] // 通知人选中 index
                }
            },
            deep: true, // true 深度监听
            immediate: false // 首次触发
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
        &.last-type {
            border-bottom: 1px solid #e5e5e5;
        }
        .ivu-col {
            height: 34px;
            line-height: 34px;
            text-align: left;
            padding: 0 10px;
            background-color: #fff;
            // border-bottom: 1px solid #e5e5e5;
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
        .collpan {
            .ivu-input-wrapper {
                width: 160px;
            }
        }
    }
}
</style>
