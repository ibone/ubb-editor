$.ubb_editor.set_config('btn_size'
    {
        show : function (self) {
            if (!self.FontSizeWrapDom || self.FontSizeWrapDom.length === 0) {
                var html = ''+
                    '<div class="fontSizeWrap">'+
                        '<a btntype="btnFontSizeAction" size="1" style="font-size:12px;" href="javascript:;" title="小号字体" unselectable="on">小号字体</a>'+
                        '<a btntype="btnFontSizeAction" size="2" style="font-size:14px;" href="javascript:;" title="标准字体" unselectable="on">标准字体</a>'+
                        '<a btntype="btnFontSizeAction" size="3" style="font-size:16px;" href="javascript:;" title="大号字体" unselectable="on">大号字体</a>'+
                        '<a btntype="btnFontSizeAction" size="4" style="font-size:18px;" href="javascript:;" title="特大字体" unselectable="on">特大字体</a>'+
                    '</div>';
                var config = self.config;
                $('#' + config.toolbarId).append(html);
                self.FontSizeWrapDom = $('#' + config.toolbarId + ' .fontSizeWrap');
                if (self.curVisiableDom) {
                    self.curVisiableDom.hide();
                }
                self.curVisiableDom = self.FontSizeWrapDom;
            } else {
                if (self.curVisiableDom === self.FontSizeWrapDom) {
                    self.FontSizeWrapDom.hide();
                    self.curVisiableDom = null;
                } else {
                    if (self.curVisiableDom) {
                        self.curVisiableDom.hide();
                    }
                    self.FontSizeWrapDom.show();
                    self.curVisiableDom = self.FontSizeWrapDom;
                }
            }
        },
        selectionStyleFun : function (config, curElm, $parents) {
            var tagName = curElm.nodeName.toLowerCase();
            var val = null;
            var reg_css = /size/i;
            val = $(curElm).attr("size") || null;
            if (!val && $parents) {
                var length = $parents.length;
                for (var i = 0; i < length; i++) {
                    val = $parents.eq(i).attr("size") || null;
                    if (val) {
                        break;
                    }
                }
            }
            if (!self.curFontSize) {
                self.curFontSize = null;
            }
            if (val != self.curFontSize) {
                if (val == null) {
                    $('#' + self.config.toolbarId + ' .font-size a').text("标准字体");
                    self.curFontSize = null;
                } else {
                    $('#' + self.config.toolbarId + ' .font-size a').text(self.config.btnFontSize.data["f" + val]);
                    self.curFontSize = val;
                }
            }
        },
        data : {
            "f1" : "小号字体",
            "f2" : "标准字体",
            "f3" : "大号字体",
            "f4" : "特大字体"
        },
        html :  '<div class="font-btns font-size">'+
                    '<a href="javascript:;" btntype="btnFontSize" title="字号" unselectable="on">标准字体</a>'+
                '</div>',
        exec : function (self, $srcElement) {
            var size = $srcElement.attr("size");
            self.execCommand("fontsize", size);
            $('#' + self.config.toolbarId + ' .font-size a').text($srcElement.attr("title"));
            self.curFontSize = size;
            self.curVisiableDom.hide();
            self.curVisiableDom = null;
        }
    }
);
