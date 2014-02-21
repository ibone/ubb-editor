    //可控制才可输出，道理同html_to_ubb
    function ubb_to_html(editor,ubb) {
        var ubb_map = editor.ubb_map;
        var length = 0;
        var html = ubb.replace(/\x20?\[[^\[\]]+\]/gi, function (tag) {
            var t = tag;
            //好方法是tag[0],但ie67不支持
            //测试100W次substring(0,1)和tag.charAt(0)时间都差不多（毫秒）
            //chrome是830和760  ie7是1034和1016
            //chrome下tag[0]的时间也是760左右
            if (tag.substring(0, 1) === " ") {
                t = tag.substring(1);
            }
            return ubb_map[t] || tag;
        });
        return html;
    }
    