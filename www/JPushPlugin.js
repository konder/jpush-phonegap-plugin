
var JPushPlugin = function(){
        
};
JPushPlugin.prototype.call_native = function ( name, args) {
         console.log("JPushPlugin.call_native:"+name);
         ret = cordova.exec(null,
                            null,
                           'JPushPlugin',
                            name,
                            args);
         return ret;
}
JPushPlugin.prototype.setTagsWithAlias = function (tags,alias) {
         
         console.log("JPushPlugin:setTagsWithAlias");
         if(tags==null){
            this.setAlias(alias);
            return;
         }
         if(alias==null){
            this.setTags(tags);
            return;
         }
         var arrayTagWithAlias=[tags];
         arrayTagWithAlias.unshift(alias);
         this.call_native( "setTagsWithAlias", arrayTagWithAlias);
}
JPushPlugin.prototype.setTags = function (data) {
        
         console.log("JPushPlugin:setTags");
         try{
            this.call_native("setTags", [data]);
         }
         catch(exception){
            alert(exception);
         }
}
JPushPlugin.prototype.setAlias = function (data) {
        
         console.log("JPushPlugin:setAlias");
         try{
             
            this.call_native("setAlias", [data]);
         }
         catch(exception){
             
            alert(exception);
         }
}
JPushPlugin.prototype.registerCallback = function (fn) {
    JPushPlugin.prototype.callback = fn;
}
JPushPlugin.prototype.pushCallback = function (data) {
         try{
             var title = data['extras']['cn.jpush.android.NOTIFICATION_CONTENT_TITLE'];
             var alert = data['extras']['cn.jpush.android.ALERT'];
             var extra = data['extras']['cn.jpush.android.EXTRA'];
             JPushPlugin.prototype.callback({title: title, alert: alert, extra: extra});
         }
         catch(exception){
            console.log("callback:" + exception);
         }
}
if(!window.plugins) {
        window.plugins = {};
}
if(!window.plugins.jPushPlugin){
        window.plugins.jPushPlugin = new JPushPlugin();
}               
module.exports = new JPushPlugin();
