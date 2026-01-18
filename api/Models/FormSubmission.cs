using Newtonsoft.Json;

namespace PTO.Api.Models
{
    public class FormSubmission
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [JsonProperty("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [JsonProperty("childName")]
        public string ChildName { get; set; }
        
        [JsonProperty("grade")]
        public string Grade { get; set; }
        
        [JsonProperty("parentName")]
        public string ParentName { get; set; }
        
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [JsonProperty("phone")]
        public string Phone { get; set; }
        
        [JsonProperty("numParticipants")]
        public int NumParticipants { get; set; }
        
        [JsonProperty("paymentMethod")]
        public string PaymentMethod { get; set; }
        
        [JsonProperty("emergencyContact")]
        public string EmergencyContact { get; set; }
        
        [JsonProperty("emergencyPhone")]
        public string EmergencyPhone { get; set; }
    }
}