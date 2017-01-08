using jeyjen.db;
using jeyjen.extension;
using System.Collections.Generic;

namespace server
{
    public class db_provider
    {
        private string _cs;
        connection _db;

        public db_provider(string cs)
        {
            _db = new connection(provider.sqlite, cs);
        }

        public bundle load_nodes()
        {
            var cmd = @"
select 
    id, 
    type, 
    next, 
    child, 
    name, 
    description 
from 
    node";

            return _db.cmd(cmd)
                    .retrieve();
        }
    }
}
