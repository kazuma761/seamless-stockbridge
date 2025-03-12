
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, PackagePlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Products = () => {
  // Sample product data
  const products = [
    { id: 1, name: 'Widget A', sku: 'WA-001', category: 'Widgets', price: 19.99, stock: 150 },
    { id: 2, name: 'Widget B', sku: 'WB-002', category: 'Widgets', price: 24.99, stock: 75 },
    { id: 3, name: 'Gadget X', sku: 'GX-001', category: 'Gadgets', price: 49.99, stock: 25 },
    { id: 4, name: 'Tool Y', sku: 'TY-001', category: 'Tools', price: 99.99, stock: 10 },
    { id: 5, name: 'Part Z', sku: 'PZ-001', category: 'Parts', price: 5.99, stock: 500 },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button className="flex items-center gap-2">
          <PackagePlus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Inventory
          </CardTitle>
          <CardDescription>
            Manage your product catalog and inventory
          </CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Product Name</th>
                  <th className="py-3 px-4 text-left font-medium">SKU</th>
                  <th className="py-3 px-4 text-left font-medium">Category</th>
                  <th className="py-3 px-4 text-right font-medium">Price</th>
                  <th className="py-3 px-4 text-right font-medium">Stock</th>
                  <th className="py-3 px-4 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.sku}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.stock > 100 ? 'bg-green-100 text-green-800' :
                        product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
