
    var default_config = {
        color : [],//[{val:'333333',alt:'black'},...]
        size : [],
        ubb_map : {},
        buttons_loader : ['btn_bold', 'btn_color', 'btn_size', 'btn_link']//默认按钮排列样式
    }
    var is_ie678 : ! + '\v1';
    $.fn.ubb_editor = function (config) {
        this.each(function(){
            config = $.extend(true, {}, default_config ,config||{});
            config.textarea = $(this);
            make_editor(config);
        })
        return this;
    };
    $.ubb_editor = {
        set_config : function(key,val){
            config[key] = val;
        }
    }
    function make_editor(config){
        config.editor_id = 'ubb_editor'+(new Date().getTime())+Math.floor(Math.random()*100);
        var html = '<div class="ubb_editor_wrap" id="'++'"><div class="ubb_editor"><div class="ubb_editor_btns">';
        var height = config.textarea.data('height')||150;
        config.onselected = [];
        $.each(config.buttons_loader, function () {
            var btn = config[this];
            html += btn.html;
            if (btn.onselected) {
                config.onselected.push(btn.onselected);
            }
        })
        html += '</div>'
        html += '<div class="ubb_editor_iframeWrap"><iframe frameborder="0" spellcheck="false" style="height:'+height+'px"></iframe></div>'
        html += '</div></div>'
        config.textarea.after(html).hide();
        config.iframe = $("#"+config.editor_id+' iframe')[0];
        config.iframeDocument = this.iframe.contentDocument || this.iframe.contentWindow.document;
        editor_init(config);
    }
    function stop_bubble(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    function editor_init(config) {
        //编辑菜单事件初始化
        $("body").on("click", function () {
            if (config.curVisiableDom) {
                config.curVisiableDom.hide();
                config.curVisiableDom = null;
            }
        })
        $('#' + config.editor_id + ' .ubb_editor_btns').on("click",'a' function (event) {
            var $button = $(this),
                button_type = $button.data('type'),
                button_name = $button.data('name');
            stop_bubble(event);
            config[button_name][button_type]();
        });
        //初始化iframe内容，涉及编辑器和预览的样式统一
        config.iframeDocument.designMode = "on";
        config.iframeDocument.open();
        if (is_ie678) {
            config.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}body{font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;cursor:default;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
        } else {
            config.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}html{height:1px;overflow:visible;} body{overflow:hidden;font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
        }
        config.iframeDocument.close();
        var textarea_value = config.textarea.text();
        var $iframe = $(config.iframe);
        var $iframeDocument = $(config.iframeDocument);
        if (textarea_value != "") {
            config.iframeDocument.body.innerHTML = ubb_to_html(textarea_value);
            config.iframe.contentWindow.focus();
            $iframe.height($iframeDocument.height());
            config.textarea.data('text',$iframeDocument.find('body').text());//保存用户输入的纯文字，不包含ubb或html，做内容长度校验使用
        }else{
            config.iframeDocument.body.innerHTML = '&nbsp;';
        }
        //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
        $iframeDocument.on("mouseup click", function (event) {
            //时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
            //判断是否选中文本
            if (event.type == "mouseup") {
                var range = getRange();
                if (is_ie678) {
                    if (range.text.length != 0) {
                        config.selection_text_container = range.parentElement();
                    } else {
                        config.selection_text_container = null;
                    }
                } else {
                    if (range.endContainer != range.startContainer) {
                        if (range.commonAncestorContainer.nodeType == 3) {
                            config.selection_text_container = range.commonAncestorContainer.parentNode;
                        } else {
                            config.selection_text_container = range.commonAncestorContainer;
                        }
                    } else {
                        config.selection_text_container = null;
                    }
                }
                if (config.selection_text_container) {
                    for (var i in config.onselected) {
                        var parents = $(config.selection_text_container).parents("font,b,span,p,div");
                        if (parents.length == 0) {
                            parents = null;
                        }
                        config.onselected[i](self, config.selection_text_container, parents);
                    }
                }
                //未选中文本
            } else if (config.selection_text_container == null) {
                var target_dom = event.srcElement ? event.srcElement : event.target;
                if (config.curVisiableDom) {
                    config.curVisiableDom.hide();
                    config.curVisiableDom = null;
                }
                var parents = $(target_dom).parents();
                if (parents.length == 0) {
                    parents = null;
                }
                $(config.onselected).each(function(){
                    this(config, target_dom, parents);
                })
            }
            //即时将编辑器中的内容输入到textarea中
            set_textarea(config);
        })
        
        if(is_ie678){
            config.iframe.contentWindow.document.documentElement.attachEvent("onpaste", function(event){
                paste(event,config.iframe,function(){
                    set_textarea(config);
                });
            });
        }else{
            $iframeDocument.bind("paste", function (event) {
                paste(event,config.iframe,function(){
                    set_textarea(config);
                });
            })
        }

        //激活复制状态，当用户复制大量html文本进来的时候，对文本进行格式化，保持一致风格
        $iframeDocument.bind("keydown", function (event) {
            var keyStr = key_event_to_string(event);
            if (keyStr == 'Control+V') {
                self.hasPaste = true;
            }
        })
        $iframeDocument.bind("keyup", function (event) {
            if(self.hasPaste){
                self.hasPaste = false;
                return;//如果是使用快捷键复制将禁止键盘事件
            }
            //展示当前字符位置的文字样式
            try {
                var range = self.getRange();
                var funs = config.onselected;
                var length = config.onselected.length;
                for (var i = 0; i < length; i++) {
                    funs[i](self, is_ie678 ? range.parentElement() : range.endContainer.parentNode);
                }
            } catch (e) {
                alert(e)
            }
            $iframe.height($iframeDocument.height());
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
            set_textarea(config);
        });
        //IE下光标会丢失
        if (is_ie678) {
            var bookmark = null;
            //记录IE的编辑光标
            config.iframe.attachEvent('onbeforedeactivate', function () {
                var range = config.iframeDocument.selection.createRange();
                bookmark = range.getBookmark();
            });
            //恢复IE的编辑光标
            config.iframe.attachEvent('onactivate', function () {
                if (bookmark) {
                    var range = config.iframeDocument.body.createTextRange();
                    range.moveToBookmark(bookmark);
                    range.select();
                    bookmark = null;
                }
            });
        }
    }
    function getRange(config) {
        var contentWindow = config.iframe.contentWindow;
        var selection = null;
        var range = null;
        if (is_ie678) {
            selection = contentWindow.document.selection;
            range = selection.createRange();
        } else {
            selection = contentWindow.getSelection();
            range = selection.getRangeAt(0);
        }
        return range;
    }
    //append 向编辑器插入html代码
    //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
    function append_html_to_editor(html,config) {
        var contentWindow = config.iframe.contentWindow;
        contentWindow.focus();
        var range = getRange(config);
        var selection = null;
        if (is_ie678) {
            range.pasteHTML(html);
        } else {
            range.insertNode(html);
            range.setEndAfter(html);
            range.setStartAfter(html);
            selection = contentWindow.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function set_textarea(config){
        setTimeout(function(){
            config.textarea.text(html_to_ubb(config.iframeDocument.body.innerHTML))
                           .data('text',$(config.iframeDocument.body).text());
        },1)
    }
    function exec_command(command, value, config) {
        try {
            config.iframeDocument.execCommand(command, false, value);
            config.iframe.contentWindow.focus();
            set_textarea(config);
        } catch (e) {}
    }
    function ubb_to_html(ubb) {
        var length = 0;
        var html = ubb.replace(/\x20?\[[^\[\]]+\]/gi, function (tag) {
            var t = tag;
            //好方法是tag[0],但ie67不支持
            //测试100W次substring(0,1)和tag.charAt(0)时间都差不多（毫秒）
            //chrome是830和760  ie7是1034和1016
            //chrome下tag[0]的时间也是760左右
            if (tag.substring(0, 1) == " ") {
                t = tag.substring(1);
            }
            return ubb_map[t] || tag;
        })
        return html;
    }
    function html_to_ubb(html,config) {
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
                        color = Rgb2Hex([color[1], color[2], color[3]]);
                    }
                } else {
                    color = color[1];
                }
            }
            //验证是否属于网站规定的颜色
            if (!config.color_map) {
                var color_map = config.color_map = {};
                for (var i = 0; i < config.color.length; i++) {
                    color_map[config.color[i].val] = true;
                }
            }
            if (color) {
                color = config.color_map[color] ? color : null;
            }
            //验证是否属于网站规定的字体大小
            if (!config.size_map) {
                var size_map = config.size_map = {};
                for (var i = 0; i < config.size.length; i++) {
                    size_map[config.size[i].val] = true;
                }
            }
            if (size) {
                size = config.size_map[size] ? size : '1';
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
        html = html.replace(reg_enter, SPACE + '[span][/span]');
        //nbsp
        html = html.replace(reg_nbsp, ' ');
        //br
        if (html.indexOf("<br") != -1 || html.indexOf("<BR") != -1) {
            html = html.replace(reg_br, SPACE + '[br]');
        }
        //div
        if (html.indexOf("<div") != -1 || html.indexOf("<DIV") != -1) {
            html = html.replace(reg_div, SPACE + '[p]');
            html = html.replace(reg_divEnd, SPACE + '[/p]');
        }
        //p
        if (html.indexOf("<p") != -1 || html.indexOf("<P") != -1) {
            html = html.replace(reg_p, SPACE + '[p]');
            html = html.replace(reg_pEnd, SPACE + '[/p]');
        }
        //a_end
        if (html.indexOf("</a") != -1 || html.indexOf("</A") != -1) {
            html = html.replace(reg_aEnd, SPACE + '[/a]');
        }
        //b
        while (html.indexOf("<b") != -1 || html.indexOf("<B") != -1) {
            html = html.replace(reg_bColse, function (t) {
                    return encode(t, true);
                });
        }
        //strong
        while (html.indexOf("<strong") != -1 || html.indexOf("<STRONG") != -1) {
            html = html.replace(reg_strongColse, function (t) {
                    return encode(t, true);
                });
        }
        //span
        while (html.indexOf("<span") != -1 || html.indexOf("<SPAN") != -1) {
            html = html.replace(reg_spanColse, function (t) {
                    return encode(t);
                });
        }
        //font
        while (html.indexOf("<font") != -1 || html.indexOf("<FONT") != -1) {
            html = html.replace(reg_fontColse, function (t) {
                    return encode(t);
                });
        }
        //a
        while (html.indexOf("<a") != -1 || html.indexOf("<A") != -1) {
            html = html.replace(reg_a, function (t) {
                var str = '';
                if(type === "paste"){
                    return str;
                }
                str = '[a end]'+t.match(/href\=\"[^\"]+\"/)[0]+'[end]';
                return str;
            });
        }
        //过滤最后的标签，强制删除标签
        if (html.indexOf("<") != -1) {
            html = html.replace(reg_tagSplit, '');
        }
        return html
    }
