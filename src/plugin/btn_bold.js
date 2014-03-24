$.ubb_editor.plugin('btn_bold',function(editor){
    editor.add_button(
        {
            name : 'bold',
            exec : function (editor) {
                editor.exec_command('bold', '');
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
            //标签有默认样式则不需要复杂的函数去生成ubb标签，直接使用ubb_map来生成
            // encode_ubb : function($element,text){
                // return '[b]'+text+'[/b]';
            // },
            decode_ubb : function(editor){
                return {
                    '[b]'  : '<strong>',
                    '[/b]' : '</strong>'
                };
            },
            allow_tag_name : {
                'b'  : true,
                'strong' : true
            },
            ubb_map : {
                'b' : 'b',
                'strong' : 'b'
            } 
        }
    );
});
