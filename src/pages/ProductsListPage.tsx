import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Edit, PackagePlus, Search, Filter, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming navigation to an edit/add product page

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  imageUrl?: string;
}

const sampleProducts: Product[] = [
  { id: 'PROD101', name: 'Wireless Mouse Pro', sku: 'WM-PRO-BLK', category: 'Electronics', stock: 150, price: 29.99, status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=200&auto=format&fit=crop' },
  { id: 'PROD102', name: 'Mechanical Keyboard RGB', sku: 'MK-RGB-01', category: 'Electronics', stock: 75, price: 79.50, status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop' },
  { id: 'PROD103', name: 'Organic Cotton T-Shirt', sku: 'TS-ORG-M-WH', category: 'Apparel', stock: 300, price: 19.99, status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop' },
  { id: 'PROD104', name: 'Stainless Steel Water Bottle', sku: 'WB-SS-1L', category: 'Home Goods', stock: 0, price: 24.00, status: 'Draft', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200&auto=format&fit=crop' },
  { id: 'PROD105', name: 'Leatherbound Journal', sku: 'JNL-LTH-LG', category: 'Stationery', stock: 90, price: 15.75, status: 'Archived', imageUrl: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=200&auto=format&fit=crop' },
];

const PRODUCTS_PER_PAGE = 5;

const ProductsListPage: React.FC = () => {
  console.log('ProductsListPage loaded');
  const navigate = useNavigate(); // For navigation to add/edit product pages
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddProduct = () => {
    // navigate('/products/add'); // Example navigation
    console.log("Navigate to Add Product page");
  };

  const handleEditProduct = (productId: string) => {
    // navigate(`/products/edit/${productId}`); // Example navigation
    console.log("Navigate to Edit Product page for ID:", productId);
  };
  
  const handleDeleteProduct = (productId: string) => {
    console.log("Deleting product with ID:", productId);
    // Add logic to remove product from list or call API
    alert(`Placeholder: Delete product ${productId}`);
  };

  const uniqueCategories = ['all', ...new Set(sampleProducts.map(p => p.category))];
  const uniqueStatuses = ['all', ...new Set(sampleProducts.map(p => p.status))];


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
          <div className="flex items-center justify-between mb-6 mt-4">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Button onClick={handleAddProduct}>
              <PackagePlus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="mb-6 p-4 bg-background border rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by Name or SKU..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground inline-block" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground inline-block" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueStatuses.map(stat => (
                    <SelectItem key={stat} value={stat}>{stat === 'all' ? 'All Statuses' : stat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableCaption>A list of products in your store.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.imageUrl || 'https://via.placeholder.com/40?text=N/A'} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className={`text-right ${product.stock === 0 ? 'text-red-500 font-semibold' : ''}`}>
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === 'Active' ? 'default' : 
                        (product.status === 'Draft' ? 'secondary' : 'outline')
                      }>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEditProduct(product.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Edit Product</p></TooltipContent>
                        </Tooltip>
                         <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Delete Product</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No products found.</TableCell>
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

export default ProductsListPage;