import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
// import org.apache.commons.lang.StringUtils;

class SHA256 {
 
    public static void main(String args[])
    { 
        long max_nonce = 9223372036854775807L;
        String previoushash = "0000047810ddbee0ae74f89fc09791ce0fd5ed4cf0926934790f545b32f8f592"; 
        Long blocknumber = 5L;
        String bn = String.valueOf(blocknumber);
        int nonce = 0;
        String prefixzero = "000000";
        
        
        for (int i = 0; i <= max_nonce; i++){
            try 
            {   
                
                String n = String.valueOf(nonce);
                String text = bn + previoushash + n;
                //System.out.println("EASFSDF " + text);
                String newhash = toHexString(getSHA(text));

                //System.out.println(newhash); 
                //System.out.println(nonce);
                //System.out.println(n);
                //break;
                if (i % 500000 == 0) {
                     System.out.print(n + " | " + newhash + "\r");
                }
               
                if (newhash.startsWith(prefixzero)){
                    System.out.println("\nwe got the hash its: " + newhash);
                    System.exit(0);
                }
                nonce++;
    
            } 
            catch (NoSuchAlgorithmException e) { 
                System.out.println("Exception thrown for incorrect algorithm: " + e); 
            }
        } 
    }

    public static byte[] getSHA(String input) throws NoSuchAlgorithmException
    { 
        // Static getInstance method is called with hashing SHA-256 
        MessageDigest md = MessageDigest.getInstance("SHA-256"); 

        md.update(input.getBytes());
  
        // digest() method called to calculate message digest of an input and return byte array
        return md.digest(); 
    }
    
    public static String toHexString(byte[] hash)
    {
        
        BigInteger number = new BigInteger(1, hash);
        return String.format("%064X", number);
        /*
        // Convert message digest into hex value 
        StringBuilder hexString = new StringBuilder(number.toString(16)); 
  
        // Pad with leading zeros
        while (hexString.length() < 32) 
        { 
            hexString.insert(0, '0'); 
        } 
  
        return hexString.toString();*/
    } 
}