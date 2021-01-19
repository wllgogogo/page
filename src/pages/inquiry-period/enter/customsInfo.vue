<template>
    <div class="whole">
        <div class="whole-bottom">
            <h1>关务回执录入</h1>
            <CustomsInfo ref="CustomsInfo" @submit-form="submit" :Disabled="Disabled" />
            <div class="public-btns-group">
                <Button class="hoverf9" :disabled="Disabled" shape="circle" size="large" @click="save">保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiCreateCustomsReceipt } from '@/api/inquiryApi/create'
export default {
    components: {
        CustomsInfo: () => import('../viewReceipt/components/GenCustoms')
    },
    data() {
        return {
            Disabled: false
        }
    },
    methods: {
        // 保存
        save() {
            this.$refs.CustomsInfo.subForm()
        },
        // 组件监听
        submit(data) {
            console.log(data, '关务提交数据')
            // 关务录入
            apiCreateCustomsReceipt({ data }).then(res => {
                if (res.code === '200') {
                    this.$Message.success({ content: '保存成功!' })
                    this.Disabled = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.whole {
    .whole-bottom {
        > h1 {
            margin-bottom: 50px;
        }
        width: 1440px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
    }
}
</style>
