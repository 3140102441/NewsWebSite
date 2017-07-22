package news;
import java.io.BufferedReader;  
import java.io.FileWriter;  
import java.io.IOException;  
import java.io.InputStreamReader;  
import java.io.PrintWriter;  
import java.net.MalformedURLException;  
import java.net.URL;  
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Struct;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;  
import java.util.regex.Pattern;

import javax.management.RuntimeErrorException;
import javax.swing.text.DefaultEditorKit.InsertBreakAction;

import org.omg.CORBA.StringHolder;  


class MyTask extends TimerTask {  
	private WebSpider webnews;
	public MyTask(WebSpider webnews) {
		this.webnews = webnews;
	}
    @Override  
    public void run() {  
    	 webnews.deletenews();
         webnews.insertnews("caijing","http://news.baidu.com/n?cmd=4&class=stock&pn=1");
         webnews.insertnews("tiyu", "http://news.baidu.com/n?cmd=4&class=nba&pn=1");
         webnews.insertnews("yule", "http://news.baidu.com/n?cmd=4&class=enternews&pn=1");
         webnews.insertnews("junshi", "http://mil.news.baidu.com/n?cmd=4&class=mil&pn=1");
         webnews.insertnews("internet", "http://news.baidu.com/n?cmd=4&class=internet&pn=1");
         webnews.insertnews("women", "http://lady.baidu.com/n?cmd=4&class=healthnews&pn=1");
         webnews.insertnews("game", "http://news.baidu.com/n?cmd=4&class=netgames&pn=1");
         webnews.insertnews("car", "http://tech.baidu.com/n?cmd=4&class=technnews&pn=1");

         webnews.insertnews("tuijian", "http://shehui.news.baidu.com/n?cmd=4&class=socianews&pn=1");
  
    } 
}
    
  
public class WebSpider {  
	private String title = new String();
	private String URL = new String();
	private Time  time;
	private connect_mysql sql ;
	public WebSpider(){
		sql = new connect_mysql();
	}
	
	public void insertnews(String type,String targeturl){
		 	URL url = null;  
	        URLConnection urlconn = null;  
	        BufferedReader br = null;  
	        String res;

	        String r = "mon=\"ph\" target=\"_blank\">(.*?)<";
	        
	        
	        try {  
	            url = new URL(targeturl);  
	            urlconn = url.openConnection();  
	            br = new BufferedReader(new InputStreamReader(  
	                    urlconn.getInputStream()));  
	            String buf = null;  
	            while ((buf = br.readLine()) != null) {  
	            	  r = "mon=\"ph\" target=\"_blank\">(.*?)<";
	            	  
	      	       
	            	  res = match(r, buf);
	            	  if(res.equals(""))
	            		  continue;
	            	   title = res;
	            	  
	            	  r = "<div>&#8226;<a href=\"(.*?)\" mon=\"ph\" target=\"_blank\">";
	            	  res = match(r, buf);
	            	  if(res.equals("")){
	            		  continue;
	            		  //System.out.println(URL);
	            	  }
	            	  URL = res;
	            	  r = "&nbsp;(.*?)</span><br>";
	            	  res = match(r, buf);
	            	  if(res.equals("")){
	            		  continue;
	            	  }
	            	  int hour = Integer.parseInt(res.substring(0, 2));
            		  int min = Integer.parseInt(res.substring(3, 5));
            		  time  = new Time(hour,min,0);
	            	  
	            	  sql.Insert (type,title,URL,time);
	            	 
	            }  
	           
	            
//	            url = new URL(imageURL);  
//	            urlconn = url.openConnection();  
//	            br = new BufferedReader(new InputStreamReader(  
//	                    urlconn.getInputStream()));  
//	            buf = null;  
//	            String result = null;
//	            while ((buf = br.readLine()) != null) { 
//	            	result += buf;
//	            	
//	            } 
//	          
//	          ArrayList<String> uRList = new ArrayList<String>();
//	          System.out.println(result);
//	          r = " ne-role=\"slide-page\"> \\s+ <a href=\"([^\"]*?)\" title=\"([^\"]*?)\"><img src=\"([^\"]*?)\" ";
//	        
//	          res = matchimage(type,r, result,time);
//          	  
//          	
//          	  System.out.println(res);         	 
	            
	            
	            System.out.println("获取成功！");  
	        } catch (MalformedURLException e) {  
	            e.printStackTrace();  
	        } catch (IOException e) {  
	            e.printStackTrace();  
	        } finally {  
	            try {  
	                br.close();  
	            } catch (IOException e) {  
	                e.printStackTrace();  
	            }  
	        }  
	}
	
	public void deletenews(){
		sql.delete();
	}
	public String match(String r,String buf){
		String result = new String();
		 Pattern pattern = Pattern.compile(r, Pattern.CASE_INSENSITIVE
	                | Pattern.DOTALL);
		 Matcher matcher = pattern.matcher(buf);
		 
		 while (matcher.find()) {
			 
			  result = matcher.group(1);
         }
		 return result;
	}
	
//	public String matchimage(String type,String r,String buf,Time time){
//		String result = new String();
//		String url,title,imageurl;
//		 Pattern pattern = Pattern.compile(r, Pattern.CASE_INSENSITIVE
//	                | Pattern.DOTALL);
//		 Matcher matcher = pattern.matcher(buf);
//
//		 while (matcher.find()) {
//			  url =  matcher.group(1);
//			  title =  matcher.group(2);
//			  imageurl = matcher.group(3);
//			  
//			  sql.Insertimage(type,url,title,imageurl,time);
//			  
//			  
//			  System.out.println(result);
//         }
//		
//		 return result;
//	}
	
	
	
    public static void main(String[] args) {  
       WebSpider webnews = new WebSpider();
       
       Timer timer = new Timer();  
       timer.schedule(new MyTask(webnews), 0, 2000*30*5);  
           
      
    }
     
}