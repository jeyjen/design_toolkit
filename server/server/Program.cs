using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var port = 23444;
                var s = new server(port);
                s.start();
                Console.WriteLine("server start on {0} port", port);
                Console.ReadLine();
                s.stop();
            }
            catch (Exception ex) 
            {

            }
        }
    }
}
