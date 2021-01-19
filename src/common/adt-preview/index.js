/*
* 图片预览
["files", "index", "visible", "title"]
* @props包括4个参数: { files: 所有图片数据源, index: 当前项的下标, visible: 是否显示，默认false, title: 标题,}
* @example:<adt-preview :index="currentIndex" :files="fileList" :visible="isPreview" @handleClose="handleClose" />

    handleClose() {
      this.isPreview = false;
    },
*/

import AdtPreview from './src/main'

export default AdtPreview
