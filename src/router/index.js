import Vue from 'vue'
import Router from 'vue-router'

const files = require.context('../pages', false, /\.vue$/)
const routes = []

files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\.vue)/g, '')

  routes.push({
    path: `/${name}`,
    name,
    component: require(`@/pages/${name}`).default
  })
})

routes.push({
  path: '*',
  redirect: '/home'
})

Vue.use(Router)

const router = new Router({
  routes
})

router.afterEach(route => {
  console.clear()
})

export default router
