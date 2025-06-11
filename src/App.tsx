import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainDashboardPage from "./pages/MainDashboardPage";
import OrdersListPage from "./pages/OrdersListPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProductsListPage from "./pages/ProductsListPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster /> {/* Use the renamed import */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainDashboardPage />} /> {/* Main dashboard as root after login */}
          <Route path="/dashboard" element={<MainDashboardPage />} /> {/* Explicit dashboard route */}
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/order-details/:id" element={<OrderDetailsPage />} />
          <Route path="/products" element={<ProductsListPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;