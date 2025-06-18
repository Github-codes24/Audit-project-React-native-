#import "AppDelegate.h"

#import <RNBranch/RNBranch.h> // Branch.io
#import <Firebase.h> // Firebase
#import <React/RCTBundleURLProvider.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#import <UserNotifications/UserNotifications.h> // 🔔 Required for push notifications

@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ✅ Firebase setup
  [FIRApp configure];

  // ✅ Branch setup
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];

  // ✅ Push Notification Setup
  if ([UNUserNotificationCenter class] != nil) {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self; // 👈 Required for receiving push in foreground

    [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                          completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (granted) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [application registerForRemoteNotifications];
        });
      } else {
        NSLog(@"🔕 Push permission denied: %@", error);
      }
    }];
  }

  self.moduleName = @"NARA";
  self.dependencyProvider = [RCTAppDependencyProvider new];
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// ✅ React Native bundle
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// ✅ Deep linking: Custom scheme
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RNBranch application:application openURL:url options:options];
}

// ✅ Deep linking: Universal links
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RNBranch continueUserActivity:userActivity];
}

// ✅ Register device token with FCM
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  NSLog(@"✅ Registered with APNs, token: %@", deviceToken);
  [FIRMessaging messaging].APNSToken = deviceToken;
}

// ✅ Handle push registration failure
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"❌ Failed to register for remote notifications: %@", error);
}

// ✅ Optional: Handle push while in foreground
// (only needed if you want to show notifications manually when app is open)
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound |
                    UNNotificationPresentationOptionBadge |
                    UNNotificationPresentationOptionAlert);
}

@end
