<template>
    <Drawer v-model="isShowDrawer" width="917" :closable="false" @on-visible-change="drawerChange">
        <h3>单证模板录入</h3>
        <tab-btns isBaseBtn :tabnowrap="false" :titleNames="tabItems" :width="222" :btnIndex="tabIndex" @handleBtn="handleChangeTab">
            <div class="hr"></div>
            <component v-show="mode == 'template'":defaultData="componName[tabIndex - 1] && componName[tabIndex - 1].dataStructure" :ref="componentName" :is="componentName"></component>
            <div v-if="mode == 'template'" class="pad-top">
                <div class="down" @click="saveImg">另存</div>
            </div>
            <div v-else class="pad-top">
                <adt-upload @getFileList="getFileList" :currentKey="'img'" :files="backFileList" />
                <div class="down" @click="downImg">文件下载</div>
            </div>
        </tab-btns>
        <div class="public-btns-group">
            <Button shape="circle" size="large" @click="cancel">取消</Button>
        </div>
    </Drawer>
</template>

<script>
// 执行反馈单据查看
import { apiGetBillsData, apiAddBillsData } from '@/api/logisticsCommission'
import html2canvas from 'html2canvas'
import { aDownLoadFile } from '@/libs/utils'
import { getFileInfo } from '@/api/register'
import { urlPre, urlLink } from '@/libs/urlConfig'
import TabBtns from '@/common/adt-tabBtns'
import GoodsTemplate from './DocTemplateDetail/GoodsTemplate.vue'
import EquipmentTemplate from './DocTemplateDetail/EquipmentTemplate.vue'
import PackingTemplate from './DocTemplateDetail/PackingTemplate.vue'
export default {
    // 单证模板录入
    name: 'DocTemplateEntryDetail',
    components: { TabBtns, GoodsTemplate, EquipmentTemplate, PackingTemplate },
    props: {
        showDrawer: {
            type: Boolean,
            default: false
        },
        defaultData: {
            type: Object,
            default: () => ({})
        } // 查询模板数据  orderCode sceneName 订单编号 场景名称
    },
    data() {
        return {
            isShowDrawer: false,
            mode: 'template', //template file 模板-文件 录入模式
            imgData: { fileCode: '' }, //图片保存数据
            backFileList: [], // 反显文件列表
            billsTemplate: this.$getDictionary('BILLS_TEMPLATEl'), //订单模板编号
            tabItems: [], //订单模板 汉字名称
            componName: [], //订单模板 组件名称
            tabIndex: 1 //当前处于第几个订单 -1
        }
    },
    computed: {
        componentName() {
            return (this.componName[this.tabIndex - 1] && this.componName[this.tabIndex - 1].name) || ''
        }
    },
    methods: {
        handleChangeTab(index) {
            if (this.tabIndex == index + 1) return
            this.tabIndex = index + 1
            // if (this.componName[index].mode === 'template') {
            // }
            this.backFileList = this.componName[index].backList
        },
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit('on-visible-change', changeStatus)
        },
        getFileList(res, bool) {
            // i.uid === currentKey i.status !== 'delete' fileCode
            if (!res[0]) return
            this.imgData = {
                billsCode: this.componName[0].billsCode,
                executoryEntrustCode: this.scData.executoryEntrustCode,
                orderCode: this.scData.orderCode,
                sceneName: this.scData.sceneName,
                fileCode: res[res.length - 1].code
            }
            if (bool) {
                //进行单据图片清除
                this.imgData.fileCode = ''
                apiAddBillsData({ data: this.imgData }).then(res => {
                    if (res.code == 200) {
                        this.$Message.success({ content: '删除成功!' })
                    }
                })
            }
        },
        // 保存 截图
        saveFile(data, filename) {
            const save_link = document.createElement('a')
            save_link.href = data
            save_link.download = filename
            document.body.appendChild(save_link)
            // console.log('save_link',save_link)
            const event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            save_link.dispatchEvent(event)
            this.$Loading.finish()
            document.body.removeChild(save_link)
        },
        // 生成 截图
        saveImg() {
            // console.log('this.$refs[this.componentName]',this.$refs[this.componentName].$el);
            this.$Loading.start()
            html2canvas(this.$refs[this.componentName].$el).then(canvas => {
                console.log('canvas', canvas)
                // 转成图片，生成图片地址
                this.imgUrl = canvas.toDataURL('image/png')
                // console.log('imgUrl',this.imgUrl);
                this.saveFile(this.imgUrl, new Date().getTime() + '')
            })
        },
        filterName(val) {
            //模板编号 过滤返回模板名称
            let temp = {
                SIOL: 'GoodsTemplate',
                EIOR: 'EquipmentTemplate',
                PL: 'PackingTemplate'
            }
            for (const key in temp) {
                if (val == key) {
                    return temp[key]
                }
            }
            return 'GoodsTemplate'
        },
        downImg() {
            //a标签 下载
            if (this.backFileList.length) {
                if (this.backFileList[0].status == 'finished') {
                    // console.log(this.backFileList[0]);
                    // 文件下载公共方法 名字 code
                    aDownLoadFile(this.backFileList[0].name, this.backFileList[0].code)
                }
            } else {
                this.$Message.warning({ content: '暂无图片!' })
            }
        },
        cancel() {
            this.isShowDrawer = false
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                this.scData = JSON.parse(JSON.stringify(val)) //拷贝一份父组件传递的数据
                console.log(this.scData, '打开单据模板的数据')
                // return
                if (this.scData.orderCode && this.scData.sceneName) {
                    let data = { orderCode: this.scData.orderCode, sceneName: this.scData.sceneName, billsCode: this.scData.billsCode || undefined }
                    apiGetBillsData({ data }).then(({ data }) => {
                        let itemName = [],
                            itemList = []
                        const dataLen = (data && data.length) || 0
                        data &&
                            data.forEach(e => {
                                let { billsCode, fileCode, billsName, billsTemplate, dataStructure = [] } = e
                                let name = this.filterName(billsTemplate)
                                itemName.push(billsName) //模板名称
                                itemList.push({ billsCode, fileCode, name, dataStructure }) //模板对象
                            })
                        this.tabItems = itemName
                        this.componName = itemList
                        let backArr = []
                        itemList.length &&
                            this.componName.forEach(item => {
                                if (item.fileCode) {
                                    getFileInfo(item.fileCode).then(({ data }) => {
                                        let { fileCode, fileSize, name, path, suffix } = data
                                        let url = `${urlPre}/${urlLink}/` + path
                                        item.backList = [{ uid: 'img', status: 'finished', code: fileCode, fileSize, name, url, suffix }]
                                    })
                                    item.mode = 'false'
                                } else {
                                    item.mode = 'template'
                                    item.backList = []
                                }
                            })
                        if (dataLen) {
                            this.isShowDrawer = true
                            setTimeout(() => {
                                this.mode = this.componName[0].mode
                                if (this.componName[0].mode!=='template') {
                                    this.backFileList = this.componName[0].backList
                                }
                            }, 1000) //异步操作
                        }
                        if (dataLen === 0) {
                            this.$Message.warning('暂无单据表格数据!')
                        }
                    })
                }
            },
            // immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.hr {
    width: 675px;
    height: 1px;
    background-color: #d7d8df;
    margin: 20px 0 10px 0;
}
/deep/.small-btn .tabBtn {
    margin-left: 0;
}
/deep/ .tabTitle {
    justify-content: left;
}
.pad-top {
    padding-top: 10px;
    .upload-mybtn {
        display: inline-block;
        vertical-align: middle;
        height: 33px;
        cursor: pointer;
        margin-right: 20px;
    }
}
.nowrap {
    flex-wrap: nowrap !important;
}
.down {
    display: inline-block;
    width: 105px;
    margin: 10px 20px 0;
    text-align: center;
    line-height: 28px;
    vertical-align: middle;
    background-color: #e8eff5;
    border: 1px solid #02adb5;
    border-radius: 4px;
    cursor: pointer;
}
</style>
