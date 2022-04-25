using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        //set specific routing
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        //for example, save data into db but not success
        public ActionResult GetBadRequest()
        {
            //this is very simple reply in client response
            //return BadRequest("This is a bad rquest");
            //this return an object in client response
            return BadRequest(new ProblemDetails{Title="this is a bad request"});
        }
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            //Molesate error return 400 error and error list
            ModelState.AddModelError("Problem1", "this is the first error");
            ModelState.AddModelError("Problem2", "this is the second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            //this return a system excepion in client response , not good
            throw new Exception("This is a server error");
        }

    }
}