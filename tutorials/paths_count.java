static int countWays(int mtrx[][], int vrtx, int i, int dest, boolean visited[]) { 
    // Base condition 
    // When reach to the destination 
    if (i == dest) { 
   
        return 1; 
    } 
    int total = 0; 
    for (int j = 0; j < vrtx; j++) { 
        if (mtrx[i][j] == 1 && !visited[j]) { 
   
            // Make vertex visited 
            visited[j] = true; 
   
            // Recursive function, for count ways 
            total += countWays(mtrx, vrtx, 
                               j, dest, visited); 
   
            // Backtracking 
            // Make vertex unvisited 
            visited[j] = false; 
        } 
    } 
   
    // Return total ways 
    return total; 
} 
   
// Function to count total ways 
// to reach destination 
static int totalWays(int mtrx[][], int vrtx, int src, int dest) { 
    boolean []visited = new boolean[vrtx]; 
   
    // Loop to make all vertex unvisited, 
    // Initially 
    for (int i = 0; i < vrtx; i++) { 
        visited[i] = false; 
    } 
   
    // Make source visited 
    visited[src] = true; 
   
    return countWays(mtrx, vrtx, src, dest, visited); 
} 
   
public static void main(String[] args) { 
    //vrtx: number of vertices
    int vrtx = 11; 
    //connectivity matrix
    int mtrx[][] = { 
        { 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0 }, 
        { 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 }, 
        { 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0 }, 
        { 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 }, 
        { 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0 }, 
        { 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0 }, 
        { 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 }, 
        { 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 }, 
        { 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0 }, 
        { 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0 }, 
        { 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 } 
    }; 
   
    int src = 3; 
    int dest = 9; 
   
    // Print total ways 
    System.out.print(totalWays(mtrx, vrtx, src - 1, dest - 1)); 
   
} 