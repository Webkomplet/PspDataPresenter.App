using System.Collections.Generic;

namespace PspDataPresenter.Core.Models
{
    public class VotingResultModel
    {
        public List<VotingClubResultModel> VotingClubResults { get; set; }
        public VotingSummaryModel Summary { get; set; }
    }
}
