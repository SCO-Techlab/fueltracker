import { CapacitorConfig } from '@capacitor/cli';

/* 
Actualizar appId para la plataforma android:

These are the other places:

applicationId in android/app/build.gradle
android/app/src/main/res/values/strings.xml
If you want to update the package name to match, then you need to update the following items. For the example our new package is com.awesome.app

android/app/src/main/AndroidManifest.xml

manifest -> package
manifest -> application -> activity -> android:name

android/app/src/main/java/com/awesome/app/MainActivity.java

Notice you also have to update the path. Before it was android/app/src/main/java/io/ionic/starter/MainActivity.java
*/

const config: CapacitorConfig = {
  appId: 'com.oteos.si.fueltracker',
  appName: 'sco-fuel-tracker',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    /**
     * Allow cleartext traffic in the Web View.
     *
     * On Android, all cleartext traffic is disabled by default as of API 28.
     *
     * This is intended for use with live-reload servers where unencrypted HTTP
     * traffic is often used.
     *
     * **This is not intended for use in production.**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext: true
  }
};

export default config;
