import $ from 'jquery'
export default function(url, json, caback) {
	$.ajax({
		url: url,
		type: "POST",
		dataType: "JSON",
		data: json,
		success: caback
	})

}