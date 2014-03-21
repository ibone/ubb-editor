//IE下光标会丢失
$.ubb_editor.plugin('cursor_bug_for_ie',function(editor){
    var is_ie678 = ! + '\v1';
    if(!is_ie678){
        return;
    }
    var bookmark = null;
    //记录IE的编辑光标
    editor.iframe.attachEvent('onbeforedeactivate', function () {
        var range = editor.iframe_document.selection.createRange();
        bookmark = range.getBookmark();
    });
    //恢复IE的编辑光标
    editor.iframe.attachEvent('onactivate', function () {
        if (bookmark) {
            var range = editor.iframe_document.body.createTextRange();
            range.moveToBookmark(bookmark);
            range.select();
            bookmark = null;
        }
    });
});