using Microsoft.AspNetCore.Identity;

namespace AlunosApi.Services
{
    public class AuthenticateService(SignInManager<IdentityUser> signInManager) : IAuthenticate
    {
        private readonly SignInManager<IdentityUser> _signInManager = signInManager;

        public async Task<bool> Authenticate(string email, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, false, lockoutOnFailure: false);

            return result.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
