using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using annexio.models;
using Microsoft.Extensions.Caching.Memory;

namespace backend.services
{
    public class NationProxyService : INationProxyService
    {

        HttpClient client = new HttpClient();

        private readonly IMemoryCache _cache;

        public NationProxyService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public async Task<List<Nation>> FetchNations()
        {
            List<Nation> result = new List<Nation>();


            if (!_cache.TryGetValue("NationCache", out string nationsvalue))
            {
                HttpResponseMessage response = await client.GetAsync("https://restcountries.com/v3.1/all");

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("FETCH");
                    string stringifyResp = await response.Content.ReadAsStringAsync();
                    _cache.Set("NationCache", stringifyResp);
                    result = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Nation>>(stringifyResp);
                }
            }
            else
            {
                Console.WriteLine("CACHE");
                result = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Nation>>(_cache.Get<string>("NationCache"));
            }

            return result;
        }
    }
}