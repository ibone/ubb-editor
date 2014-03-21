    
    //获取现有range
    function get_range(editor) {
        if (editor.msie) {
            return get_selection(editor).createRange();
        } else {
            return get_selection(editor).getRangeAt(0);
        }
    }
    
    //新建range
    function create_range(editor) {
        if (editor.msie) {
            return editor.document.body.createTextRange();
        } else {
            return editor.document.createRange();
        }
    }
    
    function get_selection(editor) {
        var content_window = editor.iframe.contentWindow;
        if (editor.msie) {
            return content_window.document.selection;
        } else {
            return content_window.getSelection();
        }
    }
    
    function get_text_nodes_in(node) {
        var text_nodes = [];
        if (node.nodeType === 3) {
            text_nodes.push(node);
        } else {
            var children = node.childNodes;
            for (var i = 0, len = children.length; i < len; ++i) {
                text_nodes.push.apply(text_nodes, get_text_nodes_in(children[i]));
            }
        }
        return text_nodes;
    }
    
    //改变range的范围
    function set_range(editor, start, end, element) {
        var range = create_range(editor);
        if (!editor.msie) {
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
    
    //append 向编辑器插入html代码
    //@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
    function paste_html(editor, html, range) {
        editor.focus();
        var selection = null;
        if (editor.msie) {
            if(!range){
                range = get_range(editor);
            }
            range.pasteHTML(html);
        } else {
            if(range){
                selection = get_selection(editor);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            editor.exec_command('inserthtml',html);
        }
    }