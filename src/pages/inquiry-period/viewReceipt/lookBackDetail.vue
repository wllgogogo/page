<template>
    <div class="receipt">
        <div class="receipt-title">{{ formatTitle(pageType) }}</div>
        <div class="public-search-condition">
            <div class="condition">
                <div v-show="search.inquiryPlanCode" class="item">
                    <div>
                        询期询价编号:
                        {{ search.inquiryPlanCode }}
                    </div>
                </div>
                <div v-show="search.inquiryType && search.serviceType" class="item">
                    <div>
                        {{ transServe(search.inquiryType, search.serviceType) }}
                    </div>
                </div>
                <div v-show="search.mkblNo" class="item">
                    <div>
                        制单号:
                        {{ search.mkblNo }}
                    </div>
                </div>
            </div>
        </div>
        <div class="receipt-tab">
            <!-- @click="changeMode(true)"  -->
            <span class="item" :class="{ active: mode }">成功回执</span>
            <span class="sep">/</span>
            <!-- @click="changeMode(false)" 失败暂未做 默认成功 -->
            <span class="item" :class="{ active: !mode }">失败回执</span>
        </div>
        <div class="receipt-company-tab">
            <span class="item" :class="{ active: e.active }" v-for="(e, i) in companyList" :key="i" @click="changeCompany(e)">{{ e.etcpName }}</span>
        </div>
        <div class="receipt-tab-line"><span class="cenitem"></span></div>
        <div class="public-search-condition">
            <div class="line-info">
                <div class="line-route" v-if="routeRes.departurePortTranslate && routeRes.destinationPortTranslate">
                    <div class="site">
                        {{ routeRes.departurePortTranslate.split(',').pop() }}
                    </div>
                    <div class="translate-info">
                        <!-- 箭头 -->
                        <svg class="iconfont arrow" :class="{ disable: routeRes.hasServer == 0 }">
                            <use xlink:href="#icon-andaotongcaidanICON_jiantou3" />
                        </svg>
                    </div>
                    <div class="site">
                        {{ routeRes.destinationPortTranslate.split(',').pop() }}
                    </div>
                </div>
                <div v-else class="line-place">
                    <span class="customs">{{ routeRes.departurePortTranslate.split(',').pop() }}</span>
                </div>
            </div>
        </div>
        <!-- 回执模板内容 -->
        <div class="receipt-content">
            <!-- 原始模板 -->
            <div class="origin-template" v-show="!mode">原始回执</div>
            <!-- 回执模板 -->
            <div class="receipt-template" :class="{ inputed: inputed }">
                <!-- 已录入 -->
                <div v-if="inputed">
                    <PlaceTempDetail :defaultData="formItem" v-if="pageType === 'Y'" />
                    <GenCustomsTempDetail :defaultData="formItem" v-if="pageType === 'C'" />
                </div>
                <!-- 未录入 -->
                <div v-if="!inputed">
                    <PlaceTemp :defaultData="formItem" v-if="pageType === 'Y'" />
                    <GenCustomsTemp :defaultData="formItem" v-if="pageType === 'C'" />
                </div>
            </div>
        </div>
        <div class="public-btns-group">
            <Button class="hoverf9" shape="circle" size="large" @click="save">创建产品</Button>
        </div>
    </div>
</template>

