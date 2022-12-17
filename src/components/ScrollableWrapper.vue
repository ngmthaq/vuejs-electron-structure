<template>
  <div class="scrollable">
    <div class="scrollable-content-wrapper">
      <div class="scrollable-content" :id="id" :style="{ height: height }">
        <slot></slot>
        <div class="scroll-bar">
          <div class="thumb"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollableWrapper",

  data() {
    return {
      isTrackingScroll: false,
      normalizedPosition: 0,
      contentPosition: 0,
    };
  },

  props: {
    height: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },
  },

  methods: {
    calcScrollBar() {
      let scrollableWrapper = document.querySelector("#" + this.id);
      let scrollBar = scrollableWrapper.querySelector(".scroll-bar");
      let thumb = scrollableWrapper.querySelector(".thumb");
      let scrollTop = scrollableWrapper.scrollTop;
      let scrollHeight = scrollableWrapper.scrollHeight;
      let clientHeight = scrollableWrapper.clientHeight;
      let thumbHeightPercent = (clientHeight / scrollHeight) * 100;
      let thumbOffsetTopPercent = (scrollTop / scrollHeight) * 100;
      let thumbOffsetTop = (scrollBar.clientHeight * thumbOffsetTopPercent) / 100;
      let thumbHeight = (scrollBar.clientHeight * thumbHeightPercent) / 100;

      thumb.style.height = thumbHeight + "px";
      thumb.style.top = thumbOffsetTop + "px";

      thumb.addEventListener("mousedown", e => {
        this.isTrackingScroll = true;
        this.normalizedPosition = e.pageY;
        this.contentPosition = scrollableWrapper.scrollTop;
      });

      window.addEventListener("mouseup", e => {
        this.isTrackingScroll = false;
      });

      window.addEventListener("mousemove", e => {
        if (this.isTrackingScroll) {
          let scrollContainer = document.querySelector(".scrollable-content-wrapper");
          let mouseDifferential = e.pageY - this.normalizedPosition;
          let scrollEquivalent = mouseDifferential * (scrollableWrapper.scrollHeight / scrollContainer.offsetHeight);
          scrollableWrapper.scrollTop = this.contentPosition + scrollEquivalent;
        }
      });
    },
  },

  created() {
    window.addEventListener("resize", this.calcScrollBar);
  },

  destroyed() {
    window.removeEventListener("resize", this.calcScrollBar);
  },

  mounted() {
    this.calcScrollBar();
    document.querySelector("#" + this.id).addEventListener("scroll", this.calcScrollBar);
  },
};
</script>

<style lang="scss" scoped>
.scrollable-content-wrapper {
  position: relative;
}

.scrollable-content {
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.scrollable-content:hover .scroll-bar {
  opacity: 1;
}

.scroll-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 8px;
  background-color: #f1f1f1;
  border-radius: 4px;
  opacity: 0;
  transition: all ease-in-out 0.1s;

  & .thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #cecece;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
