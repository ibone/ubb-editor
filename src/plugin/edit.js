$.ubb_editor.plugin('edit',function(editor){
    //当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
    editor.$document.on("mouseup", function (event) {
        onselected(editor, event);
        editor.hide_panel();
    });
    
    //粘贴处理
    if(editor.msie){
        editor.document.documentElement.attachEvent("onpaste", function(event){
            paste(editor, event, function(){
                editor.fire('content_change');
            });
        });
    }else{
        editor.$document.on("paste", function (event) {
            paste(editor, event, function(){
                editor.fire('content_change');
            });
        });
    }

    //复制事件触发的时候是不会触发keyup事件的
    editor.$document.on("keyup", function (event) {
        //展示当前字符位置的文字样式
        onselected(editor,event);
        editor.fire('content_change');
    });
    editor.on('content_change',function(){
        editor.$textarea.text(editor.html_to_ubb())
                        //保存用户输入的纯文字，不包含标签，做内容长度校验使用
                        .data('text',$(editor.document.body).text());
    });
    
    function onselected(editor, event){
        //判断是否选中文本
        var range = editor.get_range();
        if (editor.msie) {
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
        if(editor.msie){
            old_range = editor.get_range();
            tmp_container = editor.create_iframe($(editor.iframe_document.body),tmp_container_id);
            tmp_container.contentWindow.focus(); 
            tmp_container.contentWindow.document.execCommand("Paste",false,null); 
            editor.focus();
            paste_text = tmp_container.contentWindow.document.body.innerHTML;
            $(tmp_container).remove();
            new_text = filter_paste_text(paste_text);
            editor.paste_html(new_text, old_range);
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
            old_range = editor.get_range();
            //ie中在复制之前改变粘贴的光标位置不会成功，而且使用旧的range会清除之前粘贴的文本
            editor.set_range(tmp_data_start_text.length,tmp_data_start_text.length,tmp_container);
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
                editor.paste_html(new_text, old_range);
                callback();
            },1);
        }
    }
    
    function prevent_default(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }
});