using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ObjectPool;
using PspDataPresenter.Core;
using RabbitMQ.Client;

namespace PspDataPresenter.App.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRabbit(this IServiceCollection services)
        {
            services.AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();
            services.AddSingleton<IPooledObjectPolicy<IModel>, RabbitModelPooledObjectPolicy>();

            services.AddSingleton<IRabbitManager, RabbitManager>();

            return services;
        }
    }
}
