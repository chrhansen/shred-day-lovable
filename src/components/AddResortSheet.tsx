import { useState, useEffect, useRef, useCallback } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MapPin, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface AddResortSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resortName: string;
  onResortNameChange: (name: string) => void;
  onAdd: (resort: { name: string; latitude?: number; longitude?: number }) => void;
}

export function AddResortSheet({
  open,
  onOpenChange,
  resortName,
  onResortNameChange,
  onAdd,
}: AddResortSheetProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const updateMarker = useCallback((lat: number, lng: number) => {
    setMarkerPos({ lat, lng });
    setLatitude(lat.toFixed(4));
    setLongitude(lng.toFixed(4));

    if (mapInstanceRef.current) {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            className: "custom-marker",
            html: `<div style="width:24px;height:24px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapInstanceRef.current);
      }
    }
  }, []);

  // Initialize map when drawer opens
  useEffect(() => {
    if (!open) {
      // Cleanup on close
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    // Small delay to let drawer animate open
    const timer = setTimeout(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [47.0, 11.5], // Alps default
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      map.on("click", (e: L.LeafletMouseEvent) => {
        updateMarker(e.latlng.lat, e.latlng.lng);
      });

      mapInstanceRef.current = map;

      // Fix tile rendering after drawer animation
      setTimeout(() => map.invalidateSize(), 100);
    }, 300);

    return () => clearTimeout(timer);
  }, [open, updateMarker]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setLatitude("");
      setLongitude("");
      setMarkerPos(null);
    }
  }, [open]);

  const handleCoordinateBlur = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      updateMarker(lat, lng);
      mapInstanceRef.current?.setView([lat, lng], 10);
    }
  };

  const handleAdd = () => {
    if (!resortName.trim()) return;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const hasValidCoords = !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

    onAdd({
      name: resortName.trim(),
      ...(hasValidCoords ? { latitude: lat, longitude: lng } : {}),
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-base">Add new resort</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 space-y-4 overflow-y-auto">
          {/* Resort name */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Resort name
            </label>
            <Input
              value={resortName}
              onChange={(e) => onResortNameChange(e.target.value)}
              placeholder="Resort name"
              autoFocus
            />
          </div>

          {/* Map picker */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Location
              <span className="font-normal text-muted-foreground/70">(optional)</span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Tap on the map to set the resort location
            </p>
            <div
              ref={mapRef}
              className="w-full h-48 rounded-lg border bg-muted overflow-hidden"
            />
          </div>

          {/* Coordinates */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5" />
              Or enter coordinates
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                onBlur={handleCoordinateBlur}
                step="any"
                min={-90}
                max={90}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                onBlur={handleCoordinateBlur}
                step="any"
                min={-180}
                max={180}
                className="flex-1"
              />
            </div>
            {markerPos && (
              <p className="text-xs text-muted-foreground mt-1.5">
                📍 {markerPos.lat.toFixed(4)}, {markerPos.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>

        <DrawerFooter className="pt-4">
          <Button
            onClick={handleAdd}
            disabled={!resortName.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {resortName.trim() || "resort"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
