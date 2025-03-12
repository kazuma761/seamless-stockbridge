
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, UserPlus, Search, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Suppliers = () => {
  // Sample supplier data
  const suppliers = [
    { 
      id: 1, 
      name: 'Acme Supplies', 
      contact: 'John Smith', 
      email: 'john@acmesupplies.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA'
    },
    { 
      id: 2, 
      name: 'Tech Parts Inc', 
      contact: 'Jane Doe', 
      email: 'jane@techparts.com',
      phone: '(555) 234-5678',
      address: '456 Tech Blvd, Innovation City, USA'
    },
    { 
      id: 3, 
      name: 'Global Widgets', 
      contact: 'Robert Johnson', 
      email: 'robert@globalwidgets.com',
      phone: '(555) 345-6789',
      address: '789 Widget Way, Metropolis, USA'
    },
    { 
      id: 4, 
      name: 'Quality Materials', 
      contact: 'Sarah Williams', 
      email: 'sarah@qualitymaterials.com',
      phone: '(555) 456-7890',
      address: '321 Quality Rd, Excellence, USA'
    },
    { 
      id: 5, 
      name: 'Reliable Parts', 
      contact: 'Michael Brown', 
      email: 'michael@reliableparts.com',
      phone: '(555) 567-8901',
      address: '654 Reliability Ave, Trustville, USA'
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Supplier Directory
          </CardTitle>
          <CardDescription>
            Manage your supplier relationships and contact information
          </CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search suppliers..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.contact}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm mt-3">
                      <span className="text-muted-foreground pt-1">📍</span>
                      <span>{supplier.address}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
