using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MSTR.Startup))]
namespace MSTR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
