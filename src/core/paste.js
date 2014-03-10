    function paste(editor, event, callback){
        var prevent_default = function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        };
        var filter_paste_text = function(text){
            text = text.replace(/<[^>]+>/g, '');
            text = text.replace(/ {2}/g, ' &nbsp;');
            text = text.replace(/\n/g, '');
            return text; 
        };
        var tmp_div, 
            paste_text, 
            new_text, 
            tmp_iframe, 
            $tmp_iframe,
            tmp_iframe_document, 
            old_range, 
            tmp_data_start_text = '{tmp_data_start}',
            tmp_data_end_text = '{tmp_data_end}'; 
        if(is_ie678){
            $tmp_iframe = $(editor.iframe_document.body).find('#ubb_tmp_iframe');
            old_range = get_range(editor);
            if(!$tmp_iframe.length){
                $tmp_iframe = $('<iframe id="ubb_tmp_iframe" style="left:-10000px;height:1px;width:1px;position:absolute;overflow:hidden;"></iframe>');
                $(editor.iframe_document.body).append(tmp_iframe);
                tmp_iframe = $tmp_iframe[0];
                var tmp_iframe_document = tmp_iframe.contentWindow.document;
                tmp_iframe_document.designMode = "On"; 
                tmp_iframe_document.open(); 
                tmp_iframe_document.write("<body></body>"); 
                tmp_iframe_document.close(); 
            }else{
                tmp_iframe[0].contentWindow.document.body.innerHTML=""; 
            }
            tmp_iframe[0].contentWindow.focus(); 
            tmp_iframe[0].contentWindow.document.execCommand("Paste",false,null); 
            editor.focus(); 
            paste_text = tmp_iframe[0].contentWindow.document.body.innerHTML; 
            new_text = filter_paste_text(paste_text);
            append_html_to_editor(editor, new_text, old_range);
            prevent_default(event);
            callback();
        }else{
            //不能直接获得粘贴内容，那么就移动光标到临时容器，通过临时容器来处理粘贴进来的文本
            //临时容器如果是div，那么复制进来的文本有div标签的话，chrome会设别是否需要在临时容器中做嵌套还是并列，这样临时容器的作用没了，不能让粘贴内容“跑出去”
            //所以用了table，一个万用型的标签，但有个缺点是内部必须有内容，才能确定range并编辑
            tmp_div = $('<table style="left:-10000px;height:1px;width:1px;position:absolute;overflow:hidden;"><tr><td>' + tmp_data_start_text + tmp_data_end_text + '</td></tr></table>');
            $(editor.iframe_document.body).append(tmp_div); 
            old_range = get_range(editor); 
            set_range(editor,tmp_data_start_text.length,tmp_data_start_text.length,tmp_div[0]);
            window.setTimeout(function(){
                paste_text = tmp_div.html();
                if(paste_text && paste_text.length === 0){
                    tmp_div.remove(); 
                    return;
                } 
                var selection = get_selection(editor);
                new_text=filter_paste_text(paste_text).replace(tmp_data_start_text,'').replace(tmp_data_end_text,''); 
                append_html_to_editor(editor, new_text, old_range);
                tmp_div.remove(); 
                callback();
            },1);
        }
    }