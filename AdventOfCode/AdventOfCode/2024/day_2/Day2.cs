namespace AdventOfCode;

public class Day2
{
    private readonly string[] Levels;

    public Day2()
    {
        string data =
            File.ReadAllText("/home/guimano/repos/adventofcode/AdventOfCode/AdventOfCode/2024/day_2/Data/Data.txt");

        Levels = data.Split("\n");
    }

    public void SolvePart1()
    {
        Console.WriteLine("Day 2 -- Starting challenge...");
        
        int totalSafeReports = 0;
        
        Console.WriteLine("Day 2 -- Checking safe levels...");
        foreach (string level in Levels)
        {
            int[] lvlNums = level.Split(" ").Select(int.Parse).ToArray();

            if (IsSafe(lvlNums))
            {
                totalSafeReports++;
            }
        }
        
        Console.WriteLine("Day 2 -- Finished calculating.");
        Console.WriteLine($"Day 2 -- Result: {totalSafeReports}");
    }

    private bool IsSafe(int[] level)
    {
        bool isAscOrDesc = IsAscendingOrDescending(level);

        if (isAscOrDesc)
        {
            for (int i = 0; i < level.Length - 1; i++)
            {
                int distance = Math.Abs(level[i] - level[i + 1]);
                if (distance is < 0 or > 3)
                {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    private bool IsAscendingOrDescending(int[] level)
    {
        bool isAscending = level[0] < level[1];

        for (int i = 0; i < level.Length - 1; i++)
        {
            if (level[i] == level[i + 1])
                return false;
            
            if (level[i] > level[i + 1])
            {
                if (isAscending)
                    return false;
            }
            else
            {
                if (!isAscending)
                    return false;
            }
        }

        return true;
    }
}