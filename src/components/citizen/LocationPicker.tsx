import { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin, Navigation, Target, Map } from 'lucide-react';

interface LocationPickerProps {
  selectedArea: string;
  onAreaChange: (area: string) => void;
  selectedCoordinates: { lat: number; lng: number } | null;
  onCoordinatesChange: (coordinates: { lat: number; lng: number } | null) => void;
}

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Mock ward boundaries for demonstration
const wardBounds: Record<string, MapBounds> = {
  'ward-1': { north: 52.2, south: 52.1, east: -0.9, west: -1.1 },
  'ward-2': { north: 52.3, south: 52.2, east: -0.8, west: -1.0 },
  'ward-3': { north: 52.1, south: 52.0, east: -0.7, west: -0.9 },
  'ward-4': { north: 52.2, south: 52.1, east: -0.6, west: -0.8 },
  'ward-5': { north: 52.3, south: 52.2, east: -0.5, west: -0.7 },
};

export function LocationPicker({ 
  selectedArea, 
  onAreaChange, 
  selectedCoordinates, 
  onCoordinatesChange 
}: LocationPickerProps) {
  const [mapMode, setMapMode] = useState<'area' | 'pin'>('area');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mapMode !== 'pin') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to mock lat/lng (this would be real coordinates in a real map)
    const lat = 52.2 - (y / rect.height) * 0.3; // Mock conversion
    const lng = -1.0 + (x / rect.width) * 0.5; // Mock conversion
    
    onCoordinatesChange({ lat, lng });
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onCoordinatesChange({ lat: latitude, lng: longitude });
          setIsGettingLocation(false);
          
          // Auto-detect ward based on coordinates (mock logic)
          const detectedWard = detectWardFromCoordinates(latitude, longitude);
          if (detectedWard) {
            onAreaChange(detectedWard);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          // Fallback to mock location for demo
          onCoordinatesChange({ lat: 52.15, lng: -0.85 });
          onAreaChange('ward-1');
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setIsGettingLocation(false);
      onCoordinatesChange({ lat: 52.15, lng: -0.85 });
      onAreaChange('ward-1');
    }
  };

  const detectWardFromCoordinates = (lat: number, lng: number): string | null => {
    // Mock ward detection logic
    for (const [ward, bounds] of Object.entries(wardBounds)) {
      if (lat >= bounds.south && lat <= bounds.north && 
          lng >= bounds.west && lng <= bounds.east) {
        return ward;
      }
    }
    return null;
  };

  const getWardCenter = (ward: string) => {
    const bounds = wardBounds[ward];
    if (!bounds) return null;
    
    return {
      lat: (bounds.north + bounds.south) / 2,
      lng: (bounds.east + bounds.west) / 2
    };
  };

  return (
    <div className="space-y-6">
      {/* Area Selection */}
      <div>
        <label className="text-white mb-2 block">Choose your area/ward</label>
        <Select value={selectedArea} onValueChange={onAreaChange}>
          <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
            <SelectValue placeholder="Select your area" />
          </SelectTrigger>
          <SelectContent className="bg-[#334155] border-[#475569]">
            <SelectItem value="ward-1">Ward 1 - Central District</SelectItem>
            <SelectItem value="ward-2">Ward 2 - North Zone</SelectItem>
            <SelectItem value="ward-3">Ward 3 - South Zone</SelectItem>
            <SelectItem value="ward-4">Ward 4 - East Zone</SelectItem>
            <SelectItem value="ward-5">Ward 5 - West Zone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location Mode Toggle */}
      <div>
        <label className="text-white mb-2 block">Location Selection Mode</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={mapMode === 'area' ? 'default' : 'outline'}
            onClick={() => setMapMode('area')}
            className={`${
              mapMode === 'area' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'border-[#475569] text-white hover:bg-[#334155]'
            }`}
          >
            <Map className="h-4 w-4 mr-2" />
            Area Only
          </Button>
          <Button
            variant={mapMode === 'pin' ? 'default' : 'outline'}
            onClick={() => setMapMode('pin')}
            className={`${
              mapMode === 'pin' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'border-[#475569] text-white hover:bg-[#334155]'
            }`}
          >
            <Target className="h-4 w-4 mr-2" />
            Pin Location
          </Button>
        </div>
      </div>

      {/* Map Interface */}
      <Card className="bg-[#334155] border-[#475569]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>
              {mapMode === 'area' ? 'Area Overview' : 'Pin Exact Location'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mock Map */}
          <div 
            className={`relative h-64 bg-[#1E293B] rounded-lg border-2 overflow-hidden ${
              mapMode === 'pin' 
                ? 'border-blue-500 cursor-crosshair' 
                : 'border-[#475569]'
            }`}
            onClick={handleMapClick}
          >
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="border border-gray-600"></div>
                ))}
              </div>
            </div>

            {/* Ward Areas (mock representation) */}
            {selectedArea && (
              <div className="absolute inset-4">
                <div className="w-16 h-12 bg-blue-500/30 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-blue-300 text-xs font-semibold">
                    {selectedArea.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
              </div>
            )}

            {/* Pinned Location */}
            {selectedCoordinates && mapMode === 'pin' && (
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${((selectedCoordinates.lng + 1.0) / 0.5) * 100}%`,
                  top: `${((52.2 - selectedCoordinates.lat) / 0.3) * 100}%`
                }}
              >
                <div className="relative">
                  <MapPin className="h-6 w-6 text-red-500 drop-shadow-lg" />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Instructions Overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/70 rounded px-2 py-1">
                <p className="text-white text-xs">
                  {mapMode === 'area' 
                    ? 'Selected area highlighted in blue' 
                    : 'Click anywhere on the map to pin exact location'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Location Controls */}
          {mapMode === 'pin' && (
            <div className="mt-4 space-y-3">
              <Button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isGettingLocation ? 'Getting Location...' : 'Use My Current Location'}
              </Button>

              {selectedCoordinates && (
                <div className="bg-[#1E293B] rounded-lg p-3">
                  <h4 className="text-white font-medium mb-2">Selected Coordinates</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-300">Latitude:</span>
                      <p className="text-white font-mono">{selectedCoordinates.lat.toFixed(6)}</p>
                    </div>
                    <div>
                      <span className="text-gray-300">Longitude:</span>
                      <p className="text-white font-mono">{selectedCoordinates.lng.toFixed(6)}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCoordinatesChange(null)}
                    className="mt-2 w-full border-[#475569] text-gray-300 hover:bg-[#334155]"
                  >
                    Clear Location Pin
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Area Information */}
          {mapMode === 'area' && selectedArea && (
            <div className="mt-4 bg-[#1E293B] rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Selected Area Information</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Ward:</span>
                  <span className="text-white">{selectedArea.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Zone:</span>
                  <span className="text-white">
                    {selectedArea === 'ward-1' && 'Central District'}
                    {selectedArea === 'ward-2' && 'North Zone'}
                    {selectedArea === 'ward-3' && 'South Zone'}
                    {selectedArea === 'ward-4' && 'East Zone'}
                    {selectedArea === 'ward-5' && 'West Zone'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}