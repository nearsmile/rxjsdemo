<template>
  <div class="home">
    <ul class="home">
      <router-link tag="li"
        class="home-item ellipsis"
        :to="item.link"
        :key="index"
        v-for="(item, index) in routes">
        {{ item.name }}
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        routees: []
      }
    },
    computed: {
      routes () {
        const files = require.context('../pages', false, /\.vue$/)
        const result = []
        files.keys().forEach(key => {
          let name = key.replace(/(\.\/|\.vue)/g, '')
          if (name !== 'home') {
            result.push({
              name,
              link: `/${name}`
            })
          }
        })
        return result
      }
    }
  }
</script>
<style scoped>
  .home-item {
    width: 25%;
    height: 1.2rem;
    line-height: 1rem;
    float: left;
    text-align: center;
    border: solid #eee;
    border-width: 0 1px 1px 0;
  }
</style>
