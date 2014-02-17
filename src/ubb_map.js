    var ubb_map = {
        '[font1]' : '<font size="1">',
        '[font2]' : '<font size="2">',
        '[font3]' : '<font size="3">',
        '[font4]' : '<font size="4">',
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
    var color_len = congif.color.length;
    var size_len = congif.size.length;
    for (var j = 0; j < size_len; j++) {
        ubb_map['[font' + congif.size[j] + ']'] = '<font size="' + congif.size[j] + '">';
    }
    for (var i = 0; i < color_len; i++) {
        var colorkey = congif.color[i].key;
        ubb_map['[font' + colorkey + ']'] = '<font color="#' + colorkey + '">';
        for (j = 0; j < size_len; j++) {
            ubb_map['[font' + congif.size[j] + colorkey + ']'] = '<font size="' + congif.size[j] + '" color="#' + colorkey + '">';
        }
    }
