
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, FilterX } from "lucide-react";

// Sample data
const productsData = [
  { 
    id: 1, 
    name: "Wireless Headphones", 
    category: "Electronics", 
    price: 129.99, 
    stock: 45, 
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&w=60&h=60&fit=crop"
  },
  { 
    id: 2, 
    name: "Smart Watch", 
    category: "Electronics", 
    price: 249.99, 
    stock: 12, 
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&w=60&h=60&fit=crop"
  },
  { 
    id: 3, 
    name: "Laptop Pro", 
    category: "Computers", 
    price: 1299.99, 
    stock: 8, 
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&w=60&h=60&fit=crop"
  },
  { 
    id: 4, 
    name: "Bluetooth Speaker", 
    category: "Electronics", 
    price: 79.99, 
    stock: 35, 
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&w=60&h=60&fit=crop"
  },
  { 
    id: 5, 
    name: "4K Monitor", 
    category: "Computers", 
    price: 349.99, 
    stock: 0, 
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&w=60&h=60&fit=crop"
  },
];

// Status badge style
const getStatusBadge = (status: string) => {
  switch (status) {
    case "In Stock":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Low Stock":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{status}</Badge>;
    case "Out of Stock":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className="bg-brand-purple hover:bg-brand-purple/90">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FilterX className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
