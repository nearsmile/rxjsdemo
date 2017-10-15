<template>
  <div class="observable">
    <h1>
      Observable
    </h1>
  </div>
</template>
<script>
  import Rx from 'rxjs/Rx'

  export default {
    name: 'Observable',

    mounted () {
      Rx.Observable.create(observer => {
        observer.next(1)
      }).subscribe(data => {
        console.log('Data', data)
      })
    }
  }
</script>
