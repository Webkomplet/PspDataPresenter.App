using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PspDataPresenter.App;
using PspDataPresenter.Core.Models;

namespace PspDataPresenter.Core
{
    public class RabbitHostedService : BackgroundService
    {
        private readonly ILogger<RabbitHostedService> logger;
        private readonly IRabbitManager rabbitManager;
        private readonly IHubContext<PanelDataHub> hubContext;
        private readonly ICustomMemoryCache customMemoryCache;
        private readonly RabbitConfig rabbitConfig;
        private readonly JsonSerializerOptions jsonSerializerOptions;

        public RabbitHostedService(ILogger<RabbitHostedService> logger, IRabbitManager rabbitManager, IOptions<AppSettings> options,
            IHubContext<PanelDataHub> hubContext, ICustomMemoryCache customMemoryCache)
        {
            this.logger = logger;
            this.rabbitManager = rabbitManager;
            this.hubContext = hubContext;
            this.customMemoryCache = customMemoryCache;
            rabbitConfig = options.Value.RabbitConfig;

            jsonSerializerOptions = new JsonSerializerOptions() {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            logger.LogInformation("Consumer starting...");
            stoppingToken.ThrowIfCancellationRequested();
            
            rabbitManager.InitExchange(rabbitConfig.BaseExchangeName);

            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.MeetingQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.MeetingQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.PresentMembersQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.PresentMembersQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.VotingStartQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.VotingStartQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.VotingEndQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.VotingEndQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.ClearVotingResultQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.ClearVotingResultQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.VotingReviewQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.VotingReviewQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.StopwatchQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.StopwatchQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.NotificationQueueName, $"{rabbitConfig.MeetingRoom}.{rabbitConfig.NotificationQueueName}");
            rabbitManager.JoinToExchange(rabbitConfig.BaseExchangeName, rabbitConfig.SystemTimeQueueName, $"{rabbitConfig.SystemTimeQueueName}");
            
            rabbitManager.QueuePurge(rabbitConfig.MeetingQueueName);
            rabbitManager.QueuePurge(rabbitConfig.PresentMembersQueueName);
            rabbitManager.QueuePurge(rabbitConfig.VotingStartQueueName);
            rabbitManager.QueuePurge(rabbitConfig.VotingEndQueueName);
            rabbitManager.QueuePurge(rabbitConfig.ClearVotingResultQueueName);
            rabbitManager.QueuePurge(rabbitConfig.VotingReviewQueueName);
            rabbitManager.QueuePurge(rabbitConfig.StopwatchQueueName);
            rabbitManager.QueuePurge(rabbitConfig.NotificationQueueName);
            rabbitManager.QueuePurge(rabbitConfig.SystemTimeQueueName);

            rabbitManager.Consume(rabbitConfig.MeetingQueueName, stoppingToken, MeetingConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.PresentMembersQueueName, stoppingToken, PresentMembersConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.VotingStartQueueName, stoppingToken, VotingStartConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.VotingEndQueueName, stoppingToken, VotingEndConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.ClearVotingResultQueueName, stoppingToken, ClearVotingResultConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.VotingReviewQueueName, stoppingToken, VotingReviewConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.StopwatchQueueName, stoppingToken, StopwatchConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.NotificationQueueName, stoppingToken, NotificationConsumerReceivedAsync);
            rabbitManager.Consume(rabbitConfig.SystemTimeQueueName, stoppingToken, SystemTimeConsumerReceivedAsync);
            
            logger.LogInformation("Consumer started...");
            return Task.CompletedTask;
        }

        public async Task MeetingConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "meeting";
            var json = JsonSerializer.Deserialize<MeetingModel>(e.Data, jsonSerializerOptions);

            SaveDataToCache(method, json);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        public async Task PresentMembersConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "presentMembers";
            var json = JsonSerializer.Deserialize<PresentMembersModel>(e.Data, jsonSerializerOptions);

            SaveDataToCache(method, json);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }
        public async Task VotingStartConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "votingStart";
            var json = JsonSerializer.Deserialize<VotingStartModel>(e.Data, jsonSerializerOptions);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        public async Task VotingEndConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "votingEnd";
            var json = JsonSerializer.Deserialize<VotingEndModel>(e.Data, jsonSerializerOptions);

            var result = PrepareVotingEndData(json);

            await hubContext.Clients.All.SendAsync(method, result);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        private async Task ClearVotingResultConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "clearVotingResult";
            var json = JsonSerializer.Deserialize<ClearVotingResultModel>(e.Data, jsonSerializerOptions);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        private async Task VotingReviewConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "votingReview";
            var json = JsonSerializer.Deserialize<VotingReviewModel>(e.Data, jsonSerializerOptions);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        public async Task StopwatchConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "stopwatch";
            var json = JsonSerializer.Deserialize<StopwatchModel>(e.Data, jsonSerializerOptions);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }
        public async Task NotificationConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "notification";
            var json = JsonSerializer.Deserialize<NotificationModel>(e.Data, jsonSerializerOptions);

            SaveDataToCache(method, json);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        public async Task SystemTimeConsumerReceivedAsync(object sender, RabbitQueueConsumerData e)
        {
            var method = "systemTime";
            var json = JsonSerializer.Deserialize<SystemTimeModel>(e.Data, jsonSerializerOptions);

            await hubContext.Clients.All.SendAsync(method, json);
            e.Channel.BasicAck(e.DeliveryTag, false);
        }

        private VotingResultModel PrepareVotingEndData(VotingEndModel votingEnd)
        {
            var result = new VotingResultModel
            {
                Summary = votingEnd.Summary, 
                VotingClubResults = new List<VotingClubResultModel>()
            };

            foreach (var member in votingEnd.MemberVotes)
            {
                var clubResult = result.VotingClubResults.FirstOrDefault(t => t.ClubModel.Id == member.Member.Club.Id);

                if (clubResult == null)
                {
                    clubResult = new VotingClubResultModel() { ClubModel = member.Member.Club };
                    result.VotingClubResults.Add(clubResult);
                }

                clubResult.All++;

                switch (member.Vote)
                {
                    case "for":
                        clubResult.For++;
                        clubResult.Present++;
                        break;
                    case "abstain":
                        clubResult.Abstain++;
                        clubResult.Present++;
                        break;
                    case "against":
                        clubResult.Against++;
                        clubResult.Present++;
                        break;
                    case "absent":
                        clubResult.Absent++;
                        break;
                }
            }

            result.VotingClubResults = result.VotingClubResults.OrderByDescending(x => x.Present).ToList();

            return result;
        }

        public void SaveDataToCache(string method, dynamic data)
        {
            customMemoryCache.Add(method, data);

            try
            {
                if (!Directory.Exists("data"))
                    Directory.CreateDirectory("data");

                var json = JsonSerializer.Serialize(data);
                File.WriteAllText(Path.Combine("data", $"{method}.json"), json);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "App cannot write to disk");
            }
        }
    }
}
