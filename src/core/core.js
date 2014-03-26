    var default_config = {
        toolbar : [],//负责按钮排序和显示
        height : 150,
        plugin : {}//插件的配置
    };
    
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
        plugin : function(name, depend, config, fn){
            if (config == null && fn == null) {
                // ( name, fn )
                fn = depend;
                depend = [];
                config = {};
            } else if (fn == null) {
                if (type_of(depend) === "array") {
                    // ( name, depend, fn )
                    fn = config;
                    config = {};
                } else {
                    // ( name, config, fn )
                    fn = config;
                    config = depend;
                    depend = [];
                }
            }
            if(!config.require){
                config.require = true;
            }
            this.plugins.push({
                name   : name,
                depend : depend,
                fn     : fn
            });
            //添加插件的配置
            default_config.plugin[name] = config;
        },
        plugins : []
    };
    
    var ubb_editor_num = 0;
    
    $.fn.ubb_editor = function (config, fn) {
        // ()
        if(config == null){
            config = {};
            fn = function(){};
        }
        // ( fn )
        if(type_of(config) === 'function'){
            fn = config;
            config = {};
        }
        this.each(function(){
            var id = (new Date().getTime()) + '' + (ubb_editor_num++);
            var editor = {
                id : 'ubb_editor' + id,
                $textarea : $(this),
                config : $.extend(true, {}, default_config, config),
                buttons : []
            }
            api(editor);
            init(editor);
            fn(editor);
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
        editor.document = editor.get_document(editor.iframe);
        editor.$toolbar = editor.find('.ubb_editor_toolbar');

        //初始化iframe内容
        init_iframe(editor.iframe);
        editor.$iframe = $(editor.iframe);
        editor.$document = $(editor.document);
        
        //按依赖执行插件
        var loaded_plugins = [];//已加载插件列表
        var loaded_disabled_plugins = [];//已加载但失效的插件列表 {require:false}
        var plugins = $.ubb_editor.plugins;
        var plugins_length = plugins.length;
        var limit = 100;//while经常会发生未预期的死循环，加一个循环上限
        while(
            limit > 0
            && loaded_plugins.length !== plugins_length
            && plugins.length !== 0
        ){
            limit--;
            for(var i = 0; i < plugins_length; i++){
                var plugin = plugins[i];
                if(
                    //不在已加载列表中
                    !array_in(plugin.name  , loaded_plugins)
                    //依赖项全部在已加载列表中
                    && array_in(plugin.depend, loaded_plugins)
                ){
                    loaded_plugins.push(plugin.name);
                    var plugin_config = editor.get_plugin_config(plugin.name);
                    if( 
                        //是否需要
                        plugin_config.require 
                        //依赖列表和失效列表没有交集
                        //如果有A插件依赖B插件，而B插件在失效列表中,则A插件也不执行,同时放入失效列表中
                        && !has_intersec(plugin.depend, loaded_disabled_plugins)
                    ){
                        plugin.fn( editor );
                    }else{
                        loaded_disabled_plugins.push(plugin.name);
                    }
                }
            }
        }
        editor.fire('plugins_loaded');
    }
    
    function get_document(iframe){
        return iframe.contentDocument || iframe.contentWindow.document;
    }
    
    function type_of(obj){
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    function array_in(arr_child,arr_parent){
        if(type_of(arr_child) !== 'array'){
            arr_child = [arr_child];
        }
        if(type_of(arr_parent) !== 'array'){
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
        for(var j = 0; j<len_child; j++){
            for(var i = 0; i<len_parent; i++){
                if(arr_parent[i] === arr_child[j]){
                    in_sum++;
                    break;
                }
            }
        }
        if(in_sum === len_child){
            return true;
        }else{
            return false;
        }
    }
    function has_intersec(arr1,arr2){
        if(type_of(arr1) !== 'array' && type_of(arr2) !== 'array'){
            return false;
        }
        var len_arr1 = arr1.length;
        var len_arr2 = arr2.length;
        if(len_arr1 === 0 || len_arr2 === 0){
            return false;
        }
        for(var j = 0; j<len_arr1; j++){
            for(var i = 0; i<len_arr2; i++){
                if(arr2[i] === arr1[j]){
                    return true;
                }
            }
        }
        return false;
    }