    var default_config = {
        toolbar : ['bold', 'color', 'size', 'link'],//负责按钮排序和显示
        height : 150,
        plugin : ['bold', 'color', 'size', 'link']//默认加载的插件
    };
    //config大部分属性都是plugin来添加，比如颜色按钮添加了color，通过$.ubb_editor.config('color',color)来增加全局配置
    
    var is_ie678 = ! + '\v1';
    
    $.ubb_editor = {
        config : function(key,val){
            if(type_of(key) !== 'string'){
                return;
            }
            if(arguments.length > 1){
                default_config[key] = val;
                return val;
            }
            return default_config[key];
        },
        //插件依赖
        plugin : function(name, depend, fun){
            if(type_of(name) !== 'string'){
                return;
            }
            if(type_of(depend) === 'function'){
                fun = depend
                depend = [];
            }
            if(type_of(depend) !== 'array'){
                depend = []
            }
            if(type_of(fun) !== 'function'){
                fun = function(){};
            }
            this.plugins.push({
                name : name,
                depend : depend,
                fun : fun
            });
            
        },
        plugins : []
    };
    var ubb_editor_num = 0;
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
            var id = (new Date().getTime()) + '' + (ubb_editor_num++);
            var editor = {
                id : 'ubb_editor' + id,
                config : $.extend({}, default_config, config),
                buttons : {},
                add_button : function(button){
                    this.buttons[button.name] = button;
                },
                exec_command : function(command, value) {
                    this.hide_panel();;
                    this.iframe_document.execCommand(command, false, value);
                    this.focus();
                    this.fire('content_change');
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
                toggle_panel : function(select_str) {
                    if (this.cur_panel.is(select_str)) {
                        this.hide_panel();
                    } else {
                        this.hide_panel();
                        this.cur_panel = this.find(select_str).show();
                    }
                },
                find : function(select_str){
                    return editor.$root.find(select_str);
                },
                data : function(key, val){
                    if(type_of(key) !== 'string'){
                        return null;
                    }
                    if(arguments.length > 1){
                        return this.$root.data(key,val);
                    }else{
                        return this.$root.data(key);
                    }
                },
                get_config : function(key){
                    return this.config[key];
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
                    this.$root.trigger(event_name,this);
                },
                on : function(event_name,callback){
                    this.$root.on(event_name,callback);
                },
                change_height : function(){
                    var default_height = this.get_config('height');
                    var html = this.iframe_document.body.innerHTML;
                    var tmp_iframe = create_iframe(
                        editor.$root,
                        'ubb_get_content_height',
                        '<div id="ubb_temp_div">'+ html +'</div>',
                        'width:'+ this.$iframe.width() +'px;'
                    );
                    var iframe_document = get_document(tmp_iframe);
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
            editor.$textarea = $(this);
            init(editor);
            callback(editor);
        });
        return this;
    };
    
    function init(editor){
        var html = '<div class="ubb_editor_wrap" id="'+editor.id+'">'+
                       '<div class="ubb_editor">'+
                           '<div class="ubb_editor_toolbar"></div>'+
                           '<div class="ubb_editor_iframe_wrap">'+
                               '<iframe frameborder="0" spellcheck="false"></iframe>'+
                           '</div>'+
                       '</div>'+
                   '</div>';
        editor.$textarea.after(html).hide();
        editor.$root = $("#" + editor.id);
        editor.iframe = editor.find('iframe')[0];
        editor.iframe_document = get_document(editor.iframe);
        editor.$toolbar = editor.find('.ubb_editor_toolbar');

        //初始化iframe内容，涉及编辑器和预览的样式统一
        init_iframe(editor.iframe);
        var $iframe = editor.$iframe = $(editor.iframe);
        var $iframe_document = editor.$iframe_document = $(editor.iframe_document);
        //装载插件,但不执行插件的具体功能,内容要为空
        
        var array_in = function(arr_child,arr_parent){
            if(type_of(arr_child) === 'string'){
                arr_child = [arr_child];
            }
            if(type_of(arr_child) !== 'array'){
                return false;
            }
            if(type_of(arr_child) !== 'array'){
                return false;
            }
            var len_parent = arr_parent.length;
            var len_child = arr_child.length;
            if(len_parent < len_child){
                return false;
            }
            if(len_child === 0){
                return true;
            }
            var in_sum = 0;
            for(var i = 0; i<len_parent; i++){
                for(var j = 0; j<len_child; j++){
                    if(arr_parent[i] === arr_child[j]){
                        in_sum++;
                    }
                }
            }
            if(in_sum === len_child){
                return true;
            }else{
                return false;
            }
        }
        var loaded_plugins = [];
        var plugins = $.ubb_editor.plugins;
        var plugins_length = plugins.length;
        var need_load_plugins_length = editor.get_config('plugin').length;
        while(
            loaded_plugins.length !== need_load_plugins_length 
            && plugins.length !== 0
        ){
            for(var i = 0; i < plugins_length; i++){
                var plugin = plugins[i];
                //插件不在已加载插件列表中，插件在配置中，插件的依赖在存在已加载插件列表中
                if(
                    !  array_in(plugin.name  , loaded_plugins)
                    && array_in(plugin.name  , editor.get_config('plugin'))
                    && array_in(plugin.depend, loaded_plugins)
                ){
                    loaded_plugins.push(plugin.name);
                    plugin.fun(editor,plugin.name);
                }
            }
        }
        
        //编辑菜单事件初始化
        $("body").on("click", function () {
            editor.hide_panel();
        });
        editor.$toolbar.on("click", 'a', function () {
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
        
        //初始内容填充不能作为插件，它依赖其他插件对它的影响
        editor.onselected = [];
        $.each(editor.get_config('toolbar'), function (i, name) {
            var button = editor.buttons[name];
            editor.$toolbar.append(button.html);
            //判断button是否有配置选中反馈函数
            if(button.onselected){
                editor.onselected.push(button.onselected);
            }
        });
        editor.iframe_document.body.innerHTML = ubb_to_html(editor,editor.$textarea.text());
        editor.fire('content_change');
        editor.focus();
        
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
    
    function get_document(iframe){
        return iframe.contentDocument || iframe.contentWindow.document;
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