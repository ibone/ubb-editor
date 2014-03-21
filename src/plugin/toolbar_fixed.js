$.ubb_editor.plugin('edit',function(editor){
    //当工具栏被滚动到看不见的时候...
    if(false&&!editor.toolbarBindScrollEvent){
        $(window).bind("scroll", function () {
            editor.toolbarBindScrollEvent = true;
            var docScrollTop = $(document).scrollTop();
            if (!editor.toolbarOffsetTop) {
                editor.toolbarOffsetTop = editor.$toolbar.offset().top;
            }
            if (editor.toolbarOffsetTop <= docScrollTop) {
                if ($.browser.msie && $.browser.version==="6.0") {
                    //to do
                } else {
                    if (!editor.toolbarPositionFixed) {
                        editor.toolbarPositionFixed = true;
                        editor.$toolbar.css({
                            position : "fixed",
                            top : "38px",
                            width : editor.$toolbar.width() + "px"
                        });
                    }
                }
            } else {
                if (editor.toolbarPositionFixed) {
                    editor.toolbarPositionFixed = false;
                    editor.$toolbar.css({
                        position : "relative",
                        top : "0"
                    });
                }
            }
        });
    }
}