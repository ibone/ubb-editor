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
        var tmp_div, paste_text, new_text, tmp_iframe, old_range; 
        if(is_ie678){
            tmp_iframe = $(editor.iframe_document.body).find('#ifmTemp');
            if(!tmp_iframe.length){
                tmp_iframe = $('<iframe id="ifmTemp" style="left:-10000px;height:1px;width:1px;position:absolute;overflow:hidden;"></iframe>');
                $(editor.iframe_document.body).append(tmp_iframe);
                var tmp_iframe_document = tmp_iframe[0].contentWindow.document;
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
            append_html_to_editor(editor, new_text);
            callback();
            prevent_default(event);
            return false; 
        }else{
            tmp_div = $('<div id="htmleditor_tempdiv" style="left:-10000px;height:1px;width:1px;position:absolute;overflow:hidden;">start</div>');
            $(editor.iframe_document.body).append(tmp_div); 
            //disable keyup,keypress, mousedown and keydown 
            editor.iframe_document.addEventListener("mousedown",prevent_default,false); 
            editor.iframe_document.addEventListener("keydown",prevent_default,false); 
            old_range = get_range(editor); 
            set_range(editor,0,0,tmp_div[0]);
            window.setTimeout(function(){
                paste_text = tmp_div.html();
                if(paste_text && paste_text.length === 0){
                    tmp_div.remove(); 
                    return;
                } 
                var selection = get_selection(editor);
                if (old_range){
                    selection.removeAllRanges();
                    selection.addRange(old_range);
                } 
                new_text=filter_paste_text(paste_text); 
                append_html_to_editor(editor, new_text);
                tmp_div.remove(); 
                callback();
            },1); 
            //enable keydown,keyup,keypress, mousedown; 
            editor.iframe_document.removeEventListener("mousedown",prevent_default,false); 
            editor.iframe_document.removeEventListener("keydown",prevent_default,false); 
            return true; 
        }
    }