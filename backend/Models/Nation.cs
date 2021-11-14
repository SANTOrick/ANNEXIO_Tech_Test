
using System.Collections.Generic;

namespace annexio.models
{
    public class Nation
    {
        public NationName Name { get; set; }
        public int Population { get; set; }
        public object Currencies { get; set; }


        public List<string> Capital { get; set; }

        public object Languages { get; set; }

        public string Cca3 { get; set; }
        public string Cca2 { get; set; }
    }
}