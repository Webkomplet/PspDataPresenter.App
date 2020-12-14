namespace PspDataPresenter.Core
{
    public class MemberModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShortName { get; set; }
        public string Card { get; set; }
        public ClubModel Club { get; set; }
    }
}