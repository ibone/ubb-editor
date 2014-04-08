    //可控制才可输出，道理同html_to_ubb
    function ubb_to_html(editor,ubb) {
        var default_decode = {
                '[p]'   : '<p>',
                '[/p]'  : '</p>',
                '[br]'  : '<br/>',
                '[end]' : '>'
            };
        var buttons = editor.buttons;
        if(!editor.ubb_map){
            editor.ubb_map = {};
            $.extend(editor.ubb_map,default_decode);
            for(var i = 0; i < buttons.length; i++){
                $.extend(editor.ubb_map, buttons[i].decode_ubb());
            }
        }
        var ubb_map = editor.ubb_map;
        var ubb_arr = [];
        
        function get_foot_tag_decode(tag_name,decode_str){
            if(ubb_arr.length === 0){
                return '';
            }
            var cur_ubb_info = ubb_arr[ubb_arr.length-1];
            var cur_head_tag = cur_ubb_info.head_tag;
            //头标签是否为编辑器配置的标签
            if(cur_ubb_info.has_decode){
                //尾标签是否和当前头标签配对
                if(cur_head_tag.indexOf(tag_name) !== -1){
                    ubb_arr.pop();
                    return decode_str;
                }else{
                    var node_name = '';
                    node_name = cur_ubb_info.decode_str.replace(/<([a-z]{1,10}).+/,'$1');
                    if(decode_str.indexOf('$$') === -1){
                        decode_str = '</'+node_name+'>$$'+decode_str;
                    }else{
                        decode_str = decode_str.replace('$$','</'+node_name+'>$$');
                    }
                    ubb_arr.pop();
                    if(ubb_arr.length === 0){
                        return decode_str.split('$$')[0];
                    }
                    return get_foot_tag_decode(tag_name,decode_str)
                }
            }else{
                ubb_arr.pop();
                return get_foot_tag_decode(tag_name,decode_str);
            }
        }
        
        var reg_ubb       = /\[\/?[a-z0-9]{1,12}\]/gi;
        var reg_node_name = /\[\/([a-z]{1,6})\]/gi;
        
        var html = ubb.replace( reg_ubb, function (tag) {
            var decode_str = '';
            var tag_name = '';
            if(tag.indexOf('/') === -1){
                decode_str = ubb_map[tag];
                if(tag === '[end]'){
                    return decode_str;
                }
                if(decode_str){
                    ubb_arr.push({
                        decode_str : decode_str,
                        has_decode : true,
                        head_tag : tag
                    });
                }else{
                    decode_str = tag;
                    ubb_arr.push({
                        has_decode : false
                    });
                }
                return decode_str;
            }else{
                decode_str = ubb_map[tag];
                if(decode_str){
                    return get_foot_tag_decode( tag.replace(reg_node_name,'$1'), decode_str );
                }else{
                    return tag;
                }
            }
        });
        
        var iframe = create_iframe($('body'),'ubb_editor_decode_container',html);
        var iframe_document = get_document(iframe);
        for(var i = 0; i < buttons.length; i++){
            buttons[i].display && buttons[i].display($(iframe_document.body));
        }
        return iframe_document.body.innerHTML;
    }
    