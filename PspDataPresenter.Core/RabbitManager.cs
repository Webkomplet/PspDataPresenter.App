using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace PspDataPresenter.Core
{
    public interface IRabbitManager
    {
        void Publish<T>(T message, string exchange, string routingKey)
            where T : class;

        void Publish(byte[] message, string exchange, string routingKey);
        void Consume(string queueName, CancellationToken cancellationToken,
            AsyncEventHandler<RabbitQueueConsumerData> receivedHandler);
        void JoinToExchange(string exchangeName, string queueName, string routingKey);
        void InitExchange(string exchangeName);
        void QueuePurge(string queueName);
    }

    public class RabbitManager : IRabbitManager
    {
        private readonly DefaultObjectPool<IModel> _objectPool;

        public RabbitManager(IPooledObjectPolicy<IModel> objectPolicy)
        {
            _objectPool = new DefaultObjectPool<IModel>(objectPolicy, Environment.ProcessorCount * 2);
        }

        public void QueuePurge(string queueName)
        {
            var channel = _objectPool.Get();

            try
            {
                channel.QueuePurge(queueName);
            }
            finally
            {
                _objectPool.Return(channel);
            }
        }

        public void InitExchange(string exchangeName)
        {
            var channel = _objectPool.Get();

            try
            {
                channel.ExchangeDeclare(exchangeName, ExchangeType.Topic, true, false, null);
            }
            finally
            {
                _objectPool.Return(channel);
            }
        }

        public void JoinToExchange(string exchangeName, string queueName, string routingKey)
        {
            var channel = _objectPool.Get();

            try
            {
                channel.QueueDeclare(queueName, durable: true, autoDelete: false, exclusive: false);
                channel.QueueBind(queueName, exchangeName, routingKey);
            }
            finally
            {
                _objectPool.Return(channel);
            }
        }

        public void Publish<T>(T message, string exchange, string routingKey)
            where T : class
        {
            if (message == null)
                return;

            var channel = _objectPool.Get();

            try
            {
                var sendBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;

                channel.BasicPublish(
                    new PublicationAddress(ExchangeType.Direct, exchange, routingKey),
                    properties,
                    sendBytes);
            }
            finally
            {
                _objectPool.Return(channel);
            }
        }
        public void Publish(byte[] message, string exchange, string routingKey)
        {
            if (message == null)
                return;

            var channel = _objectPool.Get();

            try
            {
                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;

                channel.BasicPublish(
                    new PublicationAddress(ExchangeType.Direct, exchange, routingKey),
                    properties,
                    message);
            }
            finally
            {
                _objectPool.Return(channel);
            }
        }

        public void Consume(string queueName, CancellationToken cancellationToken, AsyncEventHandler<RabbitQueueConsumerData> receivedHandler)
        {
            var channel = _objectPool.Get();

            var consumer = new AsyncEventingBasicConsumer(channel);

            consumer.Received += (object sender, BasicDeliverEventArgs e) =>
                receivedHandler(sender, new RabbitQueueConsumerData() { Data = e.Body.ToArray(), DeliveryTag = e.DeliveryTag, Channel = channel });

            channel.BasicConsume(queueName, autoAck: false, consumer);
        }
    }
}

