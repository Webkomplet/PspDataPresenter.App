using System;

namespace PspDataPresenter.Core
{
    public class DebateModel
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public bool Active { get; set; }
        public bool Finished { get; set; }
        //common, general, universal, detailed
        public string Type { get; set; }
        public DateTime Timestamp { get; set; }
        public MemberModel Member { get; set; }
    }
}