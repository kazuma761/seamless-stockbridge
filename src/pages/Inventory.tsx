
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  unit_price: number | null;
};

type InventoryItem = {
  id: string;
  product_id: string;
  warehouse_id: string;
  quantity: number;
  min_threshold: number;
  max_threshold: number | null;
  product: Product;
  warehouse_name: string;
};

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        
        // Fetch inventory with product and warehouse details
        const { data, error } = await supabase
          .from('inventory')
          .select(`
            id,
            product_id,
            warehouse_id,
            quantity,
            min_threshold,
            max_threshold,
            products:product_id(id, name, sku, category, unit_price),
            warehouses:warehouse_id(name)
          `);

        if (error) throw error;

        // Transform the data to match our type
        const formattedData = data.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          warehouse_id: item.warehouse_id,
          quantity: item.quantity,
          min_threshold: item.min_threshold,
          max_threshold: item.max_threshold,
          product: item.products,
          warehouse_name: item.warehouses?.name || 'Unknown'
        }));

        setInventoryItems(formattedData);
      } catch (error: any) {
        console.error('Error fetching inventory:', error);
        toast.error('Failed to load inventory data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <button className="bg-ocean hover:bg-teal text-white px-4 py-2 rounded-lg transition-colors">
            Add New Item
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : inventoryItems.length === 0 ? (
          <div className="text-center py-12 bg-secondary/10 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No inventory items found</h2>
            <p className="text-muted-foreground">Start by adding products to your inventory</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary/20">
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Warehouse</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-right">Min Threshold</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b border-secondary/20 hover:bg-secondary/10">
                    <td className="px-4 py-3">{item.product.name}</td>
                    <td className="px-4 py-3">{item.product.sku}</td>
                    <td className="px-4 py-3">{item.product.category || 'Uncategorized'}</td>
                    <td className="px-4 py-3">{item.warehouse_name}</td>
                    <td className={`px-4 py-3 text-right ${item.quantity <= item.min_threshold ? 'text-red-500 font-bold' : ''}`}>
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right">{item.min_threshold}</td>
                    <td className="px-4 py-3 text-right">
                      {item.product.unit_price 
                        ? `$${item.product.unit_price.toFixed(2)}` 
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="text-ocean hover:text-teal p-1">Edit</button>
                        <button className="text-red-500 hover:text-red-700 p-1">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Inventory;
