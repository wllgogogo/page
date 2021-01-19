<template>
  <div class="upload-wrap">
    <div
      v-show="uploadType === 'file'"
      v-for="item in fileList"
      :key="item.code"
      class="file-list"
    >
      <p v-if="item.status === 'finished'">
        <a>{{ item.name }}</a>
        <Icon
          @click="handleDelete(item)"
          type="ios-trash-outline"
          class="file-delete"
        />
      </p>
    </div>
    <template v-if="uploadType === 'images'">
      <div
        class="upload-list"
        v-for="(item, index) in fileList"
        :key="index"
        v-show="item.status === 'finished'"
      >
        <template v-if="item.status === 'finished'">
          <img :src="item.url" />
          <div class="operate-wrap">
            <Icon @click="handlePreview(item)" type="ios-eye" />
            <Icon @click="handleDelete(item)" type="ios-trash-outline" />
          </div>
        </template>
        <template v-else>
          <Progress
            v-if="item.showProgress"
            :percent="item.percentage"
            hide-info
          ></Progress>
        </template>
      </div>
    </template>
    <div v-if="isAdd">
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="format"
        :max-size="maxSize"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :multiple="maxLength > 1"
        type="drag"
        :action="action"
        style="display: inline-block; width: 146px"
        name="file"
        :data="fileData"
        :on-error="handleErr"
      >
        <div
          style="width: 146px; height: 100px; line-height: 100px"
          v-if="uploadType === 'images'"
        >
          <Icon type="ios-cloud-upload" size="20"></Icon>
        </div>
        <div v-if="uploadType === 'file'">{{ type || "上传附件" }}</div>
      </Upload>
    </div>

    <div class="btn-wrap" v-if="uploadType === 'images'">
      <div>{{ type }}<slot /></div>
      <Button
        class="clean-btn"
        style="cursor: pointer"
        @click="clearNowUploadList()"
        :disabled="isAdd"
      >
        清空
      </Button>
    </div>
    <div v-show="isPreview">
      <adt-preview
        :index="currentIndex"
        :files="fileList"
        :visible="isPreview"
        @handleClose="handleClose"
      />
    </div>
  </div>
