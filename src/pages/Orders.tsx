
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Download } from "lucide-react";

// Sample data
const ordersData = [
  {
    id: "#ORD-7845",
    date: "2023-05-04",
    customer: "John Smith",
    email: "john@example.com",
    items: 3,
    total: "$129.99",
    status: "Shipped",
    paymentStatus: "Paid"
  },
  {
    id: "#ORD-7844",
    date: "2023-05-03",
    customer: "Jane Doe",
    email: "jane@example.com",
    items: 1,
    total: "$79.95",
    status: "Processing",
    paymentStatus: "Paid"
  },
  {
    id: "#ORD-7843",
    date: "2023-05-03",
    customer: "Mike Johnson",
    email: "mike@example.com",
    items: 5,
    total: "$249.00",
    status: "Delivered",
    paymentStatus: "Paid"
  },
  {
    id: "#ORD-7842",
    date: "2023-05-02",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    items: 2,
    total: "$19.99",
    status: "Pending",
    paymentStatus: "Unpaid"
  },
  {
    id: "#ORD-7841",
    date: "2023-05-01",
    customer: "Robert Brown",
    email: "robert@example.com",
    items: 4,
    total: "$112.50",
    status: "Cancelled",
    paymentStatus: "Refunded"
  },
];

// Status badge style
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Delivered":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Shipped":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    case "Processing":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{status}</Badge>;
    case "Pending":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
    case "Cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

// Payment status badge style
const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Unpaid":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
    case "Refunded":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage customer orders</p>
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple/90">
          <Download className="h-4 w-4 mr-2" /> Export Orders
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="text-gray-400" size={16} />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{order.items}</TableCell>
                  <TableCell className="text-right font-medium">{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No orders found.
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

export default Orders;
