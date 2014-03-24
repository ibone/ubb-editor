$.ubb_editor.plugin('toolbar',function(editor){
    //编辑菜单事件初始化
    $("body").on("click", function () {
        editor.hide_panel();
    });
    editor.$toolbar.on("click", 'a', function () {
        var $button = $(this),
            button_type = $button.data('onclick'),
            button_name = $button.data('name'),
            button = editor.buttons[button_name];
            
        button[button_type](editor,this);
        
        if(button_type = 'exec' && button.onselected){
            button.onselected(editor, editor.get_selected_container());
        }
    });
    editor.$toolbar.on("click", function (event) {
        if(this === (event.srcElement||event.target)){
            editor.hide_panel();
        }
        stop_bubble(event);
    });
    editor.onselected = [];
    
    editor.on('plugins_loaded',function(){
        $.each(editor.get_config('toolbar'), function (i, name) {
            var button = editor.buttons[name];
            editor.$toolbar.append(button.html);
            //判断button是否有配置选中反馈函数
            if(button.onselected){
                editor.onselected.push(button.onselected);
            }
        });
        editor.fire('toolbar_loaded');
    })
    
    function stop_bubble(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
});