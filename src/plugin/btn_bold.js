$.ubb_editor.plugin('btn_bold',function(editor){
    editor.add_button(
        {
            name : 'bold',
            exec : function (editor) {
                var add_ubb_attr = function() {
                    var fonts = $(editor.document).find("strong,b");
                    var $font;
                    for (var i = 0, len = fonts.length; i < len; i++) {
                        $font = fonts.eq(i);
                        $font.attr(self.ubb_attr,'bold');
                    }
                };
                editor.exec_command('bold', '');
                add_ubb_attr();
            },
            onselected : function (editor,selection_container) {
                var val = $(selection_container).css('font-weight');
                var $button = editor.find('.font-bold a');
                if (val === 'bold' || val+'' === '700') {
                    $button.addClass('on');
                } else {
                    $button.removeClass('on');
                }
            },
            html :  '<div class="font-btns font-bold">'+
                        '<a href="javascript:;" data-onclick="exec" data-name="bold" title="粗体" unselectable="on">粗体</a>'+
                    '</div>',
            encode_ubb : function(attr_value){
                if(attr_value){
                    return {
                        node_name : 'b',
                        node_attr : ''
                    };
                }else{
                    return {};
                }
            },
            decode_ubb : function(editor){
                return {
                    '[b]'  : '<strong ubb-weight="bold">',
                    '[/b]' : '</strong>'
                };
            },
            allow_tag : {
                'b'  : true,
                'strong' : true
            },
            ubb_attr : 'ubb-weight'
        }
    );
});
