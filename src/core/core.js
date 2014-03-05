    var default_config = {
        toolbar : ['btn_bold', 'btn_color', 'btn_size', 'btn_link'],//默认按钮排列和加载
        buttons : {}
    };
    
    var is_ie678 = ! + '\v1';
    
    function type_of(obj){
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    function stop_bubble(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    
    $.fn.ubb_editor = function (config,callback) {
        if(type_of(config) === 'function'){
            callback = config;
            config = {};
        }
        if(type_of(config) !== 'object'){
            config = {};
            callback = function(){};
        }
        this.each(function(){
            var editor = $.extend({}, default_config ,config||{});
            editor.textarea = $(this);
            make_editor(editor);
            callback(editor);
        });
        return this;
    };
    
    $.ubb_editor = {
        set_config : function(key,val){
            default_config[key] = val;
        },
        get_config : function(key){
            return default_config[key];
        },
        add_button : function(key,val){
            default_config.buttons[key] = val;
        }
    };
    
    function make_editor(editor){
        var id = (new Date().getTime())+Math.floor(Math.random()*100);
        $.extend(editor,{
            id : 'ubb_editor' + id,
            exec_command : function(command, value) {
                this.hide_panel();
                this.iframe_document.execCommand(command, false, value);
                this.focus();
                set_textarea(this);
            },
            hide_panel : function() {
                if (this.cur_panel) {
                    this.cur_panel.hide();
                    this.cur_panel = null;
                }
            },
            add_panel : function(panel_html) {
                this.hide_panel();
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
            },
            data : function(key,val){
                if(typeof key !== 'string'){
                    return null;
                }
                if(typeof val !== 'undefined'){
                    return this.$editor_document.data(key,val);
                }else{
                    return this.$editor_document.data(key);
                }
            },
            get_config : function(key){
                return this[key] || null;
            },
            move_cursor : function(index){
                if(type_of(index) === 'number'){
                    set_range(this,index,index);
                    this.focus();
                }
            },
            focus : function(){
                this.iframe.contentWindow.focus();
            }
        });
        var html = '<div class="ubb_editor_wrap" id="'+editor.id+'"><div class="ubb_editor"><div class="ubb_editor_toolbar">';
        var height = editor.textarea.data('height')||150;
        editor.onselected = [];
        $.each(editor.toolbar, function (i,val) {
            var btn = editor.buttons[val];
            html += btn.html;
            if (btn.onselected) {
                editor.onselected.push(btn.onselected);
            }
        });
        html += '</div>';
        html += '<div class="ubb_editor_iframe_wrap"><iframe frameborder="0" spellcheck="false" style="height:'+height+'px"></iframe></div>';
        html += '</div></div>';
        editor.textarea.after(html).hide();
        editor.$editor_document = $("#" + editor.id);
        editor.iframe = editor.find('iframe')[0];
        editor.iframe_document = editor.iframe.contentDocument || editor.iframe.contentWindow.document;
        editor.$toolbar = editor.find('.ubb_editor_toolbar');
        editor_init(editor);
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
            editor.buttons[button_name][button_type](editor,this);
        });
        editor.$toolbar.on("click", function (event) {
            if(this === (event.srcElement||event.target)){
                editor.hide_panel();
            }
            stop_bubble(event);
        });
        //初始化iframe内容，涉及编辑器和预览的样式统一
        editor.iframe_document.designMode = "on";
        editor.iframe_document.open();
        if (is_ie678) {
            editor.iframe_document.write(
                '<html>'+
                    '<head>'+
                        '<style type="text/css">'+
                            'html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:12px;word-wrap:break-word;}'+
                            'p{padding:0;margin:0;}'+
                            'body{font:12px/1.5 tahoma,arial,\\5b8b\\4f53;text-align:left;color:#000000;}'+
                            'em{font-style:italic;}'+
                            'img{border:0;max-width:100%;cursor:default;}'+
                            'a{color:#16B}'+
                            'a:hover{color:#16B}'+
                        '</style>'+
                    '</head>'+
                '</html>'
            );
        } else {
            editor.iframe_document.write(
                '<html>'+
                    '<head>'+
                        '<style type="text/css">'+
                            'html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:12px;word-wrap:break-word;}'+
                            'p{padding:0;margin:0;}'+
                            'html{height:1px;overflow:visible;}'+
                            'body{overflow:hidden;font:12px/1.5 tahoma,arial,\\5b8b\\4f53;text-align:left;color:#000000;}'+
                            'em{font-style:italic;}'+
                            'img{border:0;max-width:100%;}'+
                            'a{color:#16B}'+
                            'a:hover{color:#16B}'+
                        '</style>'+
                    '</head>'+
                '</html>'
            );
        }
        editor.iframe_document.close();
        var textarea_value = editor.textarea.text();
        var $iframe = $(editor.iframe);
        var $iframe_document = $(editor.iframe_document);
        //setTimeout(function(){
            if (textarea_value !== '') {
                editor.iframe_document.body.innerHTML = ubb_to_html(editor,textarea_value);
                editor.focus();
                $iframe.height($iframe_document.height());
                editor.textarea.data('text',$iframe_document.find('body').text());//保存用户输入的纯文字，不包含标签，做内容长度校验使用
            }else{
                editor.iframe_document.body.innerHTML = '&nbsp;';
            }
        //},1);
        //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
        $iframe_document.on("mouseup", function (event) {
            //时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
            //判断是否选中文本
            var $parents = null;
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
            if (!editor.selection_text_container) {
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
        $iframe_document.on("keydown", function (event) {
            var keyStr = key_event_to_string(event);
            if (keyStr === 'Control+V') {
                editor.has_paste = true;
            }
        });
        $iframe_document.on("keyup", function (event) {
            if(editor.has_paste){
                editor.has_paste = false;
                return;//如果是使用快捷键复制将禁止键盘事件
            }
            //展示当前字符位置的文字样式
            var range = get_range(editor);
            editor.selection_text_container = event.srcElement ? event.srcElement : event.target;
            onselected(editor);
            $iframe.height($iframe_document.height());
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
    
    function onselected(editor){
        var $parents = $(editor.selection_text_container).parents("font,b,span,p,div");
        if ($parents.length === 0) {
            $parents = [];
        }
        for (var i in editor.onselected) {
            editor.onselected[i](editor, editor.selection_text_container, $parents);
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
    
    function set_range(editor, start, end) {
        var element = editor.iframe_document.body;
        if (!is_ie678) {
            var range = editor.iframe_document.createRange();
            range.selectNodeContents(element);
            var text_nodes = get_text_nodes_in(element);
            var foundStart = false;
            var char_count = 0, end_char_count;

            for (var i = 0, text_node; text_node = text_nodes[i++]; ) {
                end_char_count = char_count + text_node.length;
                if (!foundStart && start >= char_count && (start < end_char_count || (start === end_char_count && i < text_nodes.length))) {
                    range.setStart(text_node, start - char_count);
                    foundStart = true;
                }
                if (foundStart && end <= end_char_count) {
                    range.setEnd(text_node, end - char_count);
                    break;
                }
                char_count = end_char_count;
            }

            var selection = editor.iframe.contentWindow.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            var text_range = editor.iframe_document.body.createTextRange();
            text_range.moveToElementText(element);
            text_range.collapse(true);
            text_range.moveEnd("character", end);
            text_range.moveStart("character", start);
            text_range.select();
        }
    }
    
    //append 向编辑器插入html代码
    //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
    function append_html_to_editor(editor, html) {
        editor.focus();
        var range = get_range(editor);
        var selection = null;
        if (is_ie678) {
            range.pasteHTML(html);
        } else {
            range.insertNode(html);
            range.setEndAfter(html);
            range.setStartAfter(html);
            selection = editor.iframe.contentWindow.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    function get_text_nodes_in(node) {
        var text_nodes = [];
        if (node.nodeType === 3) {
            text_nodes.push(node);
        } else {
            var children = node.childNodes;
            for (var i = 0, len = children.length; i < len; ++i) {
                text_nodes.push.apply(text_nodes, get_text_nodes_in(children[i]));
            }
        }
        return text_nodes;
    }
    
    function set_textarea(editor){
        setTimeout(function(){
            editor.textarea.text(html_to_ubb(editor))
                           .data('text',$(editor.iframe_document.body).text());
        },1);
    }