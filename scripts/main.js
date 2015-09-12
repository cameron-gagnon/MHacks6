chrome.runtime.onInstalled.addListener(function () {
    var context = "selection";
    var title = "Mathemorphosize";
    var id = chrome.contextMenus.create({title: title,
                                         contexts: [context],
                                         id: "context" + context});
});


function onClickHandler(e) {
    console.log(e);
    var sel_text = e.selectionText;
    var jax;
    var QUEUE = MathJax.Hub.queue;

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "preview"]);
//,
//            function () {jax = MathJax.Hub.getAllJax("preview")[0]
//    });
/*    MathJax.Hub.Queue(["Text", jax, sel_text]);*/
    popup("../index.html", e);
}

function popup(url, e) {
    chrome.windows.create({'url': url, 'type': 'panel', 'height': 260, 'width': 300, 'top': 150, 'left': 300}, function(newWindow) {
        var windows = chrome.extension.getViews();
        for(var i in windows) {
            if(windows[i].location.pathname == "/index.html") {
                windows[i].setTimeout(function() {
                    windows[i].document.getElementById("userinput").value = e.selectionText;
                }, 1000);
            }
        }
    });
}

//popup("../index.html");

chrome.contextMenus.onClicked.addListener(onClickHandler);
