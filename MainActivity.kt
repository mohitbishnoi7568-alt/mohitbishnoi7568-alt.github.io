package com.mohit.ai

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.util.Locale

class MainActivity : Activity() {
    private lateinit var web: WebView
    private var recognizer: SpeechRecognizer? = null
    private val REQ = 1001

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(com.mohit.ai.R.layout.activity_main)
        web = findViewById(com.mohit.ai.R.id.webView)
        web.settings.javaScriptEnabled = true
        web.settings.domStorageEnabled = true
        web.settings.mediaPlaybackRequiresUserGesture = false
        web.webViewClient = WebViewClient()
        web.webChromeClient = WebChromeClient()
        web.addJavascriptInterface(AndroidBridge(), "Android")
        web.loadUrl("file:///android_asset/site/index.html")
        requestAudio()
    }

    private fun requestAudio() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED)
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.RECORD_AUDIO), REQ)
    }

    inner class AndroidBridge {
        @JavascriptInterface fun startVoice() {
            runOnUiThread { startListening() }
        }
        @JavascriptInterface fun speak(text: String) {
            runOnUiThread { web.evaluateJavascript("window.mohitSpeak && window.mohitSpeak(${org.json.JSONObject.quote(text)});", null) }
        }
        @JavascriptInterface fun openApp(name: String) {
            runCatching {
                val pm = packageManager
                val pkg = when (name.lowercase(Locale.ROOT)) {
                    "whatsapp" -> "com.whatsapp"
                    "youtube" -> "com.google.android.youtube"
                    "instagram" -> "com.instagram.android"
                    "chrome" -> "com.android.chrome"
                    "camera" -> "com.android.camera2"
                    else -> null
                }
                if (pkg != null) {
                    val intent = pm.getLaunchIntentForPackage(pkg)
                    if (intent != null) startActivity(intent) else Toast.makeText(this@MainActivity, "App not installed", Toast.LENGTH_SHORT).show()
                }
            }
        }
        @JavascriptInterface fun call(number: String) {
            val uri = Uri.parse("tel:$number")
            if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) startActivity(Intent(Intent.ACTION_CALL, uri))
            else startActivity(Intent(Intent.ACTION_DIAL, uri))
        }
    }

    private fun startListening() {
        if (!SpeechRecognizer.isRecognitionAvailable(this)) { toast("Voice recognition is not available") ; return }
        recognizer?.destroy()
        recognizer = SpeechRecognizer.createSpeechRecognizer(this)
        recognizer!!.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) { js("window.mohitVoiceState && window.mohitVoiceState('listening')") }
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() { js("window.mohitVoiceState && window.mohitVoiceState('processing')") }
            override fun onError(error: Int) { js("window.mohitVoiceState && window.mohitVoiceState('idle')") }
            override fun onResults(results: Bundle?) {
                val text = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.firstOrNull().orEmpty()
                js("window.mohitVoiceCommand && window.mohitVoiceCommand(${org.json.JSONObject.quote(text)})")
            }
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "hi-IN")
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "hi-IN")
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3)
        }
        recognizer!!.startListening(intent)
    }

    private fun js(s: String) = runOnUiThread { web.evaluateJavascript(s, null) }
    private fun toast(s: String) = Toast.makeText(this, s, Toast.LENGTH_SHORT).show()
    override fun onDestroy() { recognizer?.destroy(); super.onDestroy() }
}
