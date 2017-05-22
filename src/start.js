

	/******************************************************************************/

	// 使用RxJS创建一个可观察对象
	Rx.Observable.fromEvent(btn, 'click')
	.subscribe(() => console.log('Click!'));

	/******************************************************************************/

	// 使用RxJS来隔离你的状态
	//scan操作符和数组中reduce方法的类似， 它需要一个传递给回调函数的参数值。 回调函数的返回值将成为下一次回调函数运行时要传递的下一个参数值
	let count = 0;
	Rx.Observable.fromEvent(btnPurity, 'click')
	.scan(count => count + 1, 0)
	.subscribe(count => console.log(`Click ${count} times`));

	/******************************************************************************/

	// 每秒最多只能点击一次的实现
	// 其他的流操作符是filter, delay, debounceTime, take, takeUntil, distinct, distinctUntilChanged 
	let countSecond = 0;
	Rx.Observable.fromEvent(btnFlow, 'click')
	.throttle(1000)
	.scan(countSecond => countSecond + 1, 0)
	.subscribe(countSecond => console.log(`Clicked ${countSecond} times`));

	let keyup = Rx.Observable.fromEvent(input, 'keyup')
	.map(e => e.target.value)
	.filter(text => !!text)
	.throttle(1000)
	.distinctUntilChanged()
	.subscribe(text => console.log(text))
	// console.log(keyup)
	
	// 通过可观察对象来转化值
	// 其他的值生产者还有 pluck, pairwise, sample 等等.
	let countValue = 0;
	Rx.Observable.fromEvent(btnValue, 'click')
	.throttle(1000)
	.map(event => event.clientX)
	.scan((countValue, clientX) => count + clientX, 0)
	.subscribe(countValue => console.log('countValue:', countValue))


	/******************************************************************************/

	/*  observable可观察对象. */
	log('just before subscribe');
	// observable.subscribe()意味着给我任意多个值，同步也好异步也罢
	let observableStart = Rx.Observable.create(function(observer) {
		observer.next(1);
		observer.next(2);
		observer.next(3);
		setTimeout(() => {
			observer.next(4);
			// observer._onCompleted();
			// observer.complete();
		}, 1000);
	})
/*	observableStart.subscribe( {
		next: x => console.log('got value ' + x),
		error: err => console.error('something wrong occurred: ' + err),
		complete: () => console.log('done')
	});*/
	let subscription = observableStart.subscribe( x => {
		log(`got Value: ${x}`);
	})
	log('just after subscribe');
	log('subscription:', subscription)

	/******************************************************************************/

	// observable.subscribe()意味着给我任意多个值，同步也好异步也罢
	let foo = Rx.Observable.create(function(observer) {
		console.log('hello')
		observer.next(42)
	});
	info('before')
	foo.subscribe(function(x) {
		console.log(x)
	})
	info('after')
	foo.subscribe(function(y) {
		console.log(y)
	})

	/******************************************************************************/

	/*let observableInterval = Rx.Observable.create(function subscribe(observer) {
		let intervalID = setInterval(() => {
			observer.next('setInterval 1000')
		}, 1000)

		return function unsubscribe() {
			clearInterval(intervalID)
		}
	});
	let subscriptionInterval = observableInterval.subscribe(string => {
		log(string)
	})*/
	// subscriptionInterval.unsubscribe()
	// setTimeout(() => subscriptionInterval.unsubscribe(), 3000);
	
	/******************************************************************************/

	/*. github demo */
	// edition one
	let requestStream = Rx.Observable.just('https://api.github.com/users');
	// log('requestStream:',requestStream);
	requestStream.subscribe(function(requestUrl) {
		let responseStream = Rx.Observable.create(observer => {
			console.log('observer', observer)
			$.getJSON(requestUrl)
			.done(response => { 
				log('response', response)
				observer.onNext(response);
			})
			.fail((jqXHR, status, error) => {
				log('jqXHR, status, error', jqXHR, status, error);
				observer.onError(error);
			})
			.always(() => {
				log('completed...')
				observer.onCompleted();
			})
		});

		responseStream.subscribe(response => {
			console.log('subcribe-response:', response)
		})
	})
	// edition two
	let responseStream = requestStream
	.flatMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)));
	
	responseStream.subscribe(response => {
		log('response-map:', response);
	})

	/******************************************************************************/
