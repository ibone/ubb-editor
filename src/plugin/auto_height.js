$.ubb_editor.plugin('auto_height',function(editor){
    var change_height = function(){
        var default_height = editor.get_config('height');
        var html = editor.document.body.innerHTML;
        var tmp_iframe = editor.create_iframe(
            editor.$root,
            'ubb_get_content_height',
            '<div id="ubb_temp_div">'+ html +'</div>',
            'width:'+ editor.$iframe.width() +'px;'
        );
        var iframe_document = editor.get_document(tmp_iframe);
        var div = $(iframe_document.body).find('#ubb_temp_div');
        var height = div.height();
        if( height < (default_height - 20) ){
            height = default_height;
        }else{
            height = height + 20;
        }
        editor.$iframe.css({
            height:height
        });
    }
    editor.on('content_change',function(event){
        change_height();
    });
});