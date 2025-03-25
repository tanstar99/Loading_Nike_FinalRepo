
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Shoes from "./pages/Shoes";
import Shirts from "./pages/Shirts";
import Bottles from "./pages/Bottles";
import Accessories from "./pages/Accessories";
import ArVr from "./pages/ArVr";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import ShoeGenerator from "./pages/ShoeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/bottles" element={<Bottles />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/ar-vr" element={<ArVr />} />
          <Route path="/generator" element={<ShoeGenerator />} />
          <Route path="/shoes/:productId" element={<ProductDetail />} />
          <Route path="/shirts/:productId" element={<ProductDetail />} />
          <Route path="/bottles/:productId" element={<ProductDetail />} />
          <Route path="/accessories/:productId" element={<ProductDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
