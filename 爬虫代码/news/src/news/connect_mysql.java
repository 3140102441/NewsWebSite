package news;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;

public class connect_mysql {
	private Connection con;
	private Statement stmt = null ;
	public connect_mysql(){
		 String driver = "com.mysql.jdbc.Driver";
		 String url = "jdbc:mysql://localhost:3306/news";
		 String user = "root";
        String password = "3140102441";
        try{
        Class.forName(driver);
      
        con = DriverManager.getConnection(url,user,password);

        if(!con.isClosed())
            System.out.println("Succeeded connecting to the Database!");
        
        stmt = con .createStatement();
        }
        catch (Exception e) {
			// TODO: handle exception
        	
		}
	}
	public void Insert(String type,String title,String URL,Time time){
        try {
        	
            String sql = "insert into news_infor (title,newstype,newcontent,newstime) values(?,?,?,?)";
            PreparedStatement preStmt =con.prepareStatement(sql);  
            preStmt.setString(1,title);  
            preStmt.setString(2,type);
            preStmt.setString(3,URL);
            preStmt.setTime(4, time);
            preStmt.executeUpdate(); 

        } catch(SQLException e) {
            //数据库连接失败异常处理
            e.printStackTrace();  
            }catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            
        }
    }
	public void Insertimage(String type,String URL,String title,String imageurl,Time time){
        try {
        	
            String sql = "insert into news_infor (title,newstype,newcontent,image,newstime) values(?,?,?,?,?)";
            PreparedStatement preStmt =con.prepareStatement(sql);  
            preStmt.setString(1,title);  
            preStmt.setString(2,type);
            preStmt.setString(3,URL);
            preStmt.setString(4, imageurl);
            preStmt.setTime(5, time);
            preStmt.executeUpdate(); 
            System.out.println("df");
        } catch(SQLException e) {
            //数据库连接失败异常处理
            e.printStackTrace();  
            }catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }finally{
            
        }
    }
	
	public void delete(){
		String sql = "delete from news_infor ";
        try {
            stmt.executeUpdate(sql);
        }catch (Exception e){
            e.printStackTrace();
        }
	}
}
