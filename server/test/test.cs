using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using jeyjen.db;
using System.Collections.Generic;

namespace test
{
    [TestClass]
    public class test
    {
        [TestMethod]
        public void connection()
        {
            try
            {
                var db = new connection(provider.sqlite, "Data Source=E:\\prj\\jeyjen.design_toolkit\\server\\server\\asset\\db.db;Version=3;");
                var r = db.cmd("select * from node")
                    .retrieve();
            }
            catch (Exception e)
            {
            }
        }

        [TestMethod]
        public void list()
        {
            var list = new LinkedList<string>();
            list.AddLast("s1");
            list.AddLast("s2");
            list.AddLast("s3");
            list.AddLast("s4");

            var s1 = list.First;
            var next = s1.Next;
            list.Remove(s1);
        }
    }
}
