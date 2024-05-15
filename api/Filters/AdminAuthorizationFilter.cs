// Filters/AdminAuthorizationFilter.cs
using System;
using System.Threading.Tasks;
using api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace api.Filters
{
    public class AdminAuthorizationFilter : IAsyncActionFilter
    {
        private readonly DatabaseContext _dbContext;

        public AdminAuthorizationFilter(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            Console.WriteLine("AdminAuthorizationFilter");
            //print all the header values
            foreach (var header in context.HttpContext.Request.Headers)
                Console.WriteLine(header);

            string userIdHeader = context.HttpContext.Request.Headers["userid"];
            Console.WriteLine(userIdHeader);
            if (!string.IsNullOrEmpty(userIdHeader) && Guid.TryParse(userIdHeader, out Guid userId))
            {
                var user = await _dbContext.Users.FindAsync(userId);

                if (user != null && user.UserTypeId == Guid.Parse("00000000-0000-0000-0000-000000000002"))
                {
                    await next();
                    return;
                }
            }

            context.Result = new UnauthorizedResult();
        }
    }
}