</template>
<script>
import { deleteUpload, deleteDb } from "@/api/register";
import { upload as baseUrl } from "@/api/api";
import { urlPre, urlLink } from "./urlConfig";
export default {
  name: "adt-upload",
  props: ["type", "currentKey", "files", "newFormat", "size", "max", "info"],
  data() {
    return {
      fileList: [], //附件
      fileData: {},
      action: `${baseUrl}/file-record/upload`,
      format: ["jpg", "jpeg", "png"],
      maxSize: 2048, //最大尺寸限制
      maxLength: 1, // 最多上传多少文件
      isAdd: true, //是否显示上传按钮
      currentIndex: 0, //浏览的当前图片索引
      isPreview: false, // 是否显示图片浏览
      uploadType: "images", // 上传类型
      myKey: "myKey",
    };
  },
  watch: {
    currentKey: {
      handler(newKey, oldKey) {
        this.fileList =
          this.files.filter((i) => i.uid === newKey && i.status !== "delete") ||
          [];
        this.myKey = newKey || "myKey";
        this.isAdd = this.maxLength > this.fileList.length;
      },
      immediate: true,
    },
    files: {
      handler(newFile, oldFile) {
        this.fileList =
          newFile.filter(
            (i) => i.uid === this.myKey && i.status !== "delete"
          ) || [];
        this.isAdd = this.maxLength > this.fileList.length;
      },
      immediate: true,
    },
    newFormat: {
      handler(newKey = [], oldKey) {
        this.format = newKey.length ? newKey : ["jpg", "jpeg", "png"];
        let mats = [
          "docx",
          "doc",
          "docm",
          "dot",
          "dotx",
          "xl",
          "xls",
          "xlsx",
          "xla",
          "xlam",
          "xlsm",
          "xlt",
          "xltm",
          "xltx",
          "xll",
          "xlm",
          "xla",
        ];
        let typeFile = newKey.filter((x) => mats.indexOf(x) > -1);
        if (typeFile.length) {
          this.uploadType = "file";
        }
      },
      immediate: true,
    },
    size(newSize, oldSize) {
      if (newSize) {
        this.maxSize = newSize;
      }
    },
    max(newMax, oldMax) {
      if (newMax) {
        this.maxLength = newMax;
      }
    },
  },
  methods: {
    //上传成功
    handleSuccess(res, file, files) {
      if (this.maxLength < files.length) {
        this.$Message["warning"]({
          background: true,
          content: `最多上传${this.maxLength}份文件`,
        });
        return;
      }
      let url = `${urlPre}/${urlLink}/${res.data.group}/${res.data.filePath}`;
      this.fileList.push({
        ...res.data,
        ...this.info,
        url,
        status: "finished",
        uid: this.myKey,
        uploadType: this.uploadType,
      });
      this.isAdd = this.maxLength > this.fileList.length;
      this.$emit("getFileList", this.fileList || []);
      this.$Message["success"]({
        background: true,
        content: "上传成功",
      });
    },
    //上传格式错误
    handleFormatError() {
      this.$Message["error"]({
        background: true,
        content: `请上传${this.format.join("、")}格式的文件`,
        duration: 3,
      });
    },
    //超过最大尺寸
    handleMaxSize() {
      this.$Message["error"]({
        background: true,
        content: `上传尺寸最大${this.maxSize}kb`,
      });
    },
    //点击清除按钮 - 批量删除
    clearNowUploadList() {
      this.$Modal.confirm({
        title: "确认删除所有文件吗？",
        onOk: () => {
          this.fileList.map((res, key) => {
            this.delete(res);
          });
          setTimeout(() => {
            this.isAdd = true;
          }, 1000);

          this.$emit("getFileList", this.fileList);
        },
        onCancel: () => {},
      });
    },
    //上传报错
    handleErr(error, file, fileList) {
      this.$Message["error"]({
        background: true,
        content: `上传失败`,
      });
    },
    // 删除单个文件
    handleDelete(item) {
      this.$Modal.confirm({
        title: "确认删除该文件吗？",
        onOk: () => {
          this.delete(item);
        },
        onCancel: () => {},
      });
    },
    //
    delete(item) {
      deleteUpload(item.code).then((res) => {
        if (res.code === "200") {
          deleteDb(item.code).then((resDb) => {
            if (resDb.code === "200") {
              this.fileList = this.fileList.map((file) => {
                if (file.code === item.code) {
                  file.status = "delete";
                }
                return file;
              });
              let len = this.fileList.filter((i) => i.status !== "delete")
                .length;
              this.isAdd = this.maxLength > len;
              this.$emit("getFileList", this.fileList, true); //第三个参数 代表 是否要清空单据录入的图片
            } else {
              this.$Message["error"]({
                background: true,
                content: `删除记录失败${res.mssage}`,
              });
            }
          });
        } else {
          this.$Message["error"]({
            background: true,
            content: `删除文件失败${res.mssage}`,
          });
        }
      });
    },
    handlePreview(item) {
      let index = this.fileList
        .filter((i) => i.status === "finished")
        .findIndex((i) => i.code === item.code);
      this.isPreview = true;
      this.currentIndex = index;
    },
    handleClose() {
      this.isPreview = false;
      this.currentIndex = 0;
    },
  },
  destroyed() {
    this.fileList = [];
  },
};
</script>
<style lang="scss" scoped>
.upload-list {
  display: inline-block;
  width: 146px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  margin-bottom: 10px;
  &:hover {
    .operate-wrap {
      display: block;
    }
  }
}
.upload-list img {
  width: 100%;
  height: 100%;
}
.checkTitle {
  label {
    height: 40px;
    background: #f4f4f4;
    border-radius: 4px;
    line-height: 40px;
  }
  /deep/ .ivu-checkbox {
    display: none !important;
  }
}
.btn-wrap {
  text-align: center;
  width: 146px;
  margin-top: 10px;
}
.clean-btn {
  width: 105px;
  height: 30px;
  background: #0fb0b8;
  border-radius: 4px;
  border: 1px solid #0fb0b8;
  outline: none;
  margin-top: 21px;
}
.operate-wrap {
  width: 146px;
  height: 100px;
  background: #333;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  i {
    font-size: 32px;
    color: #0fb0b8;
    cursor: pointer;
  }
}
.file-list {
  margin-bottom: 10px;
  .file-delete {
    width: 20px;
    height: 20px;
    margin-left: 50px;
  }
}
</style>