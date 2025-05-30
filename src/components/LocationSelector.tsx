import React, { useState, useEffect } from "react";
import { locationsData } from "./locationsData";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LocationState {
  state: string;
  city: string;
  area: string;
}

export default function LocationSelector({mentorsData, setFormData}) {
  const [location, setLocation] = useState<LocationState>({
    state: "",
    city: "",
    area: ""
  });

  const states = Object.keys(locationsData);
  const cities = location.state ? Object.keys(locationsData[location.state]) : [];
  const areas = location.city ? locationsData[location.state]?.[location.city] || [] : [];

  const handleChange = (key: keyof LocationState, value: string) => {
    setLocation((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "state" && { city: "", area: "" }),
      ...(key === "city" && { area: "" })
    }));
    setFormData({...mentorsData, location:{
        ...mentorsData.location,
        [key] : value
    }})
    console.log(location)
  };

  return (
    <div className="space-y-6">
      {/* State */}
      <div>
        <Label htmlFor="state">State *</Label>
        <Select value={location.state} onValueChange={(value) => handleChange("state", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div>
        <Label htmlFor="city">City *</Label>
        <Select value={location.city} onValueChange={(value) => handleChange("city", value)} disabled={!location.state}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Area */}
      <div>
        <Label htmlFor="area">Area *</Label>
        <Select value={location.area} onValueChange={(value) => handleChange("area", value)} disabled={!location.city}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Debug Output */}
      <div className="text-sm text-gray-600">
        <strong>Selected:</strong> {location.state} / {location.city} / {location.area}
      </div>
    </div>
  );
}
