<template>
    <div v-show="isShow" class="modal-container" :style="{ zIndex: _appConst.zIndex.modal }">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary"></b-spinner>
    </div>
</template>

<script>
export default {
    name: "PrimaryLoading",

    computed: {
        isShow() {
            return this.$store.getters.getIsLoading;
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #000000, $alpha: 0.3);
}
</style>
