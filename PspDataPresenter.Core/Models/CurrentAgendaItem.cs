using System.Collections.Generic;

namespace PspDataPresenter.Core
{
    public class CurrentAgendaItem
    {
        public int Id { get; set; }
        public int ScheduleNo { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string State { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string Print { get; set; }
        public List<DebateModel> Debates { get; set; }
        public List<InterpellationModel> Interpellations { get; set; }
    }
}