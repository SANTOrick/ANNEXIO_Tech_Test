using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using annexio.models;

namespace backend.services
{
    public interface INationProxyService
    {
        Task<List<Nation>> FetchNations();

    }

}