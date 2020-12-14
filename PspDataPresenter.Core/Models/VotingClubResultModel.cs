namespace PspDataPresenter.Core.Models
{
    public class VotingClubResultModel
    {
        public ClubModel ClubModel { get; set; }
        public int For { get; set; }
        public int Abstain { get; set; }
        public int Absent { get; set; }
        public int Against { get; set; }
        public int All { get; set; }
        public int Present { get; set; }
    }
}
