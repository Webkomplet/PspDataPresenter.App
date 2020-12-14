using System;
using RabbitMQ.Client;

namespace PspDataPresenter.Core
{
    public class RabbitQueueConsumerData : EventArgs
    {
        public ulong DeliveryTag { get; set; }
        public byte[] Data { get; set; }
        public IModel Channel { get; set; }
    }
}