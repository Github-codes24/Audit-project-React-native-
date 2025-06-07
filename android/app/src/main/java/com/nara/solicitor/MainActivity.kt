package com.nara.solicitor

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import io.branch.rnbranch.RNBranchModule

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "NARA"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // ✅ This initializes the Branch session (important for cold start)
    RNBranchModule.initSession(intent?.data, this)
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)

    // ✅ This line ensures the intent is updated (Branch needs this!)
    setIntent(intent)

    // ✅ This ensures Branch also handles the new intent (important for background → foreground case)
    RNBranchModule.onNewIntent(intent)
  }
}
