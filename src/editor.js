/*
 * Author: luyao
 * email: water2212683@gmail.com
 */
(function ($) {
    var COLOR = [{
            key : "333333",
            val : "灰色-80%"
        }, {
            key : "666666",
            val : "灰色-60%"
        }, {
            key : "999999",
            val : "灰色-40%"
        }, {
            key : "cccccc",
            val : "灰色-20%"
        }, {
            key : "bb0000",
            val : "深红"
        }, {
            key : "dd0000",
            val : "红色"
        }, {
            key : "ee4488",
            val : "粉红"
        }, {
            key : "ff66dd",
            val : "淡紫"
        }, {
            key : "333399",
            val : "深蓝"
        }, {
            key : "0066cc",
            val : "蓝色"
        }, {
            key : "0099cc",
            val : "天蓝"
        }, {
            key : "66cccc",
            val : "淡蓝"
        }, {
            key : "336600",
            val : "深绿"
        }, {
            key : "999900",
            val : "深黄"
        }, {
            key : "cccc33",
            val : "淡黄"
        }, {
            key : "77cc33",
            val : "淡绿"
        }, {
            key : "663300",
            val : "咖啡"
        }, {
            key : "cc6633",
            val : "褐色"
        }, {
            key : "ff9900",
            val : "橙黄"
        }, {
            key : "ffcc33",
            val : "黄色"
        }
    ];
    var FONTSIZE = [1, 2, 3, 4];
    //RGB(0,0,0)转#000000
    var RGB2HEX = {
        "_515151" : "333333",
        "_102102102" : "666666",
        "_153153153" : "999999",
        "_204204204" : "cccccc",
        "_18700" : "bb0000",
        "_22100" : "dd0000",
        "_23868136" : "ee4488",
        "_255102221" : "ff66dd",
        "_5151153" : "333399",
        "_0102204" : "0066cc",
        "_0153204" : "0099cc",
        "_102204204" : "66cccc",
        "_511020" : "336600",
        "_1531530" : "999900",
        "_20420451" : "cccc33",
        "_11920451" : "77cc33",
        "_102510" : "663300",
        "_20410251" : "cc6633",
        "_2551530" : "ff9900",
        "_25520451" : "ffcc33"
    };
    var KEY_MAP = {
        12: 'Clear',
        14: 'Enter',
        33: 'PgUp',
        34: 'PgDown',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        45: 'Insert',
        46: 'Delete',
        96: 'Numpad0',
        97: 'Numpad1',
        98: 'Numpad2',
        99: 'Numpad3',
        100: 'Numpad4',
        101: 'Numpad5',
        102: 'Numpad6',
        103: 'Numpad7',
        104: 'Numpad8',
        105: 'Numpad9',
        106: '*',
        107: 'Plus',
        108: '_',
        109: '-',
        111: '/',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        124: 'F13',
        125: 'F14',
        126: 'F15',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        221: ']'
    };
    var isMac = (navigator.appVersion.indexOf("Mac") != -1);
    var keyEventToString = function(evt){
        var tokens = [];
        if(evt.ctrlKey){
            tokens.push('Control');
        }
        if(evt.altKey){
            tokens.push(isMac ? 'Option' : 'Alt');
        }
        if(isMac&&evt.metaKey){
            tokens.push('Command');
        }
        if(evt.shiftKey){
            tokens.push('Shift');
        }
        if(evt.keyCode >= 48 && evt.keyCode <= 90){
            tokens.push(String.fromCharCode(evt.keyCode));
        }else if(KEY_MAP[evt.keyCode]) {
            tokens.push(KEY_MAP[evt.keyCode]);
        }else{
            return '';
        }
        return tokens.join('+');
    }
    var isIE678 : ! + '\v1';
    var Editor = function (config) {
        return new Editor.fn.init(config);
    };
    Editor.prototype = Editor.fn = {
        config : {
            //将编辑器组装好后插入到textarea后面，textarea的ID
            textareaID : "J_ForumPostCon",
            toolbarId : "J_GuangEditorToolbar",
            iframeId : "J_GuangEditorIframe",
            //按钮参数配置
            btnFontSize : {
                cssName : "font-size",
                visible : true,
                exec : function (self) {
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
                selectionStyleFun : function (self, curElm, $parents) {
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
                        '</div>'
            },
            btnFontSizeAction : {
                exec : function (self, $srcElement) {
                    var size = $srcElement.attr("size");
                    self.execCommand("fontsize", size);
                    $('#' + self.config.toolbarId + ' .font-size a').text($srcElement.attr("title"));
                    self.curFontSize = size;
                    self.curVisiableDom.hide();
                    self.curVisiableDom = null;
                }
            },
            btnFontBold : {
                cssName : "font-bold",
                visible : true,
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
            },
            btnFontColo : {
                cssName : "font-color",
                visible : true,
                exec : function (self) {
                    if (!self.FontColoWrapDom || self.FontColoWrapDom.length == 0) {
                        var html = '<div class="fontColoWrap">';
                        var length = COLOR.length;
                        for (var i = 0; i < length; i++) {
                            html += '<a btntype="btnFontColoAction" coloval="#' + COLOR[i].key + '" style="background-color:#' + COLOR[i].key + ';" href="javascript:;" title="' + COLOR[i].val + '" unselectable="on">#' + COLOR[i].key + '</a>'
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
                            var hex = RGB2HEX["_" + rgbArr[1] + rgbArr[2] + rgbArr[3]];
                            val = "#" + hex;
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
                                        var hex = RGB2HEX["_" + rgbArr[1] + rgbArr[2] + rgbArr[3]];
                                        val = "#" + hex;
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
                            '<a href="javascript:;" btntype="btnFontColo" title="前景色" unselectable="on">'+
                                '<span btntype="btnFontColo" unselectable="on"><i btntype="btnFontColo" unselectable="on"></i></span>'+
                            '</a>'+
                        '</div>'
            },
            btnFontColoAction : {
                exec : function (self, $srcElement) {
                    var color = $srcElement.attr("coloval");
                    self.execCommand("forecolor", color);
                    $('#' + self.config.toolbarId + ' .font-colo i').css('background-color', $srcElement.attr('coloval'));
                    self.curFontColor = color;
                    self.curVisiableDom.hide();
                    self.curVisiableDom = null;
                }
            },
            btnLink : {
                visible : true,
                exec : function(self){
                    if (!self.BaobeiWrapDom || self.BaobeiWrapDom.length == 0) {
                        var link_dialog_html = ''+
                            '<div class="baobeiWrap">'+
                                '<div class="con">'+
                                    '<p class="title">将网址粘贴到下面框中：</p>'+
                                    '<div class="sg-form">'+
                                        '<a class="confirm_btn" href="javascript:;" btntype="btnLinkAction">确定</a>'+
                                        '<label class="input_text sg-input">'+
                                        '<input value="" placeholder="http://" autocomplete="off">'+
                                        '</label>'+
                                        '<div class="text-tip"></div>'+
                                    '</div>'+
                                    '<div class="tipbox-up">'+
                                        '<em>◆</em>'+
                                        '<span>◆</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                        $('#' + self.config.toolbarId).append(link_dialog_html);
                        if (self.curVisiableDom) {
                            self.curVisiableDom.hide();
                        }
                        self.BaobeiWrapDom = $('#' + self.config.toolbarId + ' .baobeiWrap');
                        self.curVisiableDom = self.BaobeiWrapDom;
                    } else {
                        if (self.curVisiableDom == self.BaobeiWrapDom) {
                            self.BaobeiWrapDom.hide();
                            self.curVisiableDom = null;
                        } else {
                            if (self.curVisiableDom)
                                self.curVisiableDom.hide();
                            self.BaobeiWrapDom.show();
                            self.curVisiableDom = self.BaobeiWrapDom;
                        }
                    }
                },
                html :  '<div class="font-btns font-link">'+
                            '<a href="javascript:;" btntype="btnLink" title="链接" unselectable="on">链接</a>'+
                        '</div>'
            },
            btnLinkAction : {
                exec : function (self, $srcElement) {
                    var url = $srcElement.siblings('label').find('input').val();
                    if(url == "http://" || url == "") {
                        if(alert_fail){
                            alert_fail("请输入一个链接");
                        }else{
                            alert("请输入一个链接");
                        }
                        return false;
                    }
                    if(url.indexOf('http://')===-1&&url.indexOf('https://')===-1){
                        if(alert_fail){
                            alert_fail("请以http://开头");
                        }else{
                            alert("请以http://开头");
                        }
                        return false;
                    }
                    if(!url.match(/http\:\/\/([a-z]{1,15}\.)?cncn\.(com|net)/)){
                        if(alert_fail){
                            alert_fail("不能输入外网链接");
                        }else{
                            alert("不能输入外网链接");
                        }
                        return false;
                    }
                    self.execCommand("createlink", url);
                    /* 如果需要给链接添加target title
                    var tmp = 'javascript:;';
                    var dom_a = self('A','href',tmp);
                    if(this.ln) {
                        dom_a.attr({
                            href : this.inputs['href'].value,
                            title : this.inputs['title'].value,
                            target : this.inputs['target'].options[this.inputs['target'].selectedIndex].value
                        });
                    }
                    */
                    self.curVisiableDom.hide();
                    self.curVisiableDom = null;
                }
            },
            btnFontColoAction : {
                exec : function (self, $srcElement) {
                    var color = $srcElement.attr("coloval");
                    self.execCommand("forecolor", color);
                    $('#' + self.config.toolbarId + ' .font-colo i').css('background-color', $srcElement.attr('coloval'));
                    self.curFontColor = color;
                    self.curVisiableDom.hide();
                    self.curVisiableDom = null;
                }
            },
            btnSplit : {
                visible : true,
                html : '<span class="split"></span>'
            },
            //按钮按顺序加载
            btnsLoadOrder : ['btnFontBold', 'btnFontColo', 'btnFontSize', 'btnLink']
        },
        
        iframe : null,
        iframeDocument : null,
        init : function (conf) {
            //更新配置
            var config = this.config;
            this.config = $.extend(true, {}, config ,conf||{});
            //加载Editor
            this.insertEditor();
            this.setEditor();
        },
        insertEditor : function () {
            var self = this;
            var html = "<div class='guang-editor-wrap'><div class='guang-editor'><div class='edit-btns' id='" + self.config.toolbarId + "'>";
            var textarea_dom = $("#" + self.config.textareaID);
            var height = textarea_dom.data('height')||150;
            $.each(self.config.btnsLoadOrder, function () {
                var btn = self.config[this];
                if (btn.visible) {
                    html += btn.html;
                    if (btn.cssName) {
                        if (!self.selectionStyleFuns) {
                            self.selectionStyleFuns = {};
                        }
                        self.selectionStyleFuns[btn.cssName] = btn.selectionStyleFun;
                    }
                }
            })
            html += "</div>"
            html += "<div class='iframeWrap'><iframe frameborder='0' spellcheck='false' id='"+self.config.iframeId+"' style='height:"+height+"px'></iframe></div>"
            html += "</div></div>"
            textarea_dom.after(html).hide();
            this.iframe = $("#"+self.config.iframeId)[0];
            this.iframeDocument = this.iframe.contentDocument || this.iframe.contentWindow.document;
        },
        setToolbar : function () {
            var self = this;
            $("body").bind("click", function () {
                if (self.curVisiableDom) {
                    self.curVisiableDom.hide();
                    self.curVisiableDom = null;
                }
            })
            $('#' + self.config.toolbarId).bind("click", function () {
                var e = arguments[0] || window.event,
                target = e.srcElement ? $(e.srcElement) : $(e.target),
                btnType = target.attr("btntype");
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }
                if (btnType) {
                    self.config[btnType].exec(self, target);
                } else {
                    //self.execCommand("","");
                }
            });
        },
        setEditor : function () {
            var self = this;
            //给按钮添加功能
            self.setToolbar();
            //填充iframe内容，主要功能是使用户在多行输入的时候，iframe自动增高
            self.iframeDocument.designMode = "on";
            self.iframeDocument.open();
            if (self.isIE678) {
                self.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}body{font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;cursor:default;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
            } else {
                self.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}html{height:1px;overflow:visible;} body{overflow:hidden;font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
            }
            self.iframeDocument.close();
            var target_textarea = $("#" + self.config.textareaID);
            var textareaVal = target_textarea.html();
            if (textareaVal != "") {
                self.iframeDocument.body.innerHTML = self.contentDecode(textareaVal, true);
                self.iframe.contentWindow.focus();
                $(self.iframe).height($(self.iframeDocument).height());
                target_textarea.data('text',$(self.iframeDocument.body).text());
            }else{
                self.iframeDocument.body.innerHTML = '&nbsp;';
            }
            //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
            $(self.iframeDocument).bind("mouseup click", function () {
                var e = arguments[0] || window.event,
                curElm,
                nodeName;
                //时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
                //判断是否选中文本
                if (e.type == "mouseup") {
                    var range = self.getRange();
                    if (self.isIE678) {
                        if (range.text.length != 0) {
                            curElm = self.selectionTextContainer = range.parentElement();
                        } else {
                            self.selectionTextContainer = null;
                        }
                    } else {
                        if (range.endContainer != range.startContainer) {
                            if (range.commonAncestorContainer.nodeType == 3) {
                                curElm = self.selectionTextContainer = range.commonAncestorContainer.parentNode;
                            } else {
                                curElm = self.selectionTextContainer = range.commonAncestorContainer;
                            }
                        } else {
                            self.selectionTextContainer = null;
                        }
                    }
                    if (self.selectionTextContainer) {
                        for (var i in self.selectionStyleFuns) {
                            var parents = $(self.selectionTextContainer).parents("font,b,span,p,div");
                            if (parents.length == 0) {
                                parents = null;
                            }
                            self.selectionStyleFuns[i](self, self.selectionTextContainer, parents);
                        }
                    }
                    //未选中文本
                } else if (self.selectionTextContainer == null) {
                    curElm = e.srcElement ? e.srcElement : e.target;
                    if (self.curVisiableDom) {
                        self.curVisiableDom.hide();
                        self.curVisiableDom = null;
                    }
                    var parents = $(curElm).parents();
                    if (parents.length == 0) {
                        parents = null;
                    }
                    for (var i in self.selectionStyleFuns) {
                        self.selectionStyleFuns[i](self, curElm, parents);
                    }
                }
                //即时将编辑器中的内容输入到textarea中
                self.insert_textarea();
            })
            
            if($.browser.msie){
                self.iframe.contentWindow.document.documentElement.attachEvent("onpaste", function(event){
                    self.paste(event);
                });
            }else{
                $(self.iframeDocument).bind("paste", function (event) {
                    self.paste(event);
                })
            }

            //激活复制状态，当用户复制大量html文本进来的时候，对文本进行格式化，保持一致风格
            $(self.iframeDocument).bind("keydown", function (event) {
                var keyStr = keyEventToString(event);
                if (keyStr == 'Control+V') {
                    self.hasPaste = true;
                }
            })
            $(self.iframeDocument).bind("keyup", function (event) {
                //过滤复制进来的文本
                if(self.hasPaste){
                    // var html = self.iframeDocument.body.innerHTML;
                    // html = self.contentEncode(html,'paste');
                    // html = self.contentDecode(html,true);
                    // self.iframeDocument.body.innerHTML = html;
                    //复制状态失效
                    self.hasPaste = false;
                    return;//如果是使用快捷键复制将禁止键盘事件
                }
                //展示当前字符位置的文字样式
                try {
                    var range = self.getRange();
                    var funs = self.selectionStyleFuns;
                    var length = self.selectionStyleFuns.length;
                    for (var i = 0; i < length; i++) {
                        funs[i](self, self.isIE678 ? range.parentElement() : range.endContainer.parentNode);
                    }
                } catch (e) {
                    alert(e)
                }
                $(self.iframe).height($(self.iframeDocument).height());
                //当工具栏被滚动到看不见的时候...
                if(false&&!self.toolbarBindScrollEvent){
                    $(window).bind("scroll", function () {
                        self.toolbarBindScrollEvent = true;
                        var docScrollTop = $(document).scrollTop();
                        if (!self.toolbarOffsetTop) {
                            self.toolbarOffsetTop = $('#' + self.config.toolbarId).offset().top;
                        }
                        if (self.toolbarOffsetTop <= docScrollTop) {
                            if ($.browser.msie && $.browser.version=="6.0") {
                                //to do
                            } else {
                                if (!self.toolbarPositionFixed) {
                                    self.toolbarPositionFixed = true;
                                    $('#' + self.config.toolbarId).css({
                                        position : "fixed",
                                        top : "38px",
                                        width : $('#' + self.config.toolbarId).width() + "px"
                                    })
                                }
                            }
                        } else {
                            if (self.toolbarPositionFixed) {
                                self.toolbarPositionFixed = false;
                                $('#' + self.config.toolbarId).css({
                                    position : "relative",
                                    top : "0"
                                })
                            }
                        }
                    });
                }
                //即时将编辑器中的内容输入到textarea中
                self.insert_textarea();
            });
            //IE下光标会丢失
            if ($.browser.msie) {
                var addEvent = function (el, type, fn) {
                    el['e' + type + fn] = fn;
                    el.attachEvent('on' + type, function () {
                        el['e' + type + fn]();
                    });
                }
                var bookmark;
                //记录IE的编辑光标
                addEvent(self.iframe, "beforedeactivate", function () { //在文档失去焦点之前
                    var range = self.iframeDocument.selection.createRange();
                    bookmark = range.getBookmark();
                });
                //恢复IE的编辑光标
                addEvent(self.iframe, "activate", function () {
                    if (bookmark) {
                        var range = self.iframeDocument.body.createTextRange();
                        range.moveToBookmark(bookmark);
                        range.select();
                        bookmark = null;
                    }
                });
            }
        },
        getRange : function () {
            var contentWindow = this.iframe.contentWindow;
            var selection = null;
            var range = null;
            if (this.isIE678) { // ie6,7,8 not ie9
                selection = contentWindow.document.selection;
                range = selection.createRange();
            } else { // 标准
                selection = contentWindow.getSelection();
                range = selection.getRangeAt(0);
            }
            return range;
        },
        //insertHTML 向编辑器插入html代码
        //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
        insertHTML : function (html) {
            var contentWindow = this.iframe.contentWindow;
            contentWindow.focus();
            var range = this.getRange(0);
            var selection = null;
            if (this.isIE678) {
                range.pasteHTML(html);
            } else {
                range.insertNode(html);
                range.setEndAfter(html);
                range.setStartAfter(html);
                selection = contentWindow.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        },
        insert_textarea : function(){
            var self = this;
            setTimeout(function(){
                var target_textarea = $("#" + self.config.textareaID);
                target_textarea.text(self.contentEncode(self.iframeDocument.body.innerHTML));
                target_textarea.data('text',$(self.iframeDocument.body).text());
            },1)
        },
        execCommand : function (cmd, val) {
            try {
                this.iframeDocument.execCommand(cmd, false, val);
                this.iframe.contentWindow.focus();
                this.insert_textarea();
            } catch (e) {}
        },
        //contentDecode 内容解码
        //@param html (String)
        //@param noMediaDecode (Bool)
        contentDecode : function (html, noMediaDecode) {
            var val = html;
            var length = 0;
            var i = 0;
            var data = {};
            
            if (!this.tagsData) {
                this.tagsData = {};
                data = this.tagsData;
                //插入表情数组
                // length = FACEJSON.length;
                // for (; i < length; i++) {
                    // data[FACEJSON[i].key] = '<img src="http://static.guang.com/img/face/common/' + FACEJSON[i].val + '" unselectable="on" title="' + FACEJSON[i].key + '" alt="' + FACEJSON[i].key + '">';
                // }
                //插入span font数组
                length = COLOR.length;
                i = 0;
                for (; i < length; i++) {
                    var colorkey = COLOR[i].key;
                    data['[font' + colorkey + ']'] = '<font color="#' + colorkey + '">';
                    data['[font1' + colorkey + ']'] = '<font size="1" color="#' + colorkey + '">';
                    data['[font2' + colorkey + ']'] = '<font size="2" color="#' + colorkey + '">';
                    data['[font3' + colorkey + ']'] = '<font size="3" color="#' + colorkey + '">';
                    data['[font4' + colorkey + ']'] = '<font size="4" color="#' + colorkey + '">';
                }
                data['[font1]'] = '<font size="1">';
                data['[font2]'] = '<font size="2">';
                data['[font3]'] = '<font size="3">';
                data['[font4]'] = '<font size="4">';
                data['[/font]'] = '</font>';
                data['[span]'] = '<span>';
                data['[/span]'] = '</span>';
                
                data['[b]'] = '<b>';
                data['[/b]'] = '</b>';
                data['[p]'] = '<p>';
                data['[/p]'] = '</p>';
                data['[br]'] = '<br/>';
                data['[s]'] = '&nbsp;';
                data['[a end]'] = '<a ';
                data['[end]'] = '>';
                data['[/a]'] = '</a>';
            } else {
                data = this.tagsData;
            }
            val = val.replace(/\x20?\[[^\[\]]+\]/gi, function (tag) {
                var t = tag;
                //好方法是tag[0],但ie67不支持
                //测试100W次substring(0,1)和tag.charAt(0)时间都差不多（毫秒）
                //chrome是830和760  ie7是1034和1016
                //chrome下tag[0]的时间也是760左右
                if (tag.substring(0, 1) == " ") {
                    t = tag.substring(1);
                }
                return data[t] || tag;
            })
            if (!noMediaDecode) {
                val = this.mediaDecode(val);
            }
            return val;
        },
        //contentEncode 内容编码
        contentEncode : function (html,type) {
            var self = this;
            //var encodeHtml = this.filterMediaTag(html); //去掉多余的类似[图片1]
            var encodeHtml = html;
            
            var reg_spanColse = /\<span(?!.*?\<span).*?\<\/span\>/gi;
            var reg_fontColse = /\<font(?!.*?\<font).*?\<\/font\>/gi;
            var reg_bColse = /\<b(?!.*?\<b).*?\<\/b\>/gi;
            var reg_strongColse = /\<strong(?!.*?\<strong).*?\<\/strong\>/gi;
            var reg_div = /\<div[^\>]*\>/gi;
            var reg_divEnd = /\<\/div\>/gi;
            var reg_p = /\<p[^\>]*\>/gi;
            var reg_pEnd = /\<\/p\>/gi;
            var reg_a = /\<a[^\>]*\>/gi;
            var reg_aEnd = /\<\/a\>/gi;
            var reg_br = /\<br[^\>]*\>/gi;
            var reg_img = /\<img[^>]+alt\=\"?(\[.{1,4}\])[^>]+\>/gi;
            var reg_enter = /\r|\n/g;
            var reg_nbsp = /\&nbsp\;?/gi;
            var reg_tagSplit = /\<[^\>]+\>/g;
            var SPACE = " ";
            
            //将匹配出来的闭合标签转换成"[b]xxx[/b]"之类的
            var encode = function (t, b) {
                var tagArr = t.match(reg_tagSplit);
                var tagHead = tagArr[0];
                var tagFoot = tagArr[tagArr.length - 1];
                var tagBody = t.replace(tagHead, "").replace(tagFoot, "");
                var color = null;
                var size = null;
                var bold = b || null;
                if (!bold && tagHead.indexOf("bold") != -1) {
                    bold = true;
                }
                if (tagHead.indexOf("size") != -1) {
                    size = tagHead.match(/size[\s\=\"]+(\d{1})/i);
                    if (size) {
                        size = size[1];
                    }
                }
                if (tagHead.indexOf("color") != -1) {
                    color = tagHead.match(/\#([0-9a-f]{6})/i);
                    if (!color) {
                        color = tagHead.match(/rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i);
                        if (color) {
                            color = RGB2HEX["_" + color[1] + color[2] + color[3]];
                        }
                    } else {
                        color = color[1];
                    }
                }
                //验证是否属于网站规定的颜色
                if (!self.hasHexColor) {
                    var hasHexColor = self.hasHexColor = {};
                    for (var i = 0; i < COLOR.length; i++) {
                        hasHexColor[COLOR[i].key] = true;
                    }
                }
                if (color) {
                    color = self.hasHexColor[color] ? color : null;
                }
                //验证是否属于网站规定的字体大小
                if (size && parseInt(size, 10) > 4) {
                    size = "4";
                }
                if (bold) {
                    if (size || color) {
                        tagHead = SPACE + "[b]" + SPACE + "[font" + (size || "") + (color || "") + "]"
                            tagFoot = SPACE + "[/b]" + SPACE + "[/font]";
                    } else {
                        tagHead = SPACE + "[b]";
                        tagFoot = SPACE + "[/b]";
                    }
                } else {
                    if (size || color) {
                        tagHead = SPACE + "[font" + (size || "") + (color || "") + "]"
                            tagFoot = SPACE + "[/font]";
                    } else {
                        tagHead = "";
                        tagFoot = "";
                    }
                }
                return tagHead + tagBody + tagFoot;
            }
            //优先匹配速度快的正则
            //清除换行符
            encodeHtml = encodeHtml.replace(reg_enter, SPACE + '[span][/span]');
            //nbsp
            encodeHtml = encodeHtml.replace(reg_nbsp, ' ');
            //img
            // if (encodeHtml.indexOf("<img") != -1 || encodeHtml.indexOf("<IMG") != -1) {
                // encodeHtml = encodeHtml.replace(reg_img, SPACE + '$1');
            // }
            //br
            if (encodeHtml.indexOf("<br") != -1 || encodeHtml.indexOf("<BR") != -1) {
                encodeHtml = encodeHtml.replace(reg_br, SPACE + '[br]');
            }
            //div
            if (encodeHtml.indexOf("<div") != -1 || encodeHtml.indexOf("<DIV") != -1) {
                encodeHtml = encodeHtml.replace(reg_div, SPACE + '[p]');
                encodeHtml = encodeHtml.replace(reg_divEnd, SPACE + '[/p]');
            }
            //p
            if (encodeHtml.indexOf("<p") != -1 || encodeHtml.indexOf("<P") != -1) {
                encodeHtml = encodeHtml.replace(reg_p, SPACE + '[p]');
                encodeHtml = encodeHtml.replace(reg_pEnd, SPACE + '[/p]');
            }
            //a_end
            if (encodeHtml.indexOf("</a") != -1 || encodeHtml.indexOf("</A") != -1) {
                encodeHtml = encodeHtml.replace(reg_aEnd, SPACE + '[/a]');
            }
            //b
            while (encodeHtml.indexOf("<b") != -1 || encodeHtml.indexOf("<B") != -1) {
                encodeHtml = encodeHtml.replace(reg_bColse, function (t) {
                        return encode(t, true);
                    });
            }
            //strong
            while (encodeHtml.indexOf("<strong") != -1 || encodeHtml.indexOf("<STRONG") != -1) {
                encodeHtml = encodeHtml.replace(reg_strongColse, function (t) {
                        return encode(t, true);
                    });
            }
            //span
            while (encodeHtml.indexOf("<span") != -1 || encodeHtml.indexOf("<SPAN") != -1) {
                encodeHtml = encodeHtml.replace(reg_spanColse, function (t) {
                        return encode(t);
                    });
            }
            //font
            while (encodeHtml.indexOf("<font") != -1 || encodeHtml.indexOf("<FONT") != -1) {
                encodeHtml = encodeHtml.replace(reg_fontColse, function (t) {
                        return encode(t);
                    });
            }
            //a
            while (encodeHtml.indexOf("<a") != -1 || encodeHtml.indexOf("<A") != -1) {
                encodeHtml = encodeHtml.replace(reg_a, function (t) {
                    var str = '';
                    if(type === "paste"){
                        return str;
                    }
                    str = '[a end]'+t.match(/href\=\"[^\"]+\"/)[0]+'[end]';
                    return str;
                });
            }
            //过滤最后的标签，强制删除标签
            if (encodeHtml.indexOf("<") != -1) {
                encodeHtml = encodeHtml.replace(reg_tagSplit, '');
            }
            return encodeHtml
        },
        //richText2text 将"[b]文字[/b]"转成"文本"供回复的回复使用
        //@param html (String)
        richText2text : function (html) {
            if (html) {
                var val = html;
                val = val.replace(/\[[^\]]+\]/g, "");
                return val;
            } else {
                return "";
            }
        },
        //html2text 将"<b>文字</b>"转成"文本",为了判断编辑框是否有输入内容
        //@param html (String)
        html2text : function (html) {
            if (html) {
                var val = html;
                if (val.indexOf("<img") != -1) {
                    return "hasConent";
                } else {
                    val = val.replace(/\<[^\>]+\>/g, "");
                    val = val.replace(/\&nbsp\;/g, "");
                }
                return $.trim(val);
            } else {
                return "";
            }
        },
        paste : function(event){
            var self = this;
            function getSel(w){ 
                return w.getSelection ? w.getSelection() : w.document.selection; 
            } 
            function setRange(sel,r){ 
                sel.removeAllRanges(); 
                sel.addRange(r); 
            } 
            function filterPasteData(originalText){
                var newText=originalText; 
                newText = newText.replace(/&nbsp;/ig, ' ');
                newText = newText.replace(/\n\s*\n/g, '\n');
                newText = newText.replace(/<br[^>]*>/ig, '\n');
                newText = newText.replace(/<\/p><p[^>]*>/ig, '\n');
                newText = newText.replace(/<[^>]+>/g, '');
                newText = newText.replace(/ {2}/g, ' &nbsp;');
                if (/\n/.test(newText)) {
                    newText = newText.replace(/^/, '<p>').replace(/$/, '<br /></p>').replace(/\n/g, '<br /></p><p>');
                }
                return newText; 
            } 
            function block(e){ 
                e.preventDefault(); 
            } 
            var w,or,divTemp,originText; 
            var newData; 
            function pasteClipboardData(e){
                var objEditor = self.iframe; 
                var edDoc=objEditor.contentWindow.document; 
                if($.browser.msie){
                    var orRange=objEditor.contentWindow.document.selection.createRange(); 
                    var ifmTemp=document.getElementById("ifmTemp"); 
                    if(!ifmTemp){
                        ifmTemp=document.createElement("IFRAME"); 
                        ifmTemp.id="ifmTemp"; 
                        ifmTemp.style.width="1px"; 
                        ifmTemp.style.height="1px"; 
                        ifmTemp.style.position="absolute"; 
                        ifmTemp.style.border="none"; 
                        ifmTemp.style.left="-10000px"; 
                        ifmTemp.src="iframeblankpage.html"; 
                        document.body.appendChild(ifmTemp); 
                        ifmTemp.contentWindow.document.designMode = "On"; 
                        ifmTemp.contentWindow.document.open(); 
                        ifmTemp.contentWindow.document.write("<body></body>"); 
                        ifmTemp.contentWindow.document.close(); 
                    }else{
                        ifmTemp.contentWindow.document.body.innerHTML=""; 
                    }
                    originText=objEditor.contentWindow.document.body.innerText; 
                    ifmTemp.contentWindow.focus(); 
                    ifmTemp.contentWindow.document.execCommand("Paste",false,null); 
                    objEditor.contentWindow.focus(); 
                    newData=ifmTemp.contentWindow.document.body.innerHTML; 
                    //filter the pasted data 
                    newData=filterPasteData(newData); 
                    ifmTemp.contentWindow.document.body.innerHTML=newData; 
                    //paste the data into the editor 
                    orRange.pasteHTML(newData); 
                    //即时将编辑器中的内容输入到textarea中
                    self.insert_textarea();
                    //block default paste 
                    if(e){
                        e.returnValue = false; 
                        if(e.preventDefault) 
                        e.preventDefault(); 
                    } 
                    return false; 
                }else{
                    enableKeyDown=false; 
                    //create the temporary html editor 
                    var divTemp=edDoc.createElement("DIV"); 
                    divTemp.id='htmleditor_tempdiv'; 
                    divTemp.innerHTML='\uFEFF'; 
                    divTemp.style.left="-10000px"; //hide the div 
                    divTemp.style.height="1px"; 
                    divTemp.style.width="1px"; 
                    divTemp.style.position="absolute"; 
                    divTemp.style.overflow="hidden"; 
                    edDoc.body.appendChild(divTemp); 
                    //disable keyup,keypress, mousedown and keydown 
                    objEditor.contentWindow.document.addEventListener("mousedown",block,false); 
                    objEditor.contentWindow.document.addEventListener("keydown",block,false); 
                    enableKeyDown=false; 
                    //get current selection; 
                    w=objEditor.contentWindow; 
                    or=getSel(w).getRangeAt(0); 
                    //move the cursor to into the div 
                    var docBody=divTemp.firstChild; 
                    rng = edDoc.createRange(); 
                    rng.setStart(docBody, 0); 
                    rng.setEnd(docBody, 1); 
                    setRange(getSel(w),rng); 
                    originText=objEditor.contentWindow.document.body.textContent; 
                    if(originText==='\uFEFF'){
                        originText=""; 
                    } 
                    window.setTimeout(function(){
                        //get and filter the data after onpaste is done 
                        if(divTemp.innerHTML==='\uFEFF'){
                            newData=""; 
                            edDoc.body.removeChild(divTemp); 
                            return;
                        } 
                        newData=divTemp.innerHTML; 
                        // Restore the old selection 
                        if (or){
                            setRange(getSel(w),or); 
                        } 
                        newData=filterPasteData(newData); 
                        divTemp.innerHTML=newData; 
                        //paste the new data to the editor 
                        objEditor.contentWindow.document.execCommand('inserthtml', false, newData ); 
                        edDoc.body.removeChild(divTemp); 
                        //即时将编辑器中的内容输入到textarea中
                        self.insert_textarea();
                    },0); 
                    //enable keydown,keyup,keypress, mousedown; 
                    enableKeyDown=true; 
                    objEditor.contentWindow.document.removeEventListener("mousedown",block,false); 
                    objEditor.contentWindow.document.removeEventListener("keydown",block,false); 
                    return true; 
                }
            }
            pasteClipboardData(event);
        }
    }
    Editor.fn.init.prototype = Editor.fn;
    $.fn.ubb_editor = Editor;
})(jQuery)
