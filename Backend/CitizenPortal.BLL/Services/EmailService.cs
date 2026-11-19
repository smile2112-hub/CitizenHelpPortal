using CitizenPortal.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Mail;

namespace CitizenPortal.BLL.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendIncidentNotification(string complaintId, string otp, string email)
        {
            return await SendAsync(
                email,
                "Citizen Portal - Incident Notification",
                $"Your incident {complaintId} was successfully registered. The concerned team will reach you shortly.");
        }

        public async Task<bool> SendOtpAsync(string email, string otp)
        {
            return await SendAsync(
                email,
                "Citizen Portal - Email Verification",
                $"Hello,\n\nYour OTP is: {otp}\nThis OTP is valid for 10 minutes.\n\nThank you,\nCitizen Portal");
        }

        private async Task<bool> SendAsync(string recipient, string subject, string body)
        {
            var host = _configuration["Email:Smtp:Host"];
            var port = int.TryParse(_configuration["Email:Smtp:Port"], out var configuredPort)
                ? configuredPort
                : 587;
            var username = _configuration["Email:Smtp:Username"];
            var password = _configuration["Email:Smtp:Password"];
            var sender = _configuration["Email:From"];

            if (string.IsNullOrWhiteSpace(host) ||
                string.IsNullOrWhiteSpace(username) ||
                string.IsNullOrWhiteSpace(password) ||
                string.IsNullOrWhiteSpace(sender))
            {
                _logger.LogWarning("Email delivery is not configured.");
                return false;
            }

            try
            {
                using var message = new MailMessage(sender, recipient, subject, body);
                using var smtp = new SmtpClient(host, port)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(username, password)
                };
                await smtp.SendMailAsync(message);
                return true;
            }
            catch (SmtpException ex)
            {
                _logger.LogError(ex, "Email delivery failed for {Recipient}.", recipient);
                return false;
            }
        }
    }
}
