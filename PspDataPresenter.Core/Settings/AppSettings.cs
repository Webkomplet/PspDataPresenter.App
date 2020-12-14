
namespace PspDataPresenter.Core
{
    public class AppSettings
    {
        public RabbitConfig RabbitConfig { get; set; }
        public ApplicationSettings Application { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
    }
    public class ApplicationSettings
    {
        public string Name { get; set; }
    }
    public class ConnectionStrings
    {
        public string RabbitMQ { get; set; }
    }
    public class RabbitConfig
    {
        public string BaseExchangeName { get; set; }
        public string MeetingRoom { get; set; }
        public string MeetingQueueName { get; set; }
        public string PresentMembersQueueName { get; set; }
        public string VotingStartQueueName { get; set; }
        public string VotingEndQueueName { get; set; }
        public string StopwatchQueueName { get; set; }
        public string NotificationQueueName { get; set; }
        public string SystemTimeQueueName { get; set; }
        public string ClearVotingResultQueueName { get; set; }
        public string VotingReviewQueueName { get; set; }
    }
}
