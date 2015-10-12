var data = new Array();
var timeout = null;
var liveBookmark = false;

function ClearBookmarks() {
    data = new Array();
}

function Bookmarks() {
    return data;
}

function LiveBookmarks(interval) {
    interval = interval || 100;
    liveBookmark = true;
    timeout = app.setInterval("AddBookmark()", interval);
    timeout.count = 0;
}

function AddBookmark() {
    try {
        if (Bookmarks().length > 0) {
            var lastBookmark = Bookmarks().pop();
            if (parseInt(lastBookmark) == parseInt(this.pageNum)) {
                Bookmarks().push(this.pageNum);
            } else {
                Bookmarks().push(lastBookmark);
                Bookmarks().push(this.pageNum);
            }
        } else {
            Bookmarks().push(this.pageNum);
        }
    }
    catch (ex) {
        app.alert(ex);
    }
}

function GotoLastBookmark() {
    try {
        if (Bookmarks().length > 0) {
            if (timeout) {
                app.clearInterval(timeout);
            }
            var pageNo = Bookmarks().pop();
            this.pageNum = parseInt(pageNo);
            if (liveBookmark) {
                LiveBookmarks(2000);
            }
        }
    }
    catch (ex) {
        app.alert(ex);
    }
}

app.addMenuItem({
    cName: "-",
    cParent: "View",
    cExec: "void(0);"
});

app.addMenuItem({
    cName: "Bookmark &+",
    cParent: "View",
    cExec: "AddBookmark();",
    cEnable: "event.rc= (event.target != null);"
});

app.addMenuItem({
    cName: "Last Bookmark &-",
    cParent: "View",
    cExec: "GotoLastBookmark();",
    cEnable: "event.rc= true;"
});

app.addMenuItem({
    cName: "Clear Bookmark(s) &*",
    cParent: "View",
    cExec: "ClearBookmarks();",
    cEnable: "event.rc= true;"
});

app.addMenuItem({
    cName: "Live Bookmark",
    cParent: "View",
    cExec: "LiveBookmarks();",
    cEnable: "event.rc= true;"
});