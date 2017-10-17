<template>
  <div class="ajax">
    <h1>Ajax</h1>
    <div id="result"></div>
  </div>
</template>
<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'

  export default {
    name: 'Ajax',
    mounted () {
      //*************************************************************************************
      // 除了 url 属性外我们显示地指定了一堆配置
      // ajax 操作符内部是这样运行的
      // 执行 ajaxObservable 中的 XHR 的默认工厂函数，并把 withCredentials 默认设置为 true
      let person$ = Rx.Observable
        .ajax({
          url: 'http://swapi.co/api/people/1',
          crossDomain: true,
          createXHR () {
            return new XMLHttpRequest()
          }
        })
        .map(e => e.response)

      const subscription = person$
        .subscribe(res => {
          let element = document.getElementById('result')
          element.innerHTML = res.name
          console.log('res', res)
        })
      //*************************************************************************************
      // 1. fetch api 是基于 promise 的，然而使用 .from() RxJS 允许我们输入一个 promise 作为参数并将其转换为 Observable 。
      // 2. 请求回来的结果是一个 response 对象，需要将它转换成 JSON 。
      //   调用 json() 方法可以完成这项工作，但 json() 返回的也是 Promise 。
      //   所以我们需要再次使用 from() 操作符。但在一个 Observable 内再创建一个 Observable 的话会形成嵌套的 Observable，
      //   这不是我们想要的，我们要的只是 JSON 。所以我们使用一个叫做 flatMap() 的操作符来修复它
      const fetchSubscription = Rx.Observable
        .from(fetch('http://swapi.co/api/people/1'))
        .flatMap(res => Rx.Observable.from(res.json()))
        .subscribe(fetchRes => {
          console.log('fetch sub', fetchRes)
        })
      //*************************************************************************************
    }
  }
</script>
