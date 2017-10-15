<template>
  <div class="test">
    <h3>test: of</h3>
    <div class="of">
      <ul>
        <li v-for="item in ofArr">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { Observable } from 'rxjs/Observable'

  import 'rxjs/add/observable/of'

  import 'rxjs/add/observable/from'
  import 'rxjs/add/operator/toArray'

  import 'rxjs/add/observable/interval'

  import 'rxjs/add/observable/range'
  import 'rxjs/add/operator/map'
  import 'rxjs/add/operator/mergeAll'

  const ofArr = Observable.of([1, 2, 3, 4, 5, 6, 7, 8])

  export default {
    name: 'test',

    subscriptions: {
      ofArr
    },
    mounted () {
      console.log('ofArr', ofArr)
    }
  }
</script>

