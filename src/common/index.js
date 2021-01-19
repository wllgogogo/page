// import AdtPaginator from './adt-paginator'
// import AdtSearchFolder from './adt-search-folder'
// import AdtReconfirmModal from './adt-reconfirm-modal'
// import AdtMyModal from './adt-my-modal'
// import AdtButton from './adt-button'
// import AdttabsGroup from './adt-tabs'
// import AdtSvgIcon from './adt-svg-icon'
// import AdtCitySelector from './adt-city-selector'
// import AdtProgressTab from './adt-progress-tab'
// import AdtPreview from './adt-preview'
// import AdtUpload from './adt-upload'
import AdtbtnGroup from './adt-tabBtns'

const components = [
    // AdtPaginator,
    // AdtSearchFolder,
    // AdtReconfirmModal,
    // AdtMyModal,
    // AdtButton,
    AdtbtnGroup
    // AdttabsGroup,
    // AdtSvgIcon,
    // AdtCitySelector,
    // AdtProgressTab,
    // AdtPreview,
    // AdtUpload
]

const install = Vue => {
    if (install.installed) return
    // eslint-disable-next-line array-callback-return
    components.map(component => {
        Vue.component(component.name, component)
    })
}

// Vue 是全局变量时，自动 install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}
