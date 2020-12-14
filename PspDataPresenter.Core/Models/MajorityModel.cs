namespace PspDataPresenter.Core
{
    public class MajorityModel
    {
        public int Id { get; set; }
        public int Numerator { get; set; }
        public int Denominator { get; set; }
        //all, logged
        public string MajorityType { get; set; }
        //moreThan, atLeast
        public string MajorityCountType { get; set; }
    }
}