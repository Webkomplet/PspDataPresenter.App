using System;

namespace PspDataPresenter.Core
{
    public class VotingStartModel
    {
        public int Id { get; set; }
        public RoomModel Room { get; set; }
        public int VotingNo { get; set; }
        public string Type { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public DateTime Timestamp { get; set; }
    }
}