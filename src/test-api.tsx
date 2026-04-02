import { useRoutes, useStops } from '@/hooks/useApi';
import { formatRouteColor } from '@/hooks/useApi';

export default function TestApi() {
  const { data: routesData, isLoading: routesLoading, error: routesError } = useRoutes();
  const { data: stopsData, isLoading: stopsLoading, error: stopsError } = useStops();

  if (routesLoading || stopsLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing API Connection</h1>
        <div className="animate-pulse">
          <p>Loading data from backend...</p>
        </div>
      </div>
    );
  }

  if (routesError || stopsError) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">API Connection Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error connecting to backend:</p>
          <p>{routesError?.message || stopsError?.message}</p>
          <p className="mt-2 text-sm">Make sure the backend is running on http://localhost:3000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Addis Transit API Test</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-bold">✅ Successfully connected to backend!</p>
        <p>API URL: http://localhost:3000/api</p>
      </div>

      {/* Routes Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Routes ({routesData?.total || 0})</h2>
        <div className="grid gap-2">
          {routesData?.routes?.slice(0, 5).map(route => (
            <div 
              key={route.route_id} 
              className="p-4 rounded-lg shadow-md border-l-4"
              style={{ borderLeftColor: formatRouteColor(route.route_color) }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">{route.route_short_name}</span>
                  <p className="text-gray-600">{route.route_long_name}</p>
                </div>
                <span className="text-sm text-gray-500">ID: {route.route_id}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Showing 5 of {routesData?.total} routes</p>
      </div>

      {/* Stops Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Stops ({stopsData?.total || 0})</h2>
        <div className="grid gap-2 max-h-64 overflow-y-auto">
          {stopsData?.stops?.slice(0, 10).map(stop => (
            <div 
              key={stop.stop_id} 
              className="p-3 rounded bg-gray-50 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{stop.stop_name}</span>
                  <p className="text-sm text-gray-500">{stop.stop_code || 'No code'}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">{stop.stop_lat}, {stop.stop_lon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Showing 10 of {stopsData?.total} stops</p>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-2">Next Steps:</h3>
        <ul className="text-blue-700 list-disc list-inside">
          <li>Frontend is connected to backend API</li>
          <li>Routes and stops data is loading correctly</li>
          <li>Ready to integrate real-time vehicle tracking</li>
          <li>Ready to add ETA calculations</li>
        </ul>
      </div>
    </div>
  );
}