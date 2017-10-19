<template>
  <div class="math_operator"></div>
</template>
<script>
  /* eslint-disable */
  import Rx from 'rxjs/Rx'
  export default {
    name: 'MathOperator',
    mounted () {
      console.group('max')
      let observer = {
        next: data => console.log(data)
      }
      let comparer = (x, y) => x > y ? 1 : x < y ? -1 : 0
      Rx.Observable.of(5,3,9,-4)
        .max(comparer)
        .subscribe(observer)

      console.groupEnd()
      //---------------------------------------------------------------
      console.group('reduce')

      Rx.Observable.of({name: 'apple'}, { age: 11 })
        .reduce((acc, curr) => Object.assign({}, acc, curr))
        .subscribe(observer)

      Rx.Observable.of(3, 6, 9)
        .map(x => { return {sum: x, counter: 1} })
        .reduce((acc, curr) => {
          return Object.assign({}, acc, { sum: acc.sum + curr.sum, counter: acc.counter + 1 })
        })
        .map(x => x.sum / x.counter)
        .subscribe(observer)

      console.groupEnd()
      //---------------------------------------------------------------
      // console.group('reduce')
    }
  }
</script>
