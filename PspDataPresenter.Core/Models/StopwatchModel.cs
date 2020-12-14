using System;

namespace PspDataPresenter.Core
{
    public class StopwatchModel
    {
        public RoomModel Room { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        // start, stop
        public string EventType { get; set; }
        public int EndMessageDisplayInterval { get; set; }
        public DateTime Timestamp { get; set; }
    }
}