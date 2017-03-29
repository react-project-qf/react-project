export default (url, callback) => {
	fetch(url)
		.then(response => response.json())
		.then(res => {
			callback(res)
		})
}
