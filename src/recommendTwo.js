	// GitHub 推荐消息
	// 不管 是点击刷新按钮"还是"第一次打开页面，都可以产生获得“我可能感兴趣的人”的数据的GitHub的请求流
	let refreshClickStream = Rx.Observable.fromEvent(btnRefresh, 'click');
	let close1ClickStream = Rx.Observable.fromEvent(btnCloseSuggestion, 'click');

	let requestStreamRefresh = refreshClickStream
		.startWith('startup click')
		.merge(close1ClickStream)
		.map(() => `https://api.github.com/users?since=${Math.floor(Math.random * 500)}`)

	let responseStreamRefresh = requestStreamRefresh
		.flatMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)))

	let suggestion1Stream = close1ClickStream 
		.startWith('startup click')
		.combineLatest(responseStreamRefresh, (click, listUsers) => listUsers[Math.floor(Math.random() * listUsers.length)])
		.merge(refreshClickStream.map(() => null))
		.startWith(null)
		.subscribe(suggestion => {
			if (suggestion === null) {
				log('suggestion:', suggestion)
			} else {
				log('suggestion-data:', suggestion)
			}
		})

