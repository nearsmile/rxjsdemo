<template>
  <div class="observable">
    <h1>
      Observable
    </h1>
    <button ref="speechBtn">
      点击 说话
    </button>
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

  import 'rxjs/add/observable/from'
  import 'rxjs/add/observable/fromEvent'
  import 'rxjs/add/observable/interval'

  import 'rxjs/add/operator/switchMap'
  import 'rxjs/add/operator/map'
  import 'rxjs/add/operator/concatMap'
  import 'rxjs/add/operator/take'
  import 'rxjs/add/operator/publish'
  import 'rxjs/add/operator/concat'
  
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
      // Observable 包装
      /**
       * 1）数据是通过调用 next()来发送的 
       * 2）如果没有更多的数据要发送则调用 complete()
       * 3）如果有需要的话，定义一个清理函数可以通过 unsubscribe() 来调用
       * 4）在合适的地方通过调用 error() 来进行错误处理。
       */
      group('包装 ajax 调用')
      // 需要做的三件事: 发出数据、错误处理和关闭流
      Observable.create(observer => {
        let request = new XMLHttpRequest()

        request.open('GET', 'url')
        request.onload = () => {
          if (request.status === 200) {
            observer.next(request.response)
            observer.complete()
          } else {
            observer.error('error happened')
          }
        }
        
        request.onerror = () => {
          observer.error('error happened')
        }

        request.send()
      }).subscribe(data => console.log('ajax-data:', data))

      // 包装语音音频 API
      /**
       * 整体逻辑:
       * 点击按钮激活 heyClick 
       * speechRecognition 监听我们说了什么并把结果发送给 heyClick 的转换逻辑，
       * 转换逻辑的结果将由 say Observable 发出声音
       */
      /**
       * 语音识别流
       * 这将激活浏览器的麦克风并记录我们的语音
       * 这段代码建立了语音识别 API，然后等待响应，并在响应一次后完成流
       * 可以通过调用 speechRecognition.unsubscribe() 来清理系统资源
       */
      const speechRecognition = new Observable(observer => {
        const speech = new webkitSpeechRecognition()

        speech.onresult = (event) => {
          observer.next(event)
          observer.complete()
        }

        speech.start()
        // 定义一个函数用来清理
        return () => {
          speech.stop()
        }
      })
      // 负责发出你想要表达的语音
      const say = (text) => new Observable(observer => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onresult = (event) => {
          observer.next(event)
          observer.complete()
        }
        speechSynthesis.speak(utterance)
      })

      const button = this.$refs.speechBtn
      const heyClick = Observable.fromEvent(button, 'click')
      // 主体流 
     /*  heyClick.switchMap(e => speechRecognition)
        .map(e => e.results[0][0].transcript)
        .map(text => {
          switch (text) {
            case 'I want':
              return 'candy'
            case 'hi':
            case 'ice ice':
              return 'baby'
            case 'hello':
              return 'Is it me you are looking for'
            case 'make me a sandwich':
            case 'get me a sandwich':
              return 'do it yo damn self'
            case 'why are you being so sexist':
              return 'you made me that way'
            default:
              return `I don't understand: "${text}"`
          }
        })
        .concatMap(say)
        .subscribe(e => console.log('speech:', e))
    */
      groupEnd()
      // ---------------------------------------------------------
      group('热&冷的 Observables')
      let coldStream = Observable.of(1,2,3)

      coldStream.subscribe(
        data => log('cold-data', data),
        error => log('cold-error', ),
        complete => log('cold-complete')
      )
      coldStream.subscribe(
        data => log('cold-data2', data),
        error => log('cold-error2', ),
        complete => log('cold-complete2')
      )
      groupEnd()
    // ---------------------------------------------------------
    group('由冷及热 - 凯蒂·佩里模式')

    let publisher$ = Rx.Observable
      .interval(1000)
      .take(5)
      .publish()

    publisher$.subscribe(
      data => console.log('publisher from first minute', data),
      err => console.log('publisher-first-err', err),
      () => console.log('publisher-first, complete')
    )

    setTimeout(() => {
      publisher$.subscribe(
        data => console.log('publisher from 2nd minute', data),
        err => console.log('publisher-2nd-err', err),
        () => console.log('publisher-2nd, complete')
      )
    }, 3000)

    publisher$.connect()
    groupEnd()
    // ---------------------------------------------------------
    console.clear()
    group('暖的 observable')
    /**
     * refCount() 操作符确保 observable 变成暖的，
     * 也就是不会发出值直到 sub1 订阅了流。
     * 另一方面 sub2 是后加入的，
     * 也就是说订阅接收的是当前的值，而无法接收订阅之前的值
     */
    let obs = Rx.Observable
      .interval(1000)
      .take(3)
      .publish()
      .refCount()

      setTimeout(() => {
        obs.subscribe(data => console.log('hot-sub1', data))
      }, 1100)
      setTimeout(() => {
        obs.subscribe(data => console.log('hot-sub2', data))
      }, 2100)

    groupEnd()
    // ---------------------------------------------------------
    }
  }
</script>
