
/******************************************************************************/

	// GitHub 推荐消息
	// 不管 是点击刷新按钮"还是"第一次打开页面，都可以产生获得“我可能感兴趣的人”的数据的GitHub的请求流
	let refreshClickStream = Rx.Observable.fromEvent(btnRefresh, 'click');
	let close1ClickStream = Rx.Observable.fromEvent(btnCloseSuggestion, 'click');


	let refreshRequestStream = refreshClickStream
	.map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`);

	let startupRequestStream = Rx.Observable.just('https://api.github.com/users');

	let refreshReqStream = Rx.Observable.merge(
		refreshRequestStream, startupRequestStream
	);
	// 第二种简便写法
	let onRefresh = refreshClickStream
	.map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
	.merge(Rx.Observable.just('https://api.github.com/users'));
	//  第三种 更简便
	let onRefreshs = refreshClickStream
	.map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
	.startWith('https://api.github.com/users')

	// 第四种 最简洁 
	// 将 startWith() 紧接在refreshClickStream之后，在页面打开后就模拟一次点击
	let onRefreshes = refreshClickStream.startWith('startup click')
	.merge(close1ClickStream)
	.map(() => `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`)
	
	// 第二种写法 请求数据
	onRefresh.subscribe((data) => {
		log('url-data:', data)
	})

	// 请求数据
	let onRefreshData = onRefreshes
	.flatMap(requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl)));
	// 获取数据
	onRefreshData.subscribe(response => {
		log('onRefreshData:', response);
	})
	let suggestion1Stream = onRefreshData
	.map(listUsers => listUsers[Math.floor(Math.random() * listUsers.length)])
	.merge(
		refreshClickStream.map(() => null)
	)
	.startWith(null);

	// log('suggestion1Stream:', suggestion1Stream);
	suggestion1Stream.subscribe(suggestion => {
		if (suggestion === null) {
			log('suggestion-null', suggestion);
		} else {
			log('suggestion:', suggestion)
		}
	})



















