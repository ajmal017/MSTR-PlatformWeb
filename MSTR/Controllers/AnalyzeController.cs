using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MSTR.Controllers
{
    public class AnalyzeController : Controller
    {
        // GET: Analyze
        public ActionResult Index()
        {
            return View();
        }

        // Get: Analyze/MarketView
        public ActionResult MarketView()
        {
            return View();
        }

        // Get: Analyze/Strategies
        public ActionResult Strategies()
        {
            return View();
        }

        // Get: Analyze/Trade
        public ActionResult Trade()
        {
            return View();
        }

        // Get: Analyze/RiskManagement
        public ActionResult RiskManagement()
        {
            return View();
        }
    }
}