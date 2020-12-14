namespace PspDataPresenter.Core
{
    public class VotingSummaryModel
    {
        public int Present { get; set; }
        public int Absent { get; set; }
        public int Quorum { get; set; }
        public int VotedFor { get; set; }
        public int VotedAgainst { get; set; }
        public int Abstained { get; set; }
        // passed, failed, noQuorum
        public string Result { get; set; }
    }
}