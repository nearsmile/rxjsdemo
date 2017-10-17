<template>
  <div id="app">
    <div class="app-nav">
      {{ navTitle }}
      <button class="app-nav-back"
        v-if="$route.name !== 'home'"
        @click="$router.go(-1)">
        {{ navBack }}
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    navTitle () {
      return this.$route.name
    },
    navBack () {
      return '返回'
    }
  }
}
</script>
<style>
  .app-nav {
    position: relative;
    text-align: center;
    font-size: 18px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e1e1e1;
  }

  .app-nav-back {
    position: absolute;
    left: 0;
    top: 0;
    width: 66px;
    font-size: 14px;
    padding-left: 20px;
    color: #a1a1a1;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .app-nav-back::before {
    content: '';
    position: absolute;
    left: 15px;
    top: calc(50% - 6px);
    width: 10px;
    height: 10px;
    border: solid #ddd;
    border-width: 1px 0 0 1px;
    transform: rotate(-45deg);
  }
</style>