"use client";

import { useState } from "react";
import { createAsset } from "../actions";

export default function AssetRegistrationForm({ categories }: { categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = categories.find(c => c.id === e.target.value);
    setSelectedCategory(cat || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await createAsset(new FormData(e.currentTarget));
    } catch (err: any) {
      setError(err.message);
    }
  };

  let customFieldsSchema: Record<string, string> = {};
  if (selectedCategory?.customFields) {
    try {
      customFieldsSchema = JSON.parse(selectedCategory.customFields);
    } catch (e) {}
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card border border-border rounded-xl p-6 shadow-sm">
      {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Asset Name *</label>
          <input required name="name" className="w-full border rounded-lg p-2" placeholder="MacBook Pro M2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select required name="categoryId" onChange={handleCategoryChange} className="w-full border rounded-lg p-2 bg-background">
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Serial Number</label>
          <input name="serialNumber" className="w-full border rounded-lg p-2" placeholder="C02XXXXXXXX" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Condition</label>
          <select name="condition" className="w-full border rounded-lg p-2 bg-background">
            <option value="NEW">NEW</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="POOR">POOR</option>
            <option value="DAMAGED">DAMAGED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Acquisition Date</label>
          <input type="date" name="acquisitionDate" className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Acquisition Cost</label>
          <input type="number" step="0.01" name="acquisitionCost" className="w-full border rounded-lg p-2" placeholder="1999.99" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Storage Location</label>
        <input name="location" className="w-full border rounded-lg p-2" placeholder="IT Server Room, Rack 4" />
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <input type="checkbox" id="isBookable" name="isBookable" value="true" className="w-4 h-4 rounded text-primary focus:ring-primary" />
        <label htmlFor="isBookable" className="text-sm font-medium">This asset can be booked (Shared Resource)</label>
      </div>

      {Object.keys(customFieldsSchema).length > 0 && (
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-bold mb-3 text-primary">Custom Category Fields</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(customFieldsSchema).map(([key, type]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                <input 
                  type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'} 
                  name={`custom_${key}`} 
                  className="w-full border rounded-lg p-2 bg-muted/50" 
                  placeholder={`Enter ${key}...`} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-sm transition-colors">
          Register Asset
        </button>
      </div>
    </form>
  );
}
