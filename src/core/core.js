    var default_config = {
        toolbar : ['btn_bold', 'btn_color', 'btn_size', 'btn_link'],//默认按钮排列和加载
        buttons : {}
    };
    
    var is_ie678 = ! + '\v1';
    
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
            var id = (new Date().getTime())+Math.floor(Math.random()*100);
            var editor = $.extend(
                {}, 
                default_config,
                config||{},
                {
                    id : 'ubb_editor' + id,
                    height : 150,
                    $textarea : $(this),
                    exec_command : function(command, value) {
                        this.hide_panel();;
                        this.iframe_document.execCommand(command, false, value);
                        this.focus();
                        this.fire('on_content_change');
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
                    fire : function(event_name){
                        this.$root.trigger(event_name);
                    },
                    on : function(event_name,callback){
                        this.$root.on(event_name,callback);
                    },
                    change_height : function(){
                        var default_height = 150;
                        var html = this.iframe_document.body.innerHTML;
                        var tmp_iframe = create_iframe(
                            editor.$root,
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
                }
            );
            init(editor);
            callback(editor);
            //to do 将每个编辑器的动作都事件化，比如编辑器生成后，编辑器生成前，菜单选中后，命令执行后等等，便于后期插件扩展
        });
        return this;
    };
    
    function init(editor){
        var html = '<div class="ubb_editor_wrap" id="'+editor.id+'"><div class="ubb_editor"><div class="ubb_editor_toolbar">';
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
        html += '<div class="ubb_editor_iframe_wrap"><iframe frameborder="0" spellcheck="false" style="height:'+editor.height+'px"></iframe></div>';
        html += '</div></div>';
        editor.$textarea.after(html).hide();
        editor.$root = $("#" + editor.id);
        editor.iframe = editor.find('iframe')[0];
        editor.iframe_document = editor.iframe.contentDocument || editor.iframe.contentWindow.document;
        editor.$toolbar = editor.find('.ubb_editor_toolbar');

        //初始化iframe内容，涉及编辑器和预览的样式统一
        init_iframe(editor.iframe);
        var $iframe = editor.$iframe = $(editor.iframe);
        var $iframe_document = editor.$iframe_document = $(editor.iframe_document);
        editor.iframe_document.body.innerHTML = ubb_to_html(editor,editor.$textarea.text());
        editor.focus();
        editor.fire('content_change');
        
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
        
        //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
        $iframe_document.on("mouseup", function (event) {
            onselected(editor, event);
            editor.hide_panel();
        });
        
        //粘贴处理
        if(is_ie678){
            editor.iframe_document.documentElement.attachEvent("onpaste", function(event){
                paste(editor, event, function(){
                    editor.fire('content_change');
                });
            });
        }else{
            $iframe_document.on("paste", function (event) {
                paste(editor, event, function(){
                    editor.fire('content_change');
                });
            });
        }

        //复制事件触发的时候是不会触发keyup事件的
        $iframe_document.on("keyup", function (event) {
            //展示当前字符位置的文字样式
            onselected(editor,event);
            editor.fire('content_change');
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
        editor.on('content_change',function(){
            editor.$textarea.text(html_to_ubb(editor))
                           .data('text',$(editor.iframe_document.body).text());//保存用户输入的纯文字，不包含标签，做内容长度校验使用
            editor.change_height();
        });
    }
    
    function onselected(editor, event){
        //判断是否选中文本
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
        if (!editor.selection_text_container) {
            return;
        }
        for (var i in editor.onselected) {
            editor.onselected[i](editor);
        }
    }
    
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
    
    function prevent_default(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }