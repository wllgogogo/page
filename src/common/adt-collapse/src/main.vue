<template>
    <div class="adt-collapse">
        <Collapse>
            <slot/>
        </Collapse>
    </div>
</template>

<script>
export default {
    name: 'AdtCollapse',
    props: {
    },
    data () {
        return {}
    },
    watch: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
/deep/ .ivu-collapse {
    background-color: #FFFFFF;
    border-radius: 0;
    border: none;
}

/deep/ .ivu-collapse-content {
    background-color: #F9F9F9;
}

/deep/ .ivu-collapse > .ivu-collapse-item {
    border-top: 0;
    margin-top: 10px;
    background-color: #FFF6E5;
}

/deep/ .ivu-collapse > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header {
    border-bottom: 0;
}

/deep/ .ivu-icon-ios-arrow-forward:before {
    //position: absolute;
    //right: 20px;
    //top: 13px;
}

/deep/ .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i {
    position: absolute;
    right: 0;
    top: 13px;
}
</style>
