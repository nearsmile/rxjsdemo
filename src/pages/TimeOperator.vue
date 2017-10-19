<template>
  <div class="time_operator"></div>
</template>
<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'
  import 'rx-devtools/add/operator/debug'

  export default {
    name: 'TimeOperator',
    mounted () {
      // timer 是个有趣的操作符，它可以有多种行为，这取决于你如何使用它
      // Rx.Observable.timer([initial delay],[thereafter])

      // 一次性的，因为并没有规定何时发出下一个值
      Rx.Observable.timer(1000)
        .subscribe(data => console.log('timer-data', data))
      
      // 会根据第二个参数持续性的发出值
      Rx.Observable
        .timer(2000, 500)
        .take(3)
        .subscribe(data => console.log('timer width args', data))
      
      // delay() 操作符只是简单地延迟每个要发出的值
      // delay 操作符可以在很多地方使用，但其中一个很好的场景是错误处理，尤其是当网络不稳定时我们想要在x毫秒后重试整个流：
      let startTime = new Date()
      Rx.Observable
        .interval(1000)
        .take(3)
        .delay(300)
        .subscribe(x => {
          console.log('x:', x, 'delay:',new Date() - startTime)
        })
    }
  }
</script>
