using System;
using System.Collections.Generic;

namespace PspDataPresenter.Core
{
    public class MeetingModel
    {
        public int Id { get; set; }
        public int MeetingNo { get; set; }
        public bool CanRemotelySignUpForDebate { get; set; }
        public BoardModel Board { get; set; }
        public RoomModel Room { get; set; }
        public CurrentAgendaItem CurrentAgendaItem { get; set; }
        public MajorityModel Majority { get; set; }
        public List<AgendaModel> Agenda { get; set; }
        public List<RemarkModel> Remarks { get; set; }
        public List<FollowingItemModel> FollowingItems { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
