//当工具栏被滚动到看不见的时候...
    if(false&&!self.toolbarBindScrollEvent){
        $(window).bind("scroll", function () {
            self.toolbarBindScrollEvent = true;
            var docScrollTop = $(document).scrollTop();
            if (!self.toolbarOffsetTop) {
                self.toolbarOffsetTop = $('#' + self.config.toolbarId).offset().top;
            }
            if (self.toolbarOffsetTop <= docScrollTop) {
                if ($.browser.msie && $.browser.version==="6.0") {
                    //to do
                } else {
                    if (!self.toolbarPositionFixed) {
                        self.toolbarPositionFixed = true;
                        $('#' + self.config.toolbarId).css({
                            position : "fixed",
                            top : "38px",
                            width : $('#' + self.config.toolbarId).width() + "px"
                        });
                    }
                }
            } else {
                if (self.toolbarPositionFixed) {
                    self.toolbarPositionFixed = false;
                    $('#' + self.config.toolbarId).css({
                        position : "relative",
                        top : "0"
                    });
                }
            }
        });
    }