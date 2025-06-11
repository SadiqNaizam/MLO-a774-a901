import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Eye, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  customerName: string;
  date: string;
  totalAmount: string;
  status: OrderStatus;
  items: number;
}

const sampleOrders: Order[] = [
  { id: 'ORD789', customerName: 'Alice Wonderland', date: '2024-07-15', totalAmount: '$125.50', status: 'Shipped', items: 3 },
  { id: 'ORD790', customerName: 'Bob The Builder', date: '2024-07-14', totalAmount: '$75.00', status: 'Processing', items: 1 },
  { id: 'ORD791', customerName: 'Charlie Brown', date: '2024-07-13', totalAmount: '$250.20', status: 'Delivered', items: 5 },
  { id: 'ORD792', customerName: 'Diana Prince', date: '2024-07-12', totalAmount: '$50.75', status: 'Pending', items: 2 },
  { id: 'ORD793', customerName: 'Edward Scissorhands', date: '2024-07-11', totalAmount: '$99.99', status: 'Cancelled', items: 1 },
  { id: 'ORD794', customerName: 'Fiona Gallagher', date: '2024-07-10', totalAmount: '$180.00', status: 'Shipped', items: 4 },
  { id: 'ORD795', customerName: 'George Jetson', date: '2024-07-09', totalAmount: '$30.00', status: 'Delivered', items: 1 },
];

const ORDERS_PER_PAGE = 5;

const OrdersListPage: React.FC = () => {
  console.log('OrdersListPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const viewOrderDetails = (orderId: string) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <NavigationMenu className="hidden md:flex">
            {/* Placeholder for top navigation if any */}
          </NavigationMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between mb-6 mt-4">
            <h1 className="text-2xl font-semibold">Orders</h1>
            {/* <Button>Add New Order</Button> // If applicable */}
          </div>

          <div className="mb-6 p-4 bg-background border rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by Order ID or Customer..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground inline-block" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {/* Add more filters if needed */}
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableCaption>A list of recent customer orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => viewOrderDetails(order.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No orders found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Add Ellipsis if many pages */}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersListPage;