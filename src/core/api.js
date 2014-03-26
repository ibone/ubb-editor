function api(editor){
    editor.create_iframe = function($parent,id,html,css){
        return create_iframe($parent,id,html,css);
    };

    editor.set_range = function(start, end, element){
        if(!element){
            element = editor.document.body;
        }
        set_range(this,start, end, element);
    };

    editor.get_range = function(){
        return get_range(this);
    };
    
    editor.create_range = function(){
        return create_range(this);
    };

    editor.get_selection = function(){
        return get_selection(this);
    };
    
    editor.restore_range = function(range){
        restore_range(this,range);
    };
    
    editor.paste_html = function(html, range){
        paste_html(this, html, range);
    };
    
    editor.html_to_ubb = function(html){
        if(!html){
            html = editor.document.body.innerHTML
        }
        return html_to_ubb(this,html);
    };

    editor.ubb_to_html = function(ubb){
        if(!ubb){
            return '';
        }
        return ubb_to_html(this,ubb);
    };
    
    editor.move_cursor = function(index){
        if(type_of(index) === 'number'){
            editor.set_range(index,index);
            this.focus();
        }
    };
    
    editor.focus = function(){
        this.iframe.contentWindow.focus();
    };
    
    editor.add_button = function(button){
        this.buttons[button.name] = button;
        this.buttons[this.buttons.length] = button;
    };
    
    editor.exec_command = function(command, value) {
        this.hide_panel();;
        this.document.execCommand(command, false, value);
        this.focus();
        this.fire('content_change');
    };
    
    editor.hide_panel = function() {
        if (this.cur_panel) {
            this.cur_panel.hide();
            this.cur_panel = null;
        }
    };
    
    editor.add_panel = function(panel_html) {
        this.hide_panel();
        this.cur_panel = $(panel_html);
        this.$toolbar.append(this.cur_panel);
    };
    
    editor.toggle_panel = function(select_str) {
        if (this.cur_panel && this.cur_panel.is(select_str)) {
            this.hide_panel();
        } else {
            this.hide_panel();
            this.cur_panel = this.find(select_str).show();
        }
    };
    
    editor.find = function(select_str){
        return this.$root.find(select_str);
    };
    
    editor.data = function(key, val){
        if(type_of(key) !== 'string'){
            return null;
        }
        if(arguments.length > 1){
            return this.$root.data(key,val);
        }else{
            return this.$root.data(key);
        }
    };
    
    editor.get_config = function(key){
        return this.config[key];
    };
    
    editor.get_plugin_config = function(plugin_name){
        return this.get_config('plugin')[plugin_name];
    };
    
    editor.fire = function(event_name){
        this.$root.trigger(event_name,this);
    };
    
    editor.on = function(event_name,callback){
        this.$root.on(event_name,callback);
    };
    
    editor.msie = is_ie678;
    
    editor.get_document = function(iframe){
        return get_document(iframe);
    };
    
    editor.html_to_text = function(html){
        var text = html.replace(/<[^><]+>/g, '');
            text = text.replace(/ {2}/g, ' &nbsp;');
            text = text.replace(/\n/g, '');
        return text;
    };
    
    editor.get_selected_container = function(event){
        var selection_container = null;
        var range = editor.get_range();
        if (editor.msie) {
            selection_container = range.parentElement();
        } else {
            if (range.commonAncestorContainer.nodeType === 3) {
                selection_container = range.commonAncestorContainer.parentNode;
            } else {
                selection_container = range.commonAncestorContainer;
            }
        }
        if (event && !selection_container) {
            selection_container = event.srcElement ? event.srcElement : event.target;
        }
        return selection_container;
    }
}