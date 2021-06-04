import java.math.BigInteger; //import BigInteger; used for verylarge ints
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
// import org.apache.commons.lang.StringUtils;  //tried to use apache library did not work, note to not do so again in the future

class SHA256 {

    public static void main(String args[]) {
        // set of variables used for the running of the hasing algorithem
        long max_nonce = 9223372036854775807L;
        String previoushash = "0000047810ddbee0ae74f89fc09791ce0fd5ed4cf0926934790f545b32f8f592";
        Long blocknumber = 5L;
        String bn = String.valueOf(blocknumber); // used to convert long to a string and store in bn
        int nonce = 0; // number only used once
        String prefixzero = "0000";

        // loop used to test nonces till one with the desired start value(s) are found
        // also limited to a range that does not exceed the max nonce
        for (int i = 0; i <= max_nonce; i++) {
            try {

                String n = String.valueOf(nonce);
                String text = bn + previoushash + n; // creates texts to be hashed based on variables above
                // System.out.println("EASFSDF " + text);
                String newhash = toHexString(getSHA(text)); // hashes the text and converts it to a hex string to be
                                                            // stored as a data type

                // System.out.println(newhash);
                // System.out.println(nonce);
                // System.out.println(n);
                // break;
                // if (i % 500000 == 0) {S
                System.out.print(n + " | " + newhash + "\r"); // prints every 500000th hash and nonce, to optimize the
                                                              // speed as printing a lot slows it down
                                                              // carriage return stops the console from being flooded
                // }

                // checks if the hased text starts with the desired # of zero's, and prints the
                // hash, then exits the program
                // if not it increments the nonce
                if (newhash.startsWith(prefixzero)) {
                    System.out.println("\nwe got the hash its: " + newhash);
                    System.exit(0);
                }
                nonce++;

            }
            // basic catch statment that throws and exeption if the requirements are not
            // meet and prints it
            catch (NoSuchAlgorithmException e) {
                System.out.println("Exception thrown for incorrect algorithm: " + e);
            }
        }
    }

    public static byte[] getSHA(String input) throws NoSuchAlgorithmException {
        // Static getInstance method is called with hashing SHA-256
        MessageDigest md = MessageDigest.getInstance("SHA-256");

        // updates the message digest
        md.update(input.getBytes());

        // digest() method called to calculate message digest of an input and return
        // byte array
        return md.digest();
    }

    // converts toHexString based on the byte data
    public static String toHexString(byte[] hash) {

        BigInteger number = new BigInteger(1, hash);
        return String.format("%064X", number);
        /**
         * pad the BigInteger with the missing zeros as BigInteger ommits leading zeros
         * a hash from SHA256 is a hexadecimal number of 64 digits this means 0 can be
         * padded based upon the missing leading digits /
         * 
         * 
         * 
         * // Convert message digest into hex value StringBuilder hexString = new
         * StringBuilder(number.toString(16));
         * 
         * // Pad with leading zeros while (hexString.length() < 32) {
         * hexString.insert(0, '0'); }
         * 
         * return hexString.toString();
         */
    }
}