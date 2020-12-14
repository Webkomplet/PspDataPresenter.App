using System;
using System.Collections.Generic;

namespace PspDataPresenter.Core
{
    public class VotingEndModel
    {
        public int Id { get; set; }
        public RoomModel Room { get; set; }
        public int VotingNo { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public VotingSummaryModel Summary { get; set; }
        public List<MemberVoteModel> MemberVotes { get; set; }
        public DateTime Timestamp { get; set; }
    }
}