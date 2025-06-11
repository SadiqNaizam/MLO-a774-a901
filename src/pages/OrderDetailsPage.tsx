import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { NavigationMenu } from "@/components/ui/navigation-menu"; // Assuming a top nav might exist
import { toast } from "sonner"; // Using sonner for notifications

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'AwaitingPayment' | 'Refunded' | 'Completed' | 'OnHold';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface OrderDetails {
  id: string;
  date: string;
  customer: { name: string; email: string; phone?: string; };
  shippingAddress: { street: string; city: string; state: string; zip: string; country: string; };
  billingAddress: { street: string; city: string; state: string; zip: string; country: string; };
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod?: string;
  notes?: string;
}

// Sample order data (in a real app, this would be fetched)
const sampleOrderData: OrderDetails = {
  id: 'ORD790',
  date: '2024-07-14',
  customer: { name: 'Bob The Builder', email: 'bob.builder@example.com', phone: '555-123-4567' },
  shippingAddress: { street: '123 Fixit Lane', city: 'Constructville', state: 'CA', zip: '90210', country: 'USA' },
  billingAddress: { street: '123 Fixit Lane', city: 'Constructville', state: 'CA', zip: '90210', country: 'USA' },
  items: [
    { id: 'PROD001', name: 'Heavy Duty Wrench Set', quantity: 1, price: 55.00, imageUrl: 'https://via.placeholder.com/50?text=Wrench' },
    { id: 'PROD002', name: 'Safety Helmet (Yellow)', quantity: 1, price: 20.00, imageUrl: 'https://via.placeholder.com/50?text=Helmet' },
  ],
  status: 'Processing',
  subtotal: 75.00,
  shippingCost: 10.00,
  tax: 6.00,
  total: 91.00,
  paymentMethod: 'Visa **** 1234',
  notes: 'Customer requested fast shipping if possible.'
};


const OrderDetailsPage: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Pending');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    console.log(`OrderDetailsPage loaded for order ID: ${orderId}`);
    // Simulate fetching order details
    // In a real app, fetch from API: fetch(`/api/orders/${orderId}`)
    if (orderId === sampleOrderData.id) { // Simple match for demo
        setOrder(sampleOrderData);
        setCurrentStatus(sampleOrderData.status);
        setInternalNotes(sampleOrderData.notes || '');
    } else {
        // Handle order not found, maybe navigate to a 404 page or show an error
        console.error("Order not found for ID:", orderId);
        setOrder(null); 
    }
  }, [orderId]);

  const handleStatusUpdate = () => {
    if (order) {
      // Simulate API call to update status
      console.log(`Updating status for order ${order.id} to ${currentStatus}`);
      setOrder({ ...order, status: currentStatus });
      toast.success(`Order ${order.id} status updated to ${currentStatus}.`);
    }
  };

  const handleNotesUpdate = () => {
    if (order) {
        console.log(`Updating notes for order ${order.id}: ${internalNotes}`);
        toast.info(`Notes for order ${order.id} saved.`);
        // Simulate API call to update notes
    }
  };


  if (!order) {
    return (
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar />
        <div className="flex-1 p-6 text-center">
          <h1 className="text-xl">Loading order details or order not found...</h1>
          <Link to="/orders" className="text-primary hover:underline mt-4 inline-block">Back to Orders List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <NavigationMenu className="hidden md:flex">
            {/* Top navigation placeholder */}
          </NavigationMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Breadcrumb className="my-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/orders">Orders</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Order #{order.id}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column: Order Info, Items, Notes */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Date: {new Date(order.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <OrderStatusBadge status={order.status} className="text-base px-3 py-1" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium flex items-center">
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 mr-3 rounded object-cover"/>}
                            {item.name}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 border-t pt-4">
                    <div>Subtotal: ${order.subtotal.toFixed(2)}</div>
                    <div>Shipping: ${order.shippingCost.toFixed(2)}</div>
                    <div>Tax: ${order.tax.toFixed(2)}</div>
                    <div className="font-bold">Total: ${order.total.toFixed(2)}</div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader><CardTitle>Internal Notes</CardTitle></CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Add internal notes about this order..."
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    rows={4}
                  />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleNotesUpdate}>Save Notes</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column: Customer, Addresses, Status Update */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {order.customer.name}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  {order.customer.phone && <p><strong>Phone:</strong> {order.customer.phone}</p>}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                <CardContent className="text-sm">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
                <CardContent className="text-sm">
                  <p>{order.billingAddress.street}</p>
                  <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                  <p>{order.billingAddress.country}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Update Order Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="orderStatus">Status</Label>
                    <Select value={currentStatus} onValueChange={(value: OrderStatus) => setCurrentStatus(value)}>
                      <SelectTrigger id="orderStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="AwaitingPayment">Awaiting Payment</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="OnHold">On Hold</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleStatusUpdate} className="w-full">Update Status</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetailsPage;