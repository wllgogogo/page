<template>
  <Modal
    :title="title"
    v-model="flag"
    class-name="vertical-center-modal"
    @on-cancel="handleCancel"
    width="900"
    footer-hide
  >
    <Carousel
      v-model="nowIndex"
      loop
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
      v-if="flag"
    >
      <CarouselItem
        v-for="(item, key) in files.filter((i) => i.status !== 'delete')"
        :key="key"
      >
        <div class="img-wrap">
          <img :src="item.url" />
        </div>
      </CarouselItem>
    </Carousel>
  </Modal>
</template>
<script>
export default {
  name: "adt-preview",
  props: ["files", "index", "visible", "title"],
  data() {
    return {
      flag: false,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover",
      },
      nowIndex: 0,
    };
  },
  watch: {
    index(newIndex) {
      this.flag = true;
      this.nowIndex = newIndex;
    },
    visible(newVisible) {
      this.flag = newVisible;
    },
  },
  methods: {
    handleCancel() {
      this.$emit("handleClose");
      this.flag = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.img-wrap {
  width: 730px;
  height: 500px;
  img {
    width: 100%;
    height: 100%;
  }
}
.ivu-carousel-item {
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
