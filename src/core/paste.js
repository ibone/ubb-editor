    function paste(editor, event, callback){
        var filter_paste_text = function(text){
            text = text.replace(/<[^>]+>/g, '');
            text = text.replace(/ {2}/g, ' &nbsp;');
            text = text.replace(/\n/g, '');
            return text; 
        };
        var paste_text, 
            new_text, 
            tmp_container, 
            tmp_container_id = 'ubb_tmp_paste_con', 
            old_range, 
            tmp_data_start_text = '{tmp_data_start}',
            tmp_data_end_text = '{tmp_data_end}';
        if(is_ie678){
            old_range = get_range(editor);
            tmp_container = create_iframe($(editor.iframe_document.body),tmp_container_id);
            tmp_container.contentWindow.focus(); 
            tmp_container.contentWindow.document.execCommand("Paste",false,null); 
            editor.focus();
            paste_text = tmp_container.contentWindow.document.body.innerHTML;
            $(tmp_container).remove();
            new_text = filter_paste_text(paste_text);
            paste_html(editor, new_text, old_range);
            prevent_default(event);
            callback();
        }else{
            //不能直接获得粘贴内容，那么就移动光标到临时容器，通过临时容器来处理粘贴进来的文本
            //临时容器如果是div，那么复制进来的文本有div标签的话，chrome会设别是否需要在临时容器中做嵌套还是并列，这样临时容器的作用没了，不能让粘贴内容“跑出去”
            //所以用了table，一个万用型的标签，但有个缺点是内部必须有内容，才能确定range并编辑
            tmp_container = editor.iframe_document.getElementById(tmp_container_id);
            if(!tmp_container){
                $(editor.iframe_document.body).append('<table id="'+tmp_container_id+'" style="left:-10000px;position:absolute;">'+
                                                          '<tr><td>' + tmp_data_start_text + tmp_data_end_text + '</td></tr>'+
                                                      '</table>'); 
                tmp_container = editor.iframe_document.getElementById(tmp_container_id);
            }
            old_range = get_range(editor);
            //ie中在复制之前改变粘贴的光标位置不会成功，而且使用旧的range会清除之前粘贴的文本
            set_range(editor,tmp_data_start_text.length,tmp_data_start_text.length,tmp_container);
            window.setTimeout(function(){
                paste_text = tmp_container.getElementsByTagName('td')[0]
                                          .innerHTML
                                          .replace(tmp_data_start_text,'')
                                          .replace(tmp_data_end_text,'');
                if(paste_text && paste_text.length === 0){
                    return;
                } 
                $(tmp_container).remove();
                new_text = filter_paste_text(paste_text); 
                paste_html(editor, new_text, old_range);
                callback();
            },1);
        }
    }