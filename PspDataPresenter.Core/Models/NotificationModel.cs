using System;

namespace PspDataPresenter.Core
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Ended { get; set; }
        public string Type { get; set; }
        public int? Meeting1Number { get; set; }
        public int? Meeting2Number { get; set; }
        public DateTime? Meeting1Time1 { get; set; }
        public DateTime? Meeting1Time2 { get; set; }
        public DateTime? Meeting2Time { get; set; }
        public string StartType { get; set; }
        public string CancelType { get; set; }
        public string Text { get; set; }
        public RoomModel Room { get; set; }
        public DateTime Timestamp { get; set; }
    }
}