package com.clothing_app

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.res.Configuration
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
        try {
            when (resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) {
                Configuration.UI_MODE_NIGHT_YES -> setTheme(R.style.DarkTheme)
                Configuration.UI_MODE_NIGHT_NO -> setTheme(R.style.LightTheme)
                else -> setTheme(R.style.LightTheme)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            setTheme(R.style.LightTheme) // Fallback
        }

        try {
            SplashScreen.show(this)
        } catch (e: Exception) {
            e.printStackTrace()
        }

        super.onCreate(null)
    }

    override fun getMainComponentName(): String = "Clothing_App"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
