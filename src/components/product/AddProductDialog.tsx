
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PackagePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const productSchema = z.object({
  name: z.string().min(2, { message: 'Product name is required' }),
  sku: z.string().min(2, { message: 'SKU is required' }),
  category: z.string().min(2, { message: 'Category is required' }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a valid number greater than 0',
  }),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Stock must be a valid number',
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductDialogProps {
  onProductAdded: () => void;
}

export function AddProductDialog({ onProductAdded }: AddProductDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      console.log('Submitting product:', values);
      
      // Add product to database
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: values.name,
          sku: values.sku,
          category: values.category,
          unit_price: Number(values.price),
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === 'PGRST301') {
          toast({
            title: 'Permission error',
            description: 'You may not have sufficient permissions to add products.',
            variant: 'destructive',
          });
        }
        throw error;
      }

      console.log('Product added:', data);

      if (data && data.length > 0) {
        // Optionally, update inventory with initial stock
        const { error: inventoryError } = await supabase
          .from('inventory')
          .insert({
            product_id: data[0].id,
            warehouse_id: 'default', // This would need to be adjusted based on your schema
            quantity: Number(values.stock),
            min_threshold: 5, // Default value
          });
          
        if (inventoryError) {
          console.error('Error updating inventory:', inventoryError);
          if (inventoryError.code === 'PGRST301') {
            toast({
              title: 'Permission error',
              description: 'You may not have sufficient permissions to update inventory.',
              variant: 'destructive',
            });
          }
        }

        toast({
          title: 'Product added successfully',
          description: `${values.name} has been added to inventory`,
        });

        // Reset form and close dialog
        form.reset();
        setOpen(false);
        
        // Refresh the product list
        onProductAdded();
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error adding product',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PackagePlus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
