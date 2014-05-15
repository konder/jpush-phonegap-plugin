#JPush Phonegap Plugin

修正官方源的bug和陆续实现一些功能。


##安装

~~~ sh
cordova plugin add https://github.comg/konder/jpush-phonegap-plugin.git
~~~


##修改配置

###Android
config.xml

~~~ xml
<meta-data android:name="JPUSH_CHANNEL" android:value="developer-default"/>
<meta-data android:name="JPUSH_APPKEY" android:value="YOUR_JPUSH_APPKEY"/>
~~~


MainActivity

~~~ java
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

config.xml

~~~ xml
<feature name="JPushPlugin">
    <param name="ios-package" value="JPushPlugin" />
    <param name="onload" value="true" />
</feature>
~~~


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

