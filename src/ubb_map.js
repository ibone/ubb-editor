
//这部分本来是要放在core.js中,但font可配置以后，这部分和font关系很大，所以也做全局配置
//core中编辑器初始化的时候需要用到ubb_map的部分函数需要做定时处理
//规则匹配尽量做到严进宽出
$.ubb_editor.set_config('ubb_map',
    (function(){
        var ubb_map = {
            '[/font]' : '</font>',
            '[span]'  : '<span>',
            '[/span]' : '</span>',
            '[b]'     : '<b>',
            '[/b]'    : '</b>',
            '[p]'     : '<p>',
            '[/p]'    : '</p>',
            '[br]'    : '<br/>',
            '[s]'     : '&nbsp;',
            '[a end]' : '<a ',
            '[end]'   : '>',
            '[/a]'    : '</a>'
        };
        var color     = $.ubb_editor.get_config('color'),
            size      = $.ubb_editor.get_config('size'),
            size_map  = $.ubb_editor.get_config('size_map'),
            color_len = color.length,
            size_len  = size.length;
        for (var i = 0; i < size_len; i++) {
            ubb_map['[font' + size[i].val + ']'] = '<font ubb-size="'+ size[i].val +'" style="font-size:' + size[i].px + '">';
        }
        for (i = 0; i < color_len; i++) {
            var color_val = color[i].val;
            ubb_map['[font' + color_val + ']'] = '<font ubb-color="'+ color_val +'" style="color:#' + color_val + '">';
            for (var j = 0; j < size_len; j++) {
                ubb_map['[font' + size[j].val + color_val + ']'] = '<font ubb-size="'+ size[j].val +'" ubb-color="'+ color_val +'" style="font-size:' + size[j].px + ';color:#' + color_val + '">';
            }
        }
        return ubb_map;
    })()
);

$.ubb_editor.set_config('tag_map',
    {
        'span'   : 'font',
        'strong' : 'b',
        'div'    : 'p'
    }
);