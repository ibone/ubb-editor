
$.ubb_editor.set_config('color',
    [{
        val : '333333',
        alt : '灰色-80%'
    }, {
        val : '666666',
        alt : '灰色-60%'
    }, {
        val : '999999',
        alt : '灰色-40%'
    }, {
        val : 'cccccc',
        alt : '灰色-20%'
    }, {
        val : 'bb0000',
        alt : '深红'
    }, {
        val : 'dd0000',
        alt : '红色'
    }, {
        val : 'ee4488',
        alt : '粉红'
    }, {
        val : 'ff66dd',
        alt : '淡紫'
    }, {
        val : '333399',
        alt : '深蓝'
    }, {
        val : '0066cc',
        alt : '蓝色'
    }, {
        val : '0099cc',
        alt : '天蓝'
    }, {
        val : '66cccc',
        alt : '淡蓝'
    }, {
        val : '336600',
        alt : '深绿'
    }, {
        val : '999900',
        alt : '深黄'
    }, {
        val : 'cccc33',
        alt : '淡黄'
    }, {
        val : '77cc33',
        alt : '淡绿'
    }, {
        val : '663300',
        alt : '咖啡'
    }, {
        val : 'cc6633',
        alt : '褐色'
    }, {
        val : 'ff9900',
        alt : '橙黄'
    }, {
        val : 'ffcc33',
        alt : '黄色'
    }
]);
$.ubb_editor.set_config('size',
    [{
        val : 1,
        alt : '小号字体',
        px  : '12px'
    }, {
        val : 2,
        alt : '标准字体',
        px  : '14px'
    }, {
        val : 3,
        alt : '大号字体',
        px  : '16px'
    }, {
        val : 4,
        alt : '特大字体',
        px  : '18px'
    }]
);
$.ubb_editor.set_config('size_map',
    (function(){
        var size = $.ubb_editor.get_config('size');
        var size_map = {};
        for (var i = 0; i < size.length; i++) {
            size_map[size[i].val+''] = size[i].px;
        }
        return size_map;
    })()
);

