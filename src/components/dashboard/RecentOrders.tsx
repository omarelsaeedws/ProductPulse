
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data
const recentOrders = [
  { id: "#ORD-7845", customer: "John Smith", date: "2023-05-04", status: "shipped", total: "$129.99" },
  { id: "#ORD-7844", customer: "Jane Doe", date: "2023-05-03", status: "processing", total: "$79.95" },
  { id: "#ORD-7843", customer: "Mike Johnson", date: "2023-05-03", status: "delivered", total: "$249.00" },
  { id: "#ORD-7842", customer: "Sarah Williams", date: "2023-05-02", status: "pending", total: "$19.99" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-orange-100 text-orange-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const RecentOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3">{order.date}</td>
                  <td className="py-3">
                    <Badge variant="secondary" className={cn(getStatusStyle(order.status), "capitalize")}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-medium">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
