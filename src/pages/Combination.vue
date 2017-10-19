<template>
  <div class="combination"></div>
</template>
<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'
  export default {
    name: 'Combination',
    mounted () {
      //************************************************************************
      console.group('combineLatest')
      let source1 = Rx.Observable.interval(100)
      .map( val => "source1 " + val ).take(5);

      let source2 = Rx.Observable.interval(50)
      .map( val => "source2 " + val ).take(2);

      let stream$ = Rx.Observable.combineLatest(
          source1,
          source2
      );

      console.groupEnd()
      //************************************************************************
      console.group('concat')

      stream$.subscribe(data => console.log('combineLatest:', data));

      let stream2$ = Rx.Observable.concat(
          source1,
          source2
      );
      stream2$.subscribe(data => console.log('concat:', data));

      console.groupEnd()
      //************************************************************************
      console.group('merge')

      let merge$ = Rx.Observable.merge(
        Rx.Observable.of(1).delay(500),
        Rx.Observable.of(3,2,5)
      )

      let observer = {
        next: data => console.log('merge:', data)
      }

      merge$.subscribe(observer)
      
      console.groupEnd()
      //************************************************************************
      console.group('zip')
      // 场景：如果你真正关心不同 sources 在同一个位置所发出值的区别，假设所有 sources 的第2个响应值，那么你需要 zip() 操作符
      // 以列为基础连接值的。它将采用最小的共同标准，
      // 在这个案例中是2。2,3,4序列中4会被忽略。
      // 正如你在第一个示例中所看见的，它还可以混用不同的异步概念，比如 Promise 和 Observable，
      // 这是因为发生了间隔转换
      Rx.Observable.zip(
        Promise.resolve(1),
        Rx.Observable.of(2,3,4),
        Rx.Observable.of(7)
      ).subscribe({
        next: data => console.log('zip:', data)
      })

      Rx.Observable.zip(
        Rx.Observable.of(1,5),
        Rx.Observable.of(2,3,4),
        Rx.Observable.of(7,9)
      ).subscribe({
        next: data => console.log('zip2:', data)
      })
      
      console.groupEnd()
      //************************************************************************
      console.group('zip')

    }
  }
</script>