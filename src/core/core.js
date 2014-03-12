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
        }
        if(type_of(callback) !== 'function'){
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
                return editor.$root.find(select_str);
            },
            data : function(key,val){
                if(typeof key !== 'string'){
                    return null;
                }
                if(typeof val !== 'undefined'){
                    return this.$root.data(key,val);
                }else{
                    return this.$root.data(key);
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
            },
            change_height : function(){
                var default_height = 150;
                var html = this.iframe_document.body.innerHTML;
                var tmp_iframe = create_iframe(editor.$root,
                                               'ubb_get_content_height',
                                               '<div id="ubb_temp_div">'+ html +'</div>',
                                               'width:'+ this.$iframe.width() +'px;'
                                              );
                var iframe_document = tmp_iframe.contentDocument || tmp_iframe.contentWindow.document;
                var div = $(iframe_document.body).find('#ubb_temp_div');
                var height = div.height();
                if( height < (default_height - 20) ){
                    height = default_height;
                }else{
                    height = height + 20;
                }
                this.$iframe.css({
                    height:height
                });
            }
        });
        var html = '<div class="ubb_editor_wrap" id="'+editor.id+'"><div class="ubb_editor"><div class="ubb_editor_toolbar">';
        var height = editor.textarea.data('height')||150;
        editor.onselected = [];
        $.each(editor.toolbar, function (i,val) {
            var button = editor.buttons[val];
            html += button.html;
            //判断button是否有配置选中反馈函数
            if(button.onselected){
                editor.onselected.push(button.onselected);
            }
        });
        html += '</div>';
        html += '<div class="ubb_editor_iframe_wrap"><iframe frameborder="0" spellcheck="false" style="height:'+height+'px"></iframe></div>';
        html += '</div></div>';
        editor.textarea.after(html).hide();
        editor.$root = $("#" + editor.id);
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
        $.each(editor.toolbar, function (i,val) {
            var button = editor.buttons[val];
            button.init && button.init(editor);
        });
        //初始化iframe内容，涉及编辑器和预览的样式统一
        init_iframe(editor.iframe);
        var textarea_value = editor.textarea.text();
        var $iframe = editor.$iframe = $(editor.iframe);
        var $iframe_document = editor.$iframe_document = $(editor.iframe_document);
        editor.iframe_document.body.innerHTML = ubb_to_html(editor,textarea_value);
        editor.focus();
        
        set_textarea(editor);
        //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
        $iframe_document.on("mouseup", function (event) {
            //时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
            //判断是否选中文本
            var $parents = null;
            var range = get_range(editor);
            if (is_ie678) {
                editor.selection_text_container = range.parentElement();
            } else {
                if (range.commonAncestorContainer.nodeType === 3) {
                    editor.selection_text_container = range.commonAncestorContainer.parentNode;
                } else {
                    editor.selection_text_container = range.commonAncestorContainer;
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
        
        //粘贴处理
        if(is_ie678){
            editor.iframe_document.documentElement.attachEvent("onpaste", function(event){
                paste(editor, event, function(){
                    set_textarea(editor);
                });
            });
        }else{
            $iframe_document.on("paste", function (event) {
                paste(editor, event, function(){
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
        for (var i in editor.onselected) {
            editor.onselected[i](editor);
        }
    }
    
    //append 向编辑器插入html代码
    //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
    function append_html_to_editor(editor, html, range) {
        editor.focus();
        var selection = null;
        if (is_ie678) {
            if(!range){
                range = get_range(editor);
            }
            range.pasteHTML(html);
        } else {
            if(range){
                selection = get_selection(editor);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            editor.exec_command('inserthtml',html);
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
                           .data('text',$(editor.iframe_document.body).text());//保存用户输入的纯文字，不包含标签，做内容长度校验使用
            editor.change_height();
        },1);
    }
    
    function prevent_default(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }