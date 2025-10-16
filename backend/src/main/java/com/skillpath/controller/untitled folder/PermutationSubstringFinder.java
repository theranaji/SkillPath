import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

public class PermutationSubstringFinder {

    /**
     * Finds all starting indices in txt where any permutation of pat is found as a substring.
     * The method uses the Sliding Window technique with frequency arrays.
     * * @param txt The main string (length n).
     * @param pat The pattern string (length m).
     * @return A List of 0-based starting indices.
     */
    public static List<Integer> findPermutationSubstrings(String txt, String pat) {
        List<Integer> result = new ArrayList<>();
        int n = txt.length();
        int m = pat.length();

        // Edge case: if pat is longer than txt, no permutation can exist.
        if (m > n) {
            return result;
        }

        // We use an array of size 128 to cover all standard ASCII characters (English letters and numbers).
        // The index corresponds to the ASCII value of the character.
        int[] patFreq = new int[128];
        int[] windowFreq = new int[128];

        // 1. Initialize Frequency Arrays for pat and the first window of txt
        for (int i = 0; i < m; i++) {
            patFreq[pat.charAt(i)]++;
            windowFreq[txt.charAt(i)]++;
        }

        // Helper function to compare the two frequency arrays
        // Note: For optimization, we only need to compare the counts for the characters that
        // *might* be in the strings. Since the character set is small, a full array comparison is fine.
        int matches = 0; // Number of characters with matching frequency counts
        for (int i = 0; i < 128; i++) {
            if (patFreq[i] == windowFreq[i]) {
                matches++;
            }
        }
        
        // 2. Initial Check (Window starting at index 0)
        // If all 128 possible characters match in frequency, we have a permutation.
        if (matches == 128) {
            result.add(0);
        }

        // 3. Slide the Window across the rest of txt
        // i will be the right boundary of the next window (character to be added)
        for (int i = m; i < n; i++) {
            
            // --- Character entering the window (at index i) ---
            char charToAdd = txt.charAt(i);
            
            // Update the window and matches count for the entering character
            windowFreq[charToAdd]++;
            
            // Check if adding charToAdd improved or ruined the match status
            if (windowFreq[charToAdd] == patFreq[charToAdd]) {
                matches++; // Match improved
            } else if (windowFreq[charToAdd] - 1 == patFreq[charToAdd]) {
                matches--; // Match was good, but adding broke it
            }

            // --- Character leaving the window (at index i - m) ---
            char charToRemove = txt.charAt(i - m);

            // Update the window and matches count for the leaving character
            // Check if removing charToRemove improved or ruined the match status
            if (windowFreq[charToRemove] == patFreq[charToRemove]) {
                matches--; // Match was good, but removing broke it
            } else if (windowFreq[charToRemove] - 1 == patFreq[charToRemove]) {
                matches++; // Match was bad, but removing fixed it
            }
            
            windowFreq[charToRemove]--;

            // 4. Check for a permutation in the new window
            // The current window starts at index i - m + 1
            if (matches == 128) {
                result.add(i - m + 1);
            }
        }

        return result;
    }

    public static void main(String[] args) {
        // --- Sample 1 ---
        String txt1 = "BACDGABCDA";
        String pat1 = "ABCD";
        List<Integer> indices1 = findPermutationSubstrings(txt1, pat1);
        System.out.println("Sample Input 1:");
        System.out.println("txt = \"" + txt1 + "\", pat = \"" + pat1 + "\"");
        System.out.println("Output Indices:");
        indices1.forEach(System.out::println);
        // Expected Output: 0, 5, 6
        
        System.out.println("---");

        // --- Sample 2 ---
        String txt2 = "AAABABAA";
        String pat2 = "AABA";
        List<Integer> indices2 = findPermutationSubstrings(txt2, pat2);
        System.out.println("Sample Input 2:");
        System.out.println("txt = \"" + txt2 + "\", pat = \"" + pat2 + "\"");
        System.out.println("Output Indices:");
        indices2.forEach(System.out::println);
        // Expected Output: 0, 1, 4
        
        System.out.println("---");
        
        // --- Additional Test Case (Case Sensitivity) ---
        String txt3 = "AbCaBcA";
        String pat3 = "ABc";
        List<Integer> indices3 = findPermutationSubstrings(txt3, pat3);
        System.out.println("Sample Input 3 (Case Sensitivity):");
        System.out.println("txt = \"" + txt3 + "\", pat = \"" + pat3 + "\"");
        System.out.println("Output Indices:");
        indices3.forEach(System.out::println);
        // Expected Output: 1, 4 (Substrings: "bCa", "BcA")
    }
}