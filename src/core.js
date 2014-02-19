    var default_config = {
        color : [],//[{val:'333333',alt:'black'},...]
        size : [],
        ubb_map : {},
        buttons_loader : ['btn_bold', 'btn_color', 'btn_size', 'btn_link']//默认按钮排列样式
    };
    var is_ie678 = ! + '\v1';
    $.fn.ubb_editor = function (config) {
        this.each(function(){
            var editor = $.extend({}, default_config ,config||{});
            editor.textarea = $(this);
            make_editor(editor);
        });
        return this;
    };
    $.ubb_editor = {
        set_config : function(key,val){
            default_config[key] = val;
        }
    };
    function make_editor(editor){
        $.extend(editor,{
            editor_id : 'ubb_editor'+(new Date().getTime())+Math.floor(Math.random()*100),
            exec_command : function(command, value) {
                this.iframe_document.execCommand(command, false, value);
                this.iframe.contentWindow.focus();
                set_textarea(this);
            },
            hide_panel : function() {
                if (this.cur_panel) {
                    this.cur_panel.hide();
                    this.cur_panel = null;
                }
            },
            add_panel : function(panel_html) {
                this.cur_panel = $(panel_html);
                this.$toolbar.append(this.cur_panel);
            },
            toggle_panel : function(panel_select_str) {
                if (this.cur_panel && this.cur_panel.is(panel_select_str)) {
                    this.cur_panel.hide();
                    this.cur_panel = null;
                } else {
                    if (this.cur_panel) {
                        this.cur_panel.hide();
                        this.cur_panel = null;
                    }
                    if(panel_select_str){
                        this.cur_panel = this.find(panel_select_str).show();
                    }
                }
            },
            find : function(select_str){
                return editor.$editor_document.find(select_str);
            }
        });
        var html = '<div class="ubb_editor_wrap" id="'+editor.editor_id+'"><div class="ubb_editor"><div class="ubb_editor_toolbar">';
        var height = editor.textarea.data('height')||150;
        editor.onselected = [];
        $.each(editor.buttons_loader, function () {
            var btn = editor[this];
            html += btn.html;
            if (btn.onselected) {
                editor.onselected.push(btn.onselected);
            }
        });
        html += '</div>';
        html += '<div class="ubb_editor_iframeWrap"><iframe frameborder="0" spellcheck="false" style="height:'+height+'px"></iframe></div>';
        html += '</div></div>';
        editor.textarea.after(html).hide();
        editor.$editor_document = $("#" + editor.editor_id);
        editor.iframe = editor.$editor_document.find('iframe')[0];
        editor.iframe_document = editor.iframe.contentDocument || editor.iframe.contentWindow.document;
        editor.$toolbar = editor.find('.ubb_editor_toolbar');
        editor_init(editor);
    }
    
    function stop_bubble(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    function editor_init(editor) {
        //编辑菜单事件初始化
        $("body").on("click", function () {
            editor.hide_panel();
        });
        editor.$toolbar.on("click", 'a', function (event) {
            var $button = $(this),
                button_type = $button.data('onclick'),
                button_name = $button.data('name');
            stop_bubble(event);
            editor[button_name][button_type](editor,this);
        });
        //初始化iframe内容，涉及编辑器和预览的样式统一
        editor.iframe_document.designMode = "on";
        editor.iframe_document.open();
        if (is_ie678) {
            editor.iframe_document.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}body{font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;cursor:default;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
        } else {
            editor.iframe_document.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:13px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}html{height:1px;overflow:visible;} body{overflow:hidden;font-family:Arial,Helvetica,Sans-Serif;font-size:13px;text-align:left;}em{font-style:italic;} img{border:0;max-width:100%;} a{color:#16B} a:hover{color:#16B}</style></head></html>');
        }
        editor.iframe_document.close();
        var textarea_value = editor.textarea.text();
        var $iframe = $(editor.iframe);
        var $iframe_document = $(editor.iframe_document);
        if (textarea_value !== "") {
            editor.iframe_document.body.innerHTML = ubb_to_html(textarea_value);
            editor.iframe.contentWindow.focus();
            $iframe.height($iframe_document.height());
            editor.textarea.data('text',$iframe_document.find('body').text());//保存用户输入的纯文字，不包含ubb或html，做内容长度校验使用
        }else{
            editor.iframe_document.body.innerHTML = '&nbsp;';
        }
        //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
        $iframe_document.on("mouseup click", function (event) {
            //时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
            //判断是否选中文本
            var $parents = null;
            if (event.type === "mouseup") {
                var range = get_range(editor);
                if (is_ie678) {
                    if (range.text.length !== 0) {
                        editor.selection_text_container = range.parentElement();
                    } else {
                        editor.selection_text_container = null;
                    }
                } else {
                    if (range.endContainer !== range.startContainer) {
                        if (range.commonAncestorContainer.nodeType === 3) {
                            editor.selection_text_container = range.commonAncestorContainer.parentNode;
                        } else {
                            editor.selection_text_container = range.commonAncestorContainer;
                        }
                    } else {
                        editor.selection_text_container = null;
                    }
                }
            //未选中文本
            } else if (editor.selection_text_container === null) {
                editor.selection_text_container = event.srcElement ? event.srcElement : event.target;
            }
            if (editor.selection_text_container) {
                onselected(editor);
            }
            editor.hide_panel();
            //即时将编辑器中的内容输入到textarea中
            set_textarea(editor);
        });
        
        if(is_ie678){
            editor.iframe.contentWindow.document.documentElement.attachEvent("onpaste", function(event){
                paste(event,editor.iframe,function(){
                    set_textarea(editor);
                });
            });
        }else{
            $iframe_document.on("paste", function (event) {
                paste(event,editor.iframe,function(){
                    set_textarea(editor);
                });
            });
        }

        //激活复制状态，当用户复制大量html文本进来的时候，对文本进行格式化，保持一致风格
        $iframe_document.bind("keydown", function (event) {
            var keyStr = key_event_to_string(event);
            if (keyStr === 'Control+V') {
                editor.has_paste = true;
            }
        });
        $iframe_document.bind("keyup", function (event) {
            if(editor.has_paste){
                editor.has_paste = false;
                return;//如果是使用快捷键复制将禁止键盘事件
            }
            //展示当前字符位置的文字样式
            var range = get_range(editor);
            if(is_ie678){
                editor.selection_text_container = range.parentElement();
            }else{
                editor.selection_text_container = range.endContainer.parentNode;
            }
            onselected(editor);
            $iframe.height($iframe_document.height());
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
            //即时将编辑器中的内容输入到textarea中
            set_textarea(editor);
        });
        //IE下光标会丢失
        if (is_ie678) {
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
        }
    }
    function get_range(editor) {
        var content_window = editor.iframe.contentWindow;
        var selection = null;
        var range = null;
        if (is_ie678) {
            selection = content_window.document.selection;
            range = selection.createRange();
        } else {
            selection = content_window.getSelection();
            range = selection.getRangeAt(0);
        }
        return range;
    }
    
    function onselected(editor){
        var $parents = $(editor.selection_text_container).parents("font,b,span,p,div");
        if ($parents.length === 0) {
            $parents = [];
        }
        for (var i in editor.onselected) {
            editor.onselected[i](editor, editor.selection_text_container, $parents);
        }
    }
    //append 向编辑器插入html代码
    //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
    function append_html_to_editor(editor, html) {
        var content_window = editor.iframe.contentWindow;
        content_window.focus();
        var range = get_range(editor);
        var selection = null;
        if (is_ie678) {
            range.pasteHTML(html);
        } else {
            range.insertNode(html);
            range.setEndAfter(html);
            range.setStartAfter(html);
            selection = content_window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function set_textarea(editor){
        setTimeout(function(){
            editor.textarea.text(html_to_ubb(editor))
                           .data('text',$(editor.iframe_document.body).text());
        },1);
    }
