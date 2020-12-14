using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace PspDataPresenter.Core
{
    public class RabbitModelPooledObjectPolicy : IPooledObjectPolicy<IModel>
    {
        private IConnection conn;

        public RabbitModelPooledObjectPolicy(ILogger<RabbitModelPooledObjectPolicy> logger, IOptions<AppSettings> options, IConfiguration configuration)
        {
            var rabbitConnStrings = options.Value.ConnectionStrings.RabbitMQ;
            try
            {
                if (string.IsNullOrEmpty(rabbitConnStrings))
                    rabbitConnStrings = configuration.GetConnectionString("RabbitMQ");

                conn = GetConnection(rabbitConnStrings);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in init RabbitMQ");
            }

            if (conn == null)
                throw new Exception("Missing connection string for RabbitMQ");
        }
        public IModel Create()
        {
            return conn.CreateModel();
        }

        public bool Return(IModel obj)
        {
            if (obj.IsOpen)
                return true;
            
            obj?.Dispose();
            return false;
        }

        private IConnection GetConnection(string rabbitConnStrings)
        {
            var factory = new ConnectionFactory
            {
                Uri = new Uri(rabbitConnStrings),
                DispatchConsumersAsync = true
            };

            return factory.CreateConnection();
        }
    }
}