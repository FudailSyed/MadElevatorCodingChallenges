//system imports to read files and use lists.
//this one is needed for basic system functions.
using System;
//this one is needed to use lists.
using System.Collections.Generic;
//this one is needed to read files.
using System.IO;
//This is Linq (Language Integrated Querying) which is used for querying data within the code.
using System.Linq;
using Microsoft.VisualBasic;

//creating the employee object with its properties.
public class Employee
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
}


class Program
{

    static void Main(string[] args)
    {
        //Task 3
        //Check if the file exists using the built in File.Exists method
        //If file does not exist then end the program with error message.
        if (!File.Exists("employees.csv"))
        {
            Console.WriteLine("ERROR: CSV File Not Found");
            return;
        }
        //Try to read the file and print the data from all the calculations, if there is a problem or error, the catch block will print the exception.
        try
        {
             //creating the filepath variable that will hold the employees data.
        string filePath = "employees.csv";
        
        //This creates a new list of "Employee" objects names employees.
        List<Employee> employees = new List<Employee>();

        //Load the data from the filepath we defined before into the employees list by calling the function we created.
        LoadData(filePath, employees);

        //TASK 2
        //creating a variable called deptSalaries that will hold the employees and group them by their department.
        //group employee e by department and put them into group g.
        var deptSalaries = employees.GroupBy(e => e.Department).Select(g => new
        {
            //set the department name to the key of the group g.
            Department = g.Key,
            //Calculating the total sum of the salaries per department.
            //the sum of the group g will be the sum of all the employee (e) salaries in that group (g).
            Total = g.Sum(e => e.Salary)
        });

        //printing the header of the output
        Console.WriteLine("Total Salaries by Department:");

        //using a foreach loop to go through each group in deptSalaries (Each department) and then print the total sum of the salaries calculated earlier.
        foreach (var group in deptSalaries)
        {
            Console.WriteLine($"{group.Department}: {group.Total:C}");
        }

        //Using LINQ again to sort employees in descending order of salary and then creating a variable called top employee which will take the first employee from the sorted list (the one with the highest salary).
        var highestPaid = employees.OrderByDescending(e => e.Salary);
        var topEmployee = highestPaid.FirstOrDefault();
        Console.WriteLine($"Highest Paid Employee: {topEmployee.FirstName} {topEmployee.LastName}, Salary: {topEmployee.Salary:C}");

        //using LINQ to calculate the average of all the employee salaries
        var avgSalary = employees.Average(e => e.Salary);
        //:C will format as currency
        Console.WriteLine($"Average Salary of Employees: {avgSalary:C}");
        }
        //This is the catch block that will find the exception ex and then print what the error is.
        catch (Exception ex)
        {
            Console.WriteLine($"Error accessing file: {ex.Message}");
        }
       

    }

    //static method to load the data from the file into the list.
    static void LoadData(string data, List<Employee> employeeList)
    {
        //creating array called lines to store all the data from the csv
        string[] lines = File.ReadAllLines(data);

        //reading lines one by one and putting them into a variable called line.
        // the reason we start at i = 1 is to skip the header row, and then we go up to < i which would be the last line.
        for (int i = 1; i < lines.Length; i++)
        {
            string line = lines[i];
            
            string[] properties = line.Split(',');
            
            //if the length of the line is not 5 meaning it is missing some data then we will skip it by using the continue function.
            if (properties.Length != 5)
            {
                Console.WriteLine($"Skipping invalid line: {line}");
                continue;
            }

            //using another try catch block to catch parsing errors.
            try 
            {
            Employee emp = new Employee();

            emp.EmployeeId = int.Parse(properties[0]);
            emp.FirstName = properties[1];
            emp.LastName = properties[2];
            emp.Department = properties[3];
            emp.Salary = decimal.Parse(properties[4]);

            employeeList.Add(emp);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing data from line: {line}. Error Message: {ex.Message}");
                continue;
            }
            

        }

        Console.WriteLine("================================");
        Console.WriteLine("Employee Data Loaded Successfully");
        Console.WriteLine("================================");
        Console.WriteLine($"Data Loaded: {employeeList.Count} employees found.");
        Console.WriteLine($"Employee 1: {employeeList[0].FirstName} {employeeList[0].LastName}, Department: {employeeList[0].Department}, Salary: {employeeList[0].Salary}, Employee ID: {employeeList[0].EmployeeId}");



    }

    
}