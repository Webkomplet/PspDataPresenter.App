using System;

namespace PspDataPresenter.Core.Models
{
    public class ClearVotingResultModel
    {
        public RoomModel Room { get; set; }
        public string ClearType { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
