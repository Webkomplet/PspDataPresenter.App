using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using PspDataPresenter.Core;
using PspDataPresenter.Core.Models;

namespace PspDataPresenter.App
{
    public class PanelDataHub : Hub<IPanelDataHub>
    {
        private readonly ILogger<PanelDataHub> logger;
        private readonly ICustomMemoryCache customMemoryCache;

        public PanelDataHub(ILogger<PanelDataHub> logger, ICustomMemoryCache customMemoryCache)
        {
            this.logger = logger;
            this.customMemoryCache = customMemoryCache;
        }

        public async Task AppInit()
        {
            var meetingData = await LoadMeetingData();
            var presentMembersData = await LoadPresentMembers();
            var notificationData = await LoadNotification();

            await Clients.Caller.Meeting(meetingData);
            await Clients.Caller.PresentMembers(presentMembersData);
            await Clients.Caller.Notification(notificationData);
        }

        private async Task<NotificationModel> LoadNotification()
        {
            var method = "notification";
            var data = customMemoryCache.Get<NotificationModel>(method);
            if (data == null)
                data = await LoadFromFile<NotificationModel>(method);

            return data;
        }
        
        private async Task<PresentMembersModel> LoadPresentMembers()
        {
            var method = "presentMembers";
            var data = customMemoryCache.Get<PresentMembersModel>(method);
            if (data == null)
                data = await LoadFromFile<PresentMembersModel>(method);

            return data;
        }

        private async Task<MeetingModel> LoadMeetingData()
        {
            var method = "meeting";
            var data = customMemoryCache.Get<MeetingModel>(method);
            if (data == null)
                data = await LoadFromFile<MeetingModel>(method);

            return data;
        }

        private async Task<T> LoadFromFile<T>(string method)
        {
            if (!Directory.Exists("data"))
            {
                Directory.CreateDirectory("data");
                return default(T);
            }

            var filePath = Path.Combine("data", $"{method}.json");
            if (!File.Exists(filePath))
            {
                return default(T);
            }

            await using var stream = File.OpenRead(filePath);
            return await JsonSerializer.DeserializeAsync<T>(stream);
        }

        public override async Task OnConnectedAsync()
        {
            logger.LogInformation("A new user connected");
        }
    }

    public interface IPanelDataHub
    {
        Task AppInit();
        Task Meeting(MeetingModel meetingData);
        Task Notification(NotificationModel notificationData);
        Task PresentMembers(PresentMembersModel presentMembersData);
    }
}
