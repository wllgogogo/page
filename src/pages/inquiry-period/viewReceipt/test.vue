<template>
    <div class="whole">
        <div class="whole-bottom">
            <RecipientInformation />
            <!-- <PlaceTemplate @on-visible-change="changeDocTemplate" :defaultData="TemplateData" :showDrawer="showDocTemplate" /> -->
            <!-- <PlaceTempDetail @submit-form="onCargoInfo" ref="cargoInfoSubmit" /> -->
        </div>
        <div class="public-btns-group">
            <Button class="hoverf9" shape="circle" size="large" @click="save">保存</Button>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        RecipientInformation: () => import('./contact_user/container.vue')
        // collaborationDetail:()=>import("../components/collaborationDetail.vue"),
        // GenCustomsTempDetail: () => import('./components1/GenCustomsTempDetail.vue')
        // GenCustomsTemplate: () => import('./components1/GenCustomsTemplate.vue')
        // PlaceTempDetail: () => import('./components1/PlaceTempDetail.vue')
        // PlaceTemplate: () => import('./components1/PlaceTemplate.vue')
        // SelectPlace:()=>import("../components/SelectPlace.vue"),
        // PlaceRoute:()=>import("../components/PlaceRoute.vue"),
        // cargoDetail: () => import('../components/cargoDetail.vue')
        // cargoInfo: () => import('../components/cargoInfo.vue')
    },
    data() {
        return {
            showDocTemplate: true, // 单证模板弹窗
            TemplateData: {} // 单证模板弹窗
        }
    },
    methods: {
        changeDocTemplate(status) {
            this.showDocTemplate = status // 同步弹窗子组件状态
        },
        onCargoInfo(len) {
            if (len.length) {
                console.log(len)
                console.log('通过校验')
            } else {
                console.log('未通过校验')
            }
        },
        // 保存
        save() {
            // this.$refs.cargoInfoSubmit.submitForm()
            this.showDocTemplate = true // 同步弹窗子组件状态
        }
    }
}
</script>

<style lang="scss" scoped>
.whole {
    .whole-top,
    .whole-bottom {
        background: white;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
    }
}
.box {
    padding: 20px;
    background: #f9f9f9;
    .log {
        color: #ff0000;
        margin-right: 3px;
    }
}
</style>
