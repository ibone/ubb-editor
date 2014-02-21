
$.ubb_editor.set_config('btn_bold',
    {
        exec : function (editor) {
            var $button = editor.find('font-bold a');
            if ($button.hasClass('on')) {
                $button.removeClass('on');
            } else {
                $button.addClass('on');
            }
            editor.exec_command('bold', '');
        },
        onselected : function (editor) {
            var val = $(editor.selection_text_container).css('font-weight');
            var $button = editor.find('.font-bold a');
            if (val === 'bold' || val+'' === '700') {
                $button.addClass('on');
            } else {
                $button.removeClass('on');
            }
        },
        html :  '<div class="font-btns font-bold">'+
                    '<a href="javascript:;" data-onclick="exec" data-name="btn_bold" title="粗体" unselectable="on">粗体</a>'+
                '</div>',
        get_ubb_attr : function($element){
            return $element.attr('ubb-bold')||'';
        }
    }
);
