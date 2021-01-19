<template>
    <Drawer v-model="isShowDrawer" width="1640" :closable="false" @on-visible-change="drawerChange">
        <div>
            <h3>场所回执模板</h3>
            <PlaceTable ref="PlaceTable" @submit-form="submitPlaceTable" />
            <div class="public-btns-groups">
                <Button class="hoverf9" shape="circle" size="large" @click="save">确定</Button>
                <Button class="hoverf9" shape="circle" size="large" @click="cancel">取消</Button>
            </div>
        </div>
    </Drawer>
</template>

<script>
import { apiCreatePlaceReceipt } from '@/api/inquiryApi/create'
export default {
    // 场所回执模板
    components: {
        PlaceTable: () => import('../components/Place.vue')
    },
    props: {
        showDrawer: {
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
            isShowDrawer: false,
            tempData: {} // 父组件传递数据
        }
    },
    methods: {
        drawerChange(changeStatus) {
            // 将模态框当前的状态返回给父组件 同步父组件里面的值
            this.$emit('on-visible-change', changeStatus)
        },
        // 确定按钮 提交场所录入
        save() {
            this.$refs.PlaceTable.subForm()
        },
        submitPlaceTable(data) {
            // 场所录入
            apiCreatePlaceReceipt({ data }).then(res => {
                if (res.code === '200') {
                    this.isShowDrawer = false
                }
            })
        },
        cancel() {
            this.isShowDrawer = false
        }
    },
    watch: {
        showDrawer: {
            handler(newVal) {
                this.isShowDrawer = newVal
            },
            immediate: true
        },
        defaultData: {
            handler(val) {
                this.tempData = JSON.parse(JSON.stringify(val)) // 深拷贝一份父组件传递的数据
                // this.formItem.inquiryPlanCode = this.tempData.inquiryPlanCode || 'IP202012281800493410' // 邮件带过来
                // this.formItem.mkblNo = this.tempData.mkblNo || '446c467875bf44ba84402516270469a2' // 邮件带过来
                // console.log(this.tempData, '父组件传递数据')
                // console.log(this.formItem.inquiryPlanCodet, 'inquiryPlanCodet')
                // console.log(this.formItem.mkblNo, 'mkblNo')
            },
            // immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.public-btns-groups {
    display: flex;
    margin: 30px 0;
    button {
        & + button {
            margin-left: 30px;
        }
    }
}
</style>
