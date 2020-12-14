using System;

namespace PspDataPresenter.Core
{
    public class RemarkModel
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public DateTime Timestamp { get; set; }
        public MemberModel Member { get; set; }
    }
}