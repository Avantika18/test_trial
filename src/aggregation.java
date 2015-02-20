/**
 * 
 */

/**
 * @author q4BS9Y9G
 *
 */
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;
import java.util.*;

public class aggregation {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String csvFile = "C:/Users/q4bs9y9g/Desktop/city_statistics/trendsChartOnlyDate.csv";
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";
		
		int[] year = new int[6];
        Arrays.fill(year,new Integer(0));
        int[] month = new int[12];
        Arrays.fill(month,new Integer(0));
        int[] week = new int[4];
        Arrays.fill(week,new Integer(0));
        int[] day = new int[7];
        Arrays.fill(day,new Integer(0));
        
		
		try {
			 
			br = new BufferedReader(new FileReader(csvFile));
			while ((line = br.readLine()) != null) {
	 
			        // use comma as separator
				String[] country = line.split(cvsSplitBy);
				
				String startDateString = country[1];
			    DateFormat df = new SimpleDateFormat("dd-MM-yyyy"); 
			    Date startDate=null;
			    try {
			        startDate = df.parse(startDateString);
			        //String newDateString = df.format(startDate);
			        
			        Date date = new Date();
			        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			       // System.out.println(sdf.format(date));
			        
			    	long diff = date.getTime() - startDate.getTime();
			    	 
					long diffSeconds = diff / 1000 % 60;
					long diffMinutes = diff / (60 * 1000) % 60;
					long diffHours = diff / (60 * 60 * 1000) % 24;
					long diffDays = diff / (24 * 60 * 60 * 1000);
			        
					double temp = diffDays/356;
			        int year_temp = (int)temp;
			        
			        if(year_temp<1)
			        	{
			        	if( diffDays < 1) day[0]++;
			        	else if(diffDays < 2) day[1]++;
			        	else if(diffDays < 3) day[2]++;
			        	else if(diffDays < 4) day[3]++;
			        	else if(diffDays < 5) day[4]++;
			        	else if(diffDays < 6) day[5]++;
			        	else if(diffDays < 7) day[6]++;
			        	
			        	else if(diffDays < 8) week[0]++;
			        	else if(diffDays < 14) week[1]++;
			        	else if(diffDays < 21) week[2]++;
			        	else if(diffDays < 28) week[3]++;
			        	
			        	else if(diffDays < 30) month[0]++;
			        	else if(diffDays < 60) month[1]++;
			        	else if(diffDays < 30*3) month[2]++;
			        	else if(diffDays < 30*4) month[3]++;
			        	else if(diffDays < 30*5) month[4]++;
			        	else if(diffDays < 30*6) month[5]++;
			        	else if(diffDays < 30*7) month[6]++;
			        	else if(diffDays < 30*8) month[7]++;
			        	else if(diffDays < 30*9) month[8]++;
			        	else if(diffDays < 30*10) month[9]++;
			        	else if(diffDays < 30*11) month[10]++;
			        	else month[11]++;
			        	
			        	
			        	}
			        else
			        	{
			        	year[year_temp-1]++;	
			        	}
			        //int month = ;
			        //int days = ;
					System.out.println(year);
			        
			        //System.out.println(startDate + "=" + Integer.parseInt(country[0]));
			    } catch (ParseException e) {
			        e.printStackTrace();
			    }

	 
				
	 
			}
	 
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	 
		System.out.println("YEAR");
		for(int y=0;y<6;y++)
			System.out.println(year[y]);
		
		System.out.println("MONTH");
		for(int y=0;y<12;y++)
			System.out.println(month[y]);
		
		System.out.println("WEEK");
		for(int y=0;y<4;y++)
			System.out.println(week[y]);
		
		System.out.println("DAY");
		for(int y=0;y<7;y++)
			System.out.println(day[y]);
		
		System.out.println("Done");

	}

}
