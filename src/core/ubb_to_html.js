    //可控制才可输出，道理同html_to_ubb
    function ubb_to_html(editor,ubb) {
        var default_decode = {
                '[p]' : '<p>',
                '[/p]' : '</p>',
                '[br]' : '<br/>'
            };
        var toolbar = editor.get_config('toolbar');
        var buttons = editor.buttons;
        var buttons_length = toolbar.length;
        var button,ubb_map;
        if(!editor.ubb_map){
            editor.ubb_map = {};
            $.extend(editor.ubb_map,default_decode);
            for(var i = 0; i < buttons_length; i++){
                button = buttons[toolbar[i]];
                ubb_map = button.decode_ubb(editor);
                $.extend(editor.ubb_map,ubb_map);
            }
        }
        var length = 0;
        var ubb_map = editor.ubb_map;
        var html = ubb.replace(/\[[\/a-z0-9]{1,12}\]/gi, function (tag) {
            var t = tag;
            // if (tag.substring(0, 1) === " ") {
                // t = tag.substring(1);
            // }
            return ubb_map[t] || tag;
        });
        return html;
    }
    