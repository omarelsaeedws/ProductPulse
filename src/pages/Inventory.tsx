
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
import { 
  AlertTriangle, 
  ArrowUpDown,
  Plus, 
  Search, 
  RefreshCcw,
  Download
} from "lucide-react";

// Sample data
const inventoryData = [
  { 
    id: 1, 
    sku: "WH-001", 
    name: "Wireless Headphones", 
    stock: 45, 
    location: "Warehouse A",
    lastUpdated: "2023-05-01",
    reorderPoint: 15,
    status: "In Stock"
  },
  { 
    id: 2, 
    sku: "SW-002", 
    name: "Smart Watch", 
    stock: 12, 
    location: "Warehouse B",
    lastUpdated: "2023-04-28",
    reorderPoint: 10,
    status: "Low Stock"
  },
  { 
    id: 3, 
    sku: "LP-003", 
    name: "Laptop Pro", 
    stock: 8, 
    location: "Warehouse A",
    lastUpdated: "2023-05-02",
    reorderPoint: 10,
    status: "Low Stock"
  },
  { 
    id: 4, 
    sku: "BS-004", 
    name: "Bluetooth Speaker", 
    stock: 35, 
    location: "Warehouse C",
    lastUpdated: "2023-04-25",
    reorderPoint: 20,
    status: "In Stock"
  },
  { 
    id: 5, 
    sku: "KM-005", 
    name: "4K Monitor", 
    stock: 0, 
    location: "Warehouse A",
    lastUpdated: "2023-04-20",
    reorderPoint: 5,
    status: "Out of Stock"
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

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = inventoryData.filter(item => item.status === "Low Stock").length;
  const outOfStockCount = inventoryData.filter(item => item.status === "Out of Stock").length;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-gray-500">Manage your product stock levels</p>
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple/90">
          <Plus className="h-4 w-4 mr-2" /> Add Stock
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold mt-1">{inventoryData.length}</p>
            </div>
            <div className="bg-gray-100 rounded-full p-2">
              <Package className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold mt-1 text-orange-600">{lowStockCount}</p>
            </div>
            <div className="bg-orange-100 rounded-full p-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold mt-1 text-red-600">{outOfStockCount}</p>
            </div>
            <div className="bg-red-100 rounded-full p-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name or SKU..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
              {filteredInventory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No inventory items found.
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

// Missing imported icon
function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

// Missing imported icon
function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}

export default Inventory;
