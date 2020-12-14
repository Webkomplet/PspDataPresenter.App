using System.Collections.Generic;

namespace PspDataPresenter.Core.Models
{
    public class PresentMembersModel
    {
        public RoomModel Room { get; set; }
        public List<MemberModel> Members { get; set; }
        public int Quorum { get; set; }
    }
}
