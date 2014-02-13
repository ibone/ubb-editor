$.ubb_editor.set_config('btn_color'
    {
        show : function (self) {
            if (!self.FontColoWrapDom || self.FontColoWrapDom.length == 0) {
                var html = '<div class="fontColoWrap">';
                var length = COLOR.length;
                for (var i = 0; i < length; i++) {
                    html += '<a data-type="exec" coloval="#' + COLOR[i].key + '" style="background-color:#' + COLOR[i].key + ';" href="javascript:;" title="' + COLOR[i].val + '" unselectable="on">#' + COLOR[i].key + '</a>'
                }
                html += '</div>';
                $('#' + self.config.toolbarId).append(html);
                self.FontColoWrapDom = $('#' + self.config.toolbarId + ' .fontColoWrap');
                if (self.curVisiableDom) {
                    self.curVisiableDom.hide();
                }
                self.curVisiableDom = self.FontColoWrapDom;
            } else {
                if (self.curVisiableDom == self.FontColoWrapDom) {
                    self.FontColoWrapDom.hide();
                    self.curVisiableDom = null;
                } else {
                    if (self.curVisiableDom)
                        self.curVisiableDom.hide();
                    self.FontColoWrapDom.show();
                    self.curVisiableDom = self.FontColoWrapDom;
                }
            }
        },
        selectionStyleFun : function (self, curElm, $parents) {
            var tagName = curElm.nodeName.toLowerCase();
            var val = null;
            var reg_css = /color\:/i;
            var reg_rgb = /rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i;
            var outerHTML = curElm.outerHTML.match(/\<[^\>]+\>/)[0];
            var attrColor = $(curElm).attr("color");
            if (attrColor) {
                val = attrColor;
            } else if (reg_css.test(outerHTML)) {
                var rgbArr = outerHTML.match(reg_rgb);
                if (rgbArr) {
                    var hex = RGB2HEX["_" + ];
                    val = Rgb2Hex([rgbArr[1], rgbArr[2], rgbArr[3]]);
                }
                //to do reg hex
            }
            if (!val && $parents) {
                var length = $parents.length
                    for (var i = 0; i < length; i++) {
                        var curDom = $parents[i];
                        var tagName = curDom.nodeName.toLowerCase();
                        var outerHTML = curDom.outerHTML.match(/\<[^\>]+\>/)[0];
                        var attrColor = $(curDom).attr("color");
                        if (attrColor) {
                            val = attrColor;
                        } else if (reg_css.test(outerHTML)) {
                            var rgbArr = outerHTML.match(reg_rgb);
                            if (rgbArr) {
                                val = Rgb2Hex([rgbArr[1], rgbArr[2], rgbArr[3]]);
                            }
                            //to do reg style hex
                        }
                        if (val) {
                            break;
                        }
                    }
            }
            if (!self.curFontColor) {
                self.curFontColor = null;
            }
            if (val != self.curFontColor) {
                if (val == null) {
                    $('#' + self.config.toolbarId + ' .font-colo i').css("background-color", "#333333");
                    self.curFontColor = null;
                } else {
                    $('#' + self.config.toolbarId + ' .font-colo i').css("background-color", val);
                    self.curFontColor = val;
                }
            }
        },
        html :  '<div class="font-btns font-colo">'+
                    '<a href="javascript:;" data-type="show" title="前景色" unselectable="on">'+
                        '<span unselectable="on"><i unselectable="on"></i></span>'+
                    '</a>'+
                '</div>',
        exec : function (self, $srcElement) {
            var color = $srcElement.attr("coloval");
            self.execCommand("forecolor", color);
            $('#' + self.config.toolbarId + ' .font-colo i').css('background-color', $srcElement.attr('coloval'));
            self.curFontColor = color;
            self.curVisiableDom.hide();
            self.curVisiableDom = null;
        }
    }
);
