using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.services;
using System;
using Microsoft.AspNetCore.Http;
using annexio.models;

namespace backend.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NationProxyController : ControllerBase
    {
        private readonly INationProxyService nationProxyService;

        public NationProxyController(INationProxyService nationProxyService)
        {
            this.nationProxyService = nationProxyService;
        }

        [HttpGet]
        public async Task<List<Nation>> FetchNations()
        {
            List<Nation> result = new List<Nation>();

            result = await nationProxyService.FetchNations();

            return result;
        }

    }
}