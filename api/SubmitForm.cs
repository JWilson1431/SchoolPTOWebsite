using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PTO.Api.Models;
using Microsoft.Azure.Cosmos;
using Google.Apis.Sheets.v4;
using Google.Apis.Services;
using Google.Apis.Auth.OAuth2;

namespace PTO.Api
{
    public class SubmitForm
    {
        private readonly ILogger<SubmitForm> _logger;
        private readonly CosmosClient _cosmosClient;
        private readonly Container _container;

        public SubmitForm(ILogger<SubmitForm> logger)
        {
            _logger = logger;
            
            // Initialize CosmosDB
            var cosmosConnectionString = Environment.GetEnvironmentVariable("CosmosDBConnectionString");
            _cosmosClient = new CosmosClient(cosmosConnectionString);
            _container = _cosmosClient.GetContainer("EventFormData", "EventSubmissionsContainer");
        }

        [Function("SubmitForm")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("Processing form submission");

            try
            {
                // Read request body
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var submission = JsonConvert.DeserializeObject<FormSubmission>(requestBody);

                if (submission == null)
                {
                    return new BadRequestObjectResult("Invalid form data");
                }

                // Ensure timestamp and ID are set
                submission.Timestamp = DateTime.UtcNow;
                if (string.IsNullOrEmpty(submission.Id))
                {
                    submission.Id = Guid.NewGuid().ToString();
                }

                // Save to CosmosDB
                await SaveToCosmosDB(submission);
                _logger.LogInformation("Saved to CosmosDB");

                // Save to Google Sheets
                await SaveToGoogleSheets(submission);
                _logger.LogInformation("Saved to Google Sheets");

                return new OkObjectResult(new { 
                    message = "Form submitted successfully",
                    id = submission.Id 
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing submission: {ex.Message}");
                return new StatusCodeResult(500);
            }
        }

        private async Task SaveToCosmosDB(FormSubmission submission)
        {
            await _container.CreateItemAsync(submission, new PartitionKey(submission.Id));
        }

        private async Task SaveToGoogleSheets(FormSubmission submission)
        {
            try
            {
                // Get credentials from environment variable
                var credentialsJson = Environment.GetEnvironmentVariable("GoogleSheetsCredentials");
                var credential = GoogleCredential.FromJson(credentialsJson)
                    .CreateScoped(SheetsService.Scope.Spreadsheets);

                var service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "PTO Form"
                });

                var spreadsheetId = Environment.GetEnvironmentVariable("GoogleSheetId");
                var range = "Sheet1!A:J"; // Adjust sheet name if needed

                var valueRange = new Google.Apis.Sheets.v4.Data.ValueRange();
                var row = new List<object>
                {
                    submission.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"),
                    submission.ChildName,
                    submission.Grade,
                    submission.ParentName,
                    submission.Email,
                    submission.Phone,
                    submission.NumParticipants,
                    submission.PaymentMethod,
                    submission.EmergencyContact,
                    submission.EmergencyPhone
                };
                valueRange.Values = new List<IList<object>> { row };

                var appendRequest = service.Spreadsheets.Values.Append(valueRange, spreadsheetId, range);
                appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.RAW;
                await appendRequest.ExecuteAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error saving to Google Sheets: {ex.Message}");
                throw;
            }
        }
    }
}