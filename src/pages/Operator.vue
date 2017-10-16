<template>
  <div class="operator">
    <h1>
        operator
    </h1>
    <h2>
        RxJS 中有60+个操作符
    </h2>
  </div>
</template>
<script>
  /* eslint-disable */
  const log = console.log.bind(console)
  const group = console.group.bind(console)
  const groupEnd = console.groupEnd.bind(console)
  const warn = console.warn.bind(console)

  import Rx from 'rxjs/Rx'
  import { Observable } from 'rxjs/Observable'


  export default {
    name: 'Operator',
    mounted () {
      //------------------------------------------------------
      group('of')
      // 允许你用逗号分隔的要发出值的列表

      let ofData = Rx.Observable.of(1,2,3,4)
      ofData.subscribe(data => log('of:', data))

      groupEnd()
      //********************************************************
      group('do')
      // 用来调试 Observable
      Rx.Observable.of(1, 2, 3)
       .do(value => {
        console.log('emits every value', value)
       })
       .subscribe(val => log('val', val))

      groupEnd()
      //********************************************************
      group('filter')
      // 可以阻止某些值被发出
      Rx.Observable
        .of(1,2,3,4,5)
        .do(val => console.log('do:', val))
        .filter(val => val % 2 === 0)
        .subscribe(data => console.log('data', data))

      groupEnd()
      //********************************************************
      group('filter')
    }
  }
</script>
<style scoped>

</style>
