package com.personal.manga;

import android.Manifest;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;

import androidx.core.app.ActivityCompat;
import androidx.work.WorkManager;

import com.getcapacitor.BridgeActivity;
import com.personal.manga.plugins.DownloadPlugin;
import com.personal.manga.plugins.GalleryPlugin;
import com.personal.manga.plugins.MangaPlugin;
import com.personal.manga.plugins.SiteMangaPlugin;
import com.personal.manga.plugins.SitePlugin;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(GalleryPlugin.class);
    registerPlugin(MangaPlugin.class);
    registerPlugin(SitePlugin.class);
    registerPlugin(SiteMangaPlugin.class);
    registerPlugin(DownloadPlugin.class);

    super.onCreate(savedInstanceState);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      if (!Environment.isExternalStorageManager()) {
        startActivity(new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION));

      }
    }

  }
}
