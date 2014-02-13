$.ubb_editor.set_config('btn_bold'
    {
        exec : function (self, $srcElement) {
            if ($srcElement.parent().hasClass("font-bold-active")) {
                $('#' + self.config.toolbarId + ' .font-bold').removeClass("font-bold-active");
            } else {
                $('#' + self.config.toolbarId + ' .font-bold').addClass("font-bold-active");
            }
            self.execCommand("bold", "");
        },
        selectionStyleFun : function (self, curElm, $parents) {
            var tagName = curElm.nodeName.toLowerCase();
            var reg_tagName = {
                "b" : true,
                "strong" : true
            };
            var reg_css = /bold/i;
            var outerHTML = curElm.outerHTML.match(/\<[^\>]+\>/)[0];
            var val = false;
            
            if (reg_tagName[tagName] || reg_css.test(outerHTML)) {
                val = true;
            }
            if (!val && $parents) {
                var length = $parents.length
                    for (var i = 0; i < length; i++) {
                        var curDom = $parents[i];
                        var tagName = curDom.nodeName.toLowerCase();
                        var outerHTML = curDom.outerHTML.match(/\<[^\>]+\>/)[0];
                        if (reg_tagName[tagName] || reg_css.test(outerHTML)) {
                            val = true;
                            break;
                        }
                    }
            }
            
            var btnDom = $('#' + self.config.toolbarId + ' .font-bold');
            var hasBold = btnDom.hasClass("font-bold-active");
            if (val && !hasBold) {
                $('#' + self.config.toolbarId + ' .font-bold').addClass("font-bold-active");
            }
            if (!val && hasBold) {
                $('#' + self.config.toolbarId + ' .font-bold').removeClass("font-bold-active");
            }
        },
        html :  '<div class="font-btns font-bold">'+
                    '<a href="javascript:;" btntype="btnFontBold" title="粗体" unselectable="on">粗体</a>'+
                '</div>'
    }
);
