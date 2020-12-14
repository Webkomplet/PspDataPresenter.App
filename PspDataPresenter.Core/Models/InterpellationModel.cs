using System;

namespace PspDataPresenter.Core
{
    public class InterpellationModel
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Subject { get; set; }
        public bool ToPrimeMinister { get; set; }
        public bool Active { get; set; }
        public bool Finished { get; set; }
        public DateTime Timestamp { get; set; }
        public MemberModel Submitter { get; set; }
        public MemberModel InterpellatedMember { get; set; }
    }
}