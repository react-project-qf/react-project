export default (url, callback) => {
	feach(url)
		.then(response => response.json())
		.then(res => {
			callback(res)
		})
}