namespace AdventOfCode;

public class Day1
{
    private readonly string Data;
    
    private List<int> FirstColumn { get; set; } = new();
    private List<int> SecondColumn { get; set; } = new();

    public Day1()
    {
        Data = File.ReadAllText("/home/guimano/repos/adventofcode/AdventOfCode/AdventOfCode/2024/day_1/Data/Data.txt");
        
        string[] rows = Data.Split("\n");

        foreach (string row in rows)
        {
            if (!string.IsNullOrEmpty(row))
            {
                FirstColumn.Add(int.Parse(row.Split("   ")[0]));
                SecondColumn.Add(int.Parse(row.Split("   ")[1]));
            }
        }
    }

    public void SolvePart1()
    {
        Console.WriteLine("Day 1 -- Starting challenge...");
        int totalDistances = 0;

        // order list in ascending order
        Console.WriteLine("Day 1 -- Sorting arrays...");
        FirstColumn.Sort();
        SecondColumn.Sort();
        
        Console.WriteLine("Day 1 -- Checking distances...");
        // compare values
        for (int i = 0; i < FirstColumn.Count; i++)
        {
            int distance = Math.Abs(FirstColumn[i] - SecondColumn[i]);
            totalDistances += distance;
        }
        
        Console.WriteLine("Day 1 -- Finished calculating.");
        Console.WriteLine($"Day 1 -- Result: {totalDistances}");
    }

    public void SolvePart2()
    {
        Console.WriteLine("Day 1 -- Starting challenge part 2...");
        int total = 0;

        List<int> firstColumn = RemoveReplicates(FirstColumn);

        Console.WriteLine("Day 1 -- Calculating similarity score...");
        foreach (int number in firstColumn)
        {
            int timesInNumber = SecondColumn.Where(n => n == number).Count();
            
            if(timesInNumber > 0)
                total += timesInNumber * number;
        }
        
        Console.WriteLine("Day 1 -- Finished calculating.");
        Console.WriteLine($"Day 1 -- Result: {total}");
    }

    public List<int> RemoveReplicates(List<int> numbers)
    {
        List<int> newNumbers = new();

        foreach (var number in numbers)
        {
            if (!newNumbers.Contains(number))
                newNumbers.Add(number);
        }

        return newNumbers;
    }
}