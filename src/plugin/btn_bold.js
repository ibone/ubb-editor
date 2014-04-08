$.ubb_editor.plugin('btn_bold',function(editor){
    var plugin_config = editor.get_plugin_config('btn_bold');
    editor.add_button(
        {
            name : 'bold',
            require : plugin_config.require,
            exec : function () {
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
            onselected : function (selection_container) {
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
            encode_ubb : function(){
                return {
                    ubb_text : '[b]',
                    node_name : 'b'
                }
            },
            display : function($dom){
                var self;
                if(!this.require){
                    $dom.find('strong').each(function(){
                        self = $(this);
                        self.after(self.text()).remove();
                    });
                }
            },
            decode_ubb : function(){
                return {
                    '[b]'  : '<strong>',
                    '[/b]' : '</strong>'
                };
            },
            allow_tag : {
                'b'  : true,
                'strong' : true
            }
        }
    );
});
