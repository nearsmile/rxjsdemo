<template>
  <div class="observable">
    <h1>
      Observable
    </h1>
  </div>
</template>
<script>
  import { Observable } from 'rxjs/Observable'

  import 'rxjs/add/observable/from'

  const log = console.log.bind(console)
  const group = console.group.bind(console)
  const groupEnd = console.groupEnd.bind(console)
  // const warn = console.warn.bind(console)
  export default {
    name: 'Observable',

    mounted () {
      // --------------------------------------------------
      group('stream.subscribe(fnValue, fnError, fnComplete)')
      // Observer (观察者)
      // Observer 只是一个拥有 next、error 和 complete 三个方法的普通对象
      Observable.create(observer => {
        observer.next(1)
        // observer.error('error message')
        observer.next(22)
        observer.complete()
        observer.next(33)
      }).subscribe(data => {
        console.log('Data', data)
      }, error => {
        log('error:', error)
      }, complete => {
        log('complete', complete)
      })
      groupEnd()
      // --------------------------------------------------
      group('Unsubscribe')
      /**
       * 定义一个清理函数
       * 通过调用 subscription.unsubscribe() 隐式的调用清理函数
       */

      /* eslint-disable new-cap */
      let stream$ = new Observable.create((observer) => {
        let i = 0
        let id = setInterval(() => {
          observer.next(i++)
        }, 100)

        return function () {
          clearInterval(id)
        }
      })

      let subscription = stream$.subscribe((value) => {
        console.log('Unsubscribe:', value)
      })

      setTimeout(() => {
        subscription.unsubscribe() // 在这我们调用了清理函数
      }, 300)

      groupEnd()
      // --------------------------------------------------
      group('Producer (生产者)')
      // 大多数 Observables 都是通过辅助方法创建的，
      // 在这些方法中会有内部的 Producer 来生产值，
      // 这些值通过 observer 的 observer.next 方法发出
      class Producer {
        constructor () {
          this.i = 0
        }

        nextValue () {
          return this.i++
        }
      }
      const producer = new Producer()
      // 使用 Producer
      Observable.create(observer => {
        observer.next(producer.nextValue())
        observer.next(producer.nextValue())
      }).subscribe(data => {
        log('producer-data:', data)
      })

      groupEnd()
      // --------------------------------------------------
      group('Observable vs Promise')

      Observable.from([1, 2, 3])
        .subscribe(value => {
          log('vs-observable:', value)
        })
      // Promises 欠缺如下能力：
      // 不能生产多个值
      // 不能重试
      // 不能真正地玩转其它异步思想
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([1, 2, 3])
        })
      })
      promise.then(value => {
        log('vs-promise:', value)
      })

      groupEnd()
      // --------------------------------------------------
    }
  }
</script>
