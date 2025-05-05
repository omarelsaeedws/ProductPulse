
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample data
const topProducts = [
  { id: 1, name: "Wireless Headphones", sales: 124, progress: 80 },
  { id: 2, name: "Smart Watch", sales: 98, progress: 65 },
  { id: 3, name: "Laptop Pro", sales: 78, progress: 50 },
  { id: 4, name: "Bluetooth Speaker", sales: 45, progress: 30 },
];

export const TopProducts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{product.name}</span>
                <span className="text-sm text-gray-500">{product.sales} sales</span>
              </div>
              <Progress value={product.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
