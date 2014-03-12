    
    //获取现有range
    function get_range(editor) {
        if (is_ie678) {
            return get_selection(editor).createRange();
        } else {
            return get_selection(editor).getRangeAt(0);
        }
    }
    
    //新建range
    function create_range(editor) {
        if (is_ie678) {
            return editor.iframe_document.body.createTextRange();
        } else {
            return editor.iframe_document.createRange();
        }
    }
    
    function get_selection(editor) {
        var content_window = editor.iframe.contentWindow;
        if (is_ie678) {
            return content_window.document.selection;
        } else {
            return content_window.getSelection();
        }
    }
    
    //改变range的范围
    function set_range(editor, start, end, element) {
        if(!element){
            element = editor.iframe_document.body;
        }
        var range = create_range(editor);
        if (!is_ie678) {
            range.selectNodeContents(element);
            var text_nodes = get_text_nodes_in(element);
            var foundStart = false;
            var char_count = 0, end_char_count;

            for (var i = 0, text_node; text_node = text_nodes[i++]; ) {
                end_char_count = char_count + text_node.length;
                if (!foundStart && start >= char_count && (start < end_char_count || (start === end_char_count && i < text_nodes.length))) {
                    range.setStart(text_node, start - char_count);
                    foundStart = true;
                }
                if (foundStart && end <= end_char_count) {
                    range.setEnd(text_node, end - char_count);
                    break;
                }
                char_count = end_char_count;
            }

            var selection = get_selection(editor);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            range.moveToElementText(element);
            range.collapse(true);
            range.moveEnd("character", end);
            range.moveStart("character", start);
            range.select();
        }
    }