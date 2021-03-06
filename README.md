#JPush Phonegap Plugin

修正官方源的bug和陆续实现一些功能。


##安装

~~~ sh
cordova plugin add https://github.comg/konder/jpush-phonegap-plugin.git
~~~


##修改配置

###Android

修改config.xml，覆盖从极光控制台获取的AAPKEY和CHANNEL参数。

~~~ xml
<meta-data android:name="JPUSH_CHANNEL" android:value="developer-default"/>
<meta-data android:name="JPUSH_APPKEY" android:value="YOUR_JPUSH_APPKEY"/>
~~~


修改"MainActivity.java"，在onCreate的时候执行初始化，Handle在Resume和Pause时的逻辑。

~~~ java
@Override
public void onCreate(Bundle savedInstanceState)
{
    super.onCreate(savedInstanceState);

    //release时关闭
    JPushInterface.setDebugMode(true);
    JPushInterface.init(this);

    super.init();
    // Set by <content src="index.html" /> in config.xml
    super.loadUrl(Config.getStartUrl());
    //super.loadUrl("file:///android_asset/www/index.html");
}

@Override
protected void onResume() {
    super.onResume();
    JPushInterface.onResume(this);
}

@Override
protected void onPause() {
    super.onPause();
    JPushInterface.onPause(this);
}
~~~

###IOS

修改config.xml，启用JPushPlgin。

~~~ xml
<feature name="JPushPlugin">
    <param name="ios-package" value="JPushPlugin" />
    <param name="onload" value="true" />
</feature>
~~~


修改代理类，执行初始化和处理didRegisterForRemoteNotificationsWithDeviceToken事件与didReceiveRemoteNotification的逻辑。
~~~ c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]] autorelease];
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
 
    // Required
    [APService registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                                    UIRemoteNotificationTypeSound |
                                                    UIRemoteNotificationTypeAlert)];
    // Required
    [APService setupWithOption:launchOptions];
     
    return YES;
}
 
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
     
    // Required
    [APService registerDeviceToken:deviceToken];
}
 
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
     
    // Required
    [APService handleRemoteNotification:userInfo];
}
~~~

##使用


~~~ javascript
// 接收registrationID, 现在的设计有可能会因为早于JPush的cn.jpush.android.intent.REGISTRATION广播而无法获取。
// registrationID用来作为标示用户，可以取代setAlias，类似于APNS的token。
var tokenHandle = function(result){
    if (result && result['registrationID']) {
        alert(result['registrationID']);
    }
}

// 处理消息达到后的逻辑，扩展字段在event.extra。
var onNotification = function(event){
    alert(event.alert);
}

// 在onDeviceReady事件注册。
window.plugins.jPushPlugin.register(
    tokenHandle,
    onNotification
);
~~~

