function checkForValidPage(tabId, changeInfo, tab) {  
  if (tab.url.indexOf('appspot.com') > -1) {    
    chrome.pageAction.show(tabId);        
  }
};

function isCorrectUrl(url,appId){
	if(url.indexOf("appengine.google.com")>-1 && (url.indexOf("app_id=s~"+appId)>-1 || url.indexOf("app_id="+appId)>-1>-1)){
		return true;
	}else{
		return false;
	}		
}

function goToAdmin(appId) {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isCorrectUrl(tab.url,appId)) {
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    chrome.tabs.create({url: "http://appengine.google.com/dashboard?app_id="+appId});
  });
}


chrome.pageAction.onClicked.addListener(
 	function(tab) {
    		goToAdmin(tab.url.substring(7,tab.url.indexOf('appspot.com')-1));
    	});           

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidPage);