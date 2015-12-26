chrome.cookies.onChanged.addListener(function(info) {
	if(info.cookie.name.indexOf("auth") != -1) return;
	var url = "http" + (info.cookie.secure ? "s" : "") + "://" + info.cookie.domain +info.cookie.path;
	chrome.cookies.remove({"url": url, "name": info.cookie.name})
});
