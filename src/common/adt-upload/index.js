/*
* 上传文件
["type", "currentKey", "files", "newFormat", "size", "max", "info"]
* @props包括7个参数: { type： 当前组件的说明，currentKey： 当前组件的唯一标识，必传， files: 所有图片数据源, newFormat: 可以支持的格式, size: 最大尺寸，默认false, max: 最多上传多少张图片, info： 业务需要图片带回去的参数}
* @example:<adt-preview :index="currentIndex" :files="fileList" :visible="isPreview" @handleClose="handleClose" />

    handleClose() {
      this.isPreview = false;
    },
*/

import AdtUpload from './src/main'

export default AdtUpload
