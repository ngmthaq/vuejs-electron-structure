<template>
  <div class="main-layout">
    <aside class="main-layout-sidebar">
      <div class="main-layout-sidebar-logo">RESERVATIONS</div>
      <div class="main-layout-sidebar-list">
        <div class="main-layout-sidebar-item" v-for="item in items" :key="item.path">
          <router-link
            :to="{ name: item.name }"
            :class="['main-layout-sidebar-item-link', { active: $route.name === item.name }]"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </aside>
    <main class="main-layout-content">
      <scrollable-wrapper id="main-layout-content" height="calc(100vh - 48px)"><slot></slot></scrollable-wrapper>
    </main>
  </div>
</template>

<script>
import ScrollableWrapper from "@/components/ScrollableWrapper.vue";
export default {
  components: { ScrollableWrapper },
  name: "MainLayout",

  data() {
    return {
      items: Object.values(this._pathConst),
    };
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.1);
}

.main-layout-sidebar {
  width: 300px;
  height: 100%;
  background-color: #242526;
}

.main-layout-sidebar-logo {
  width: 100%;
  height: 64px;
  font-size: 32px;
  color: #fefefe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  user-select: none;
}

.main-layout-sidebar-list {
  height: calc(100vh - 64px);
  width: 100%;
  overflow-y: hidden;
  background-color: #242526;
  transition: all 0.1s linear;
}

.main-layout-sidebar-list:hover {
  overflow-y: scroll;
}

.main-layout-sidebar-list::-webkit-scrollbar {
  width: 0;
}

.main-layout-content {
  margin: 16px;
  width: calc(100vw - 300px - 16px - 16px);
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px 0px #999999;
  padding: 8px;
}

.main-layout-sidebar-item {
  text-align: left;
  margin: 8px;
}

.main-layout-sidebar-item-link {
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  display: block;
  border-radius: 4px;
  color: #fefefe;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.main-layout-sidebar-item-link:hover {
  background-color: rgba($color: #ffffff, $alpha: 0.1);
  padding-left: 20px;
}

.main-layout-sidebar-item-link.active {
  background-color: rgba($color: #ffffff, $alpha: 0.2) !important;
}
</style>
