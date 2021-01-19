<template>
    <Cascader
        :data="cityData"
        :value="showData"
        :placeholder="labelName"
        clearable
        filterable
        :change-on-select="changeSelect"
        :load-data="loadData"
        @on-change="onChange"
    />
</template>

<script>
import { apiCityDic } from '@/api/logisticsCommission'
import { _handelDir } from '@/libs/utils'
export default {
    name: 'AdtCitySelector',
    props: {
        // 是~或者;连接的字符串
        defaultData: {
            type: String
        },
        labelName: {
            type: String,
            default: '请选择'
        },
        changeSelect: {
            type: Boolean
        }
    },
    mounted () {
        this.getCity()
    },
    data () {
        return {
            cityData: [],
            showData: this.defaultData ? (this.defaultData.split('~').length > 1 ? this.defaultData.split('~') : this.defaultData.split(';')) : []
        }
    },
    watch: {
        defaultData (newVal) {
            this.showData = newVal ? (newVal.split('~').length > 1 ? newVal.split('~') : newVal.split(';')) : []
        }
    },
    methods: {
        // 初始化城市字典数据
        getCity () {
            apiCityDic().then(({ data }) => {
                this.cityData = this._processDr(data)
            })
        },
        // 处理级联城市
        _processDr (arr) {
            console.log(arr)
            let setChildren = child => {
                child.forEach(item => {
                    item.loading = false
                    if (item.child) {
                        item.value = item.addressCode
                        item.label = item.addressName
                        item.children = item.child
                        delete item.child
                        delete item.loading
                        setChildren(item.children)
                    }
                    if (!item.child) {
                        delete item.child
                    }
                })
            }
            setChildren(arr)
            arr.forEach(item =>
                item.children.forEach(item =>
                    item.children.forEach(item => delete item.children)
                )
            )
            // console.log(arr)
            return arr
        },
        // 动态加载级联
        loadData (val, callback) {
            if (val.addressCode) {
                console.log(val)
                console.log(callback)
            }
        },
        //发送事件
        onChange (val, selectData) {
            console.log(val)
            // console.log(selectData)
            // console.log(val.split('~'))
            // async function test () {
            //     const city = await _handelDir(val)
            //     // console.log(city)
            //     return city
            // }
            // test()
            this.$emit('on-change', { value: val, data: selectData })
        }
    }
}
</script>
