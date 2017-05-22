
warn('rulejs-start:');
group('demoA:');

let observers = Rx.Observable.create(observer => {
	observer.next(1);
})
.startWith(null)
.subscribe(data => {
		log('demoA-subscribe', data)
	})
	// .dispose()

groupEnd()