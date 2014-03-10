    //可控制便可转换，所有能操作的样式才能变成ubb格式，其他一律清除
    function html_to_ubb(editor) {
        //var reg_spanColse = /<span(?!.*?<span).*?<\/span>/gi;
        //.*?后面的?号是避免正则贪婪
        //为什么要匹配配对标签，比如<font size="3">test</font>，这种可以针对单个开始标签或者结束标签进行转换
        //比如这种<font>test</font>情况就需要将两个标签都清除，但结束标签的清除条件是基于开始标签无样式属性决定
        //然而正则很难做到匹配两个配对的标签，或者说一行正则很难做到，以下几种情况很麻烦
        //<a href="xxx.com"><img src="xxx.com"></a>
        //<x href="xxx.com"><xxx src="xxx.com"></x>
        //注释第一行的正则是可以做到匹配，但仅限于span标签，要替换其他标签就要写类似的多个正则，有需要多少个，就要枚举多少个，在老版本里我是这样干的
        
        //以下是一个有缺陷的正则，用来匹配配对标签，但遇到<img src="xxx.com"></a>这样会匹配成功
        //var reg_pair_tag = /<[a-z]{1,6}[^<]+?<\/[a-z]{1,6}>/gi;
        //目前是使用John Resig写的一个html parse来处理配对
        
        var html = editor.iframe_document.body.innerHTML,
            allow_tag_name = {},
            default_ubb_map = {
                'p'   : 'p',
                'div' : 'p',
                'br'  : 'br'
            },
            toolbar = editor.toolbar,
            buttons = editor.buttons,
            toolbar_length = toolbar.length;
            
        $.extend(allow_tag_name,default_ubb_map);
        for(var i = 0; i < toolbar_length; i++){
            $.extend(allow_tag_name,buttons[toolbar[i]].allow_tag_name);
            $.extend(default_ubb_map,buttons[toolbar[i]].ubb_map);
        }
        
        var elements = [],
            cur_parent_node_be_used = false,
            ubb_text = '';
        html_parser( html, {
            start: function( node_name, attrs, unary ) {
                var attr_name,ubb_tag,button;
                if(!allow_tag_name[node_name]){
                    return;
                }
                for ( var attr in attrs ){
                    attr_name = attrs[ attr ].name;
                    for(i = 0; i < toolbar_length; i++){
                        button = buttons[toolbar[i]];
                        if(button.allow_attr === attr_name){
                            ubb_tag = button.encode_ubb(attrs[attr].value);
                            break;
                        }
                    }
                }
                if(!ubb_tag && default_ubb_map[node_name]){
                    ubb_tag = '[' + default_ubb_map[node_name] + ']';
                }
                if(ubb_tag){
                    cur_parent_node_be_used = true;
                    ubb_text += ubb_tag;
                }else{
                    cur_parent_node_be_used = false;
                }
                if ( !unary ) {
                    elements.push({
                        node_name : node_name,
                        be_used : cur_parent_node_be_used
                    });
                }
            },
            end: function( node_name ) {
                if(cur_parent_node_be_used){
                    ubb_text += '[/' + (default_ubb_map[node_name]||node_name) + ']';
                }
                if(elements.length >= 2){
                    elements.length -= 1;
                    cur_parent_node_be_used = elements[ elements.length - 1 ].be_used;
                }else{
                    cur_parent_node_be_used = false;
                }
            },
            chars: function( text ) {
                ubb_text += text;
            }
        });
        
        //清除换行符
        ubb_text = ubb_text.replace(/\r|\n/g, '');
        return ubb_text;
    }