<script>
import { transTitle, transServe } from './receiptUtils'
import { getStationDetail, getCustomsDetail, getTransportDetail } from '@/api/inquiryApi/search'
export default {
    data() {
        return {
            mode: true, // 当前回执状态 (成功/失败)
            routeRes: {
                departurePort: 'AD_ONE',
                departurePortTranslate: '重庆',
                destinationPort: 'AD_TWO',
                destinationPortTranslate: '北京',
                hasServer: '1',
                trspMode: 'PUBROAD',
                roadCode: '0001'
            }, // 当前路线 或 节点
            inputed: true, // 是否已录入回执
            companyList: [
                // { active: true, name: '企业一', inputed: true },
                // { active: false, name: '企业二', inputed: false },
                // { active: false, name: '企业三', inputed: true }
            ], // 当前回执 包含的企业服务商列表
            formItem: {}, // 当前选中数据
            // 询期PT 询价MT 询期询价AT 询问作业时间OT(AB BA)(关务 场所)
            // INQUIRY_TYPE: this.$getDictionary('INQUIRY_TYPE'), // 询期询价类型
            // 普通报关AC 综保区报关BC 综保区场所BY 普通场所AY 运输T ......
            // INQUIRY_SERVICE_TYPE: this.$getDictionary('INQUIRY_SERVICE_TYPE'), // 询期询价服务类型
            search: {
                inquiryPlanCode: this.$route.query.inquiryPlanCode || 'IP202012281800493410', // 'IP202012281800493410', // 询期询价编号 不能为空
                inquiryType: this.$route.query.inquiryType || 'OT', // 询期询价类型 不能为空
                mkblNo: this.$route.query.mkblNo || '446c467875bf44ba84402516270469a2', // '446c467875bf44ba84402516270469a2', // 制单号 // 不能为空
                serviceType: this.$route.query.serviceType || 'AC' // 询期询价服务类型 不能为空 AC BC(普通 综保报关) AY BY(普通 综保场所)
            } // 当前回执的 询期询价编号 创建时间 货物类型
        }
    },
    components: {
        GenCustomsTempDetail: () => import('./components/GenCustomsDetail.vue'),
        PlaceTempDetail: () => import('./components/PlaceDetail.vue'),
        GenCustomsTemp: () => import('./components/GenCustoms.vue'),
        PlaceTemp: () => import('./components/Place.vue')
    },
    created() {
        if (this.pageType === 'Y') {
            getStationDetail({ data: this.search }).then(({ data }) => {
                this.createCompanyList(data)
            })
        } else if (this.pageType === 'C') {
            getCustomsDetail({ data: this.search }).then(({ data }) => {
                this.createCompanyList(data)
            })
        } else {
            getTransportDetail({ data: this.search }).then(({ data }) => {
                this.createCompanyList(data)
            })
        }
        console.log(this.pageType, 'pageType')
    },
    methods: {
        save() {},
        formatTitle(type) {
            return transTitle(type)
        },
        transServe(type, serve) {
            return transServe(type, serve)
        },
        changeMode(bool) {
            if (bool === this.mode) return // 点击当前返回
            this.mode = !this.mode
            if (this.mode && this.inputed === false) {
                // 成功回执 并且处于未录入回执(成功都是已录入)
                this.inputed = true // 切换为 回执已录入
            }
        },
        createCompanyList(List) {
            List.forEach((v, i) => {
                // { active: true, etcpName: '企业一', inputed: true },
                if (i === 0) {
                    // 默认选中第一个
                    this.formItem = v
                    v.active = true
                }
                this.companyList.push(v)
            })
        },
        changeCompany(e) {
            if (e.active) return // 点击当前返回
            this.companyList.forEach(v => {
                if (v.active) {
                    v.active = false
                }
            })
            e.active = true
            this.formItem = e
            if (this.mode === false) {
                // 失败才切换是否已录入回执
                this.inputed = e.inputed // 是否已录入回执
            }
        }
    },
    computed: {
        // 询期PT 询价MT 询期询价AT(T) 询问作业时间OT(C Y)(关务 场所) AC BC(普通 综保报关) AY BY(普通 综保场所)
        pageType() {
            if (this.search.inquiryType === 'OT' && this.search.serviceType) {
                return this.search.serviceType.split('').reverse()[0] // C 报关 Y 场所
            } else {
                return this.search.inquiryType || 'PT' // 默认询期
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.receipt {
    .receipt-content {
        display: flex;
        .origin-template {
            width: 500px;
            height: 680px;
            padding: 20px;
            margin-right: 20px;
            border-radius: 4px;
            background-color: #ffffff;
        }
        .receipt-template {
            background-color: #ffffff;
            flex: 1;
            padding: 20px;
            border-radius: 4px;
            &.inputed {
                height: auto;
            }
        }
    }
    .condition {
        .item {
            font-size: 16px;
        }
    }
    .receipt-title {
        font-size: 20px;
        color: #303548;
    }
    .receipt-tab {
        color: #666666;
        .sep {
            display: inline-block;
            font-size: 20px;
            padding: 0 12px;
            user-select: none;
        }
        .item {
            display: inline-block;
            font-size: 20px;
            padding: 0 12px;
            cursor: pointer;
        }
        .active {
            color: #0fb0b8;
        }
    }
    .receipt-company-tab {
        margin: 20px 0 16px 0;
        .item {
            display: inline-block;
            width: 200px;
            line-height: 40px;
            background: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 4px;
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
        }
        .active {
            background: #e8eff5;
            border: 1px solid #02adb5;
        }
    }
    .receipt-tab-line {
        text-align: center;
        height: 4px;
        border-bottom: 1px solid #dcdcdc;
        .cenitem {
            display: inline-block;
            vertical-align: top;
            width: 69px;
            height: 6px;
            background: #ff9c00;
            border-radius: 3px;
        }
    }
    .line-info {
        display: flex;
        .line-place {
            background: #f9f9f9;
            border-radius: 4px;
            border: 1px solid #f9f9f9;
            color: #333333;
            cursor: default;
            .customs {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 60px;
                padding: 10px 40px;
            }
        }
        .line-route {
            display: flex;
            padding: 10px;
            background: #f9f9f9;
            color: #666;
            border-radius: 4px;
            border: 1px solid #f9f9f9;
            cursor: default;
            .site {
                line-height: 40px;
                font-size: 16px;
            }
            .translate-info {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .arrow {
                    height: 6px;
                    font-size: 100px;
                    color: #333333;
                }
            }
        }
    }
}
</style>
