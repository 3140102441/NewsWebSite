package com.example.asus.mynews;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.NotificationCompat;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private WebView webview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webview = (WebView)findViewById(R.id.webView);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.setWebViewClient(new WebViewClient());
        webview.loadUrl("http://10.180.113.82:3000/");
        sendNotification();
    }

    public void sendNotification(){
        //实例化通知管理器
        NotificationManager notificationManager= (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        //实例化通知
        NotificationCompat.Builder builder=new NotificationCompat.Builder(this);
        builder.setContentTitle("My News--热门新闻推荐");//设置通知标题
        builder.setContentText("复星系股票午后突然跳水：复星医药跌8%，复星国际跌..");//设置通知内容
        builder.setDefaults(NotificationCompat.DEFAULT_ALL);//设置通知的方式，震动、LED灯、音乐等
        builder.setAutoCancel(true);//点击通知后，状态栏自动删除通知
        builder.setSmallIcon(android.R.drawable.ic_media_play);//设置小图标
        //builder.setContentIntent(PendingIntent.getActivity(this,0x102,new Intent(this,RaingRecived.class),0));//设置点击通知后将要启动的程序组件对应的PendingIntent
        Notification notification=builder.build();

        //发送通知
        notificationManager.notify(0x101,notification);

    }
}


