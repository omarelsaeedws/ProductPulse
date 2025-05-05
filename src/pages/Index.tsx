
import { Package, CreditCard, TrendingUp, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to ProductPulse</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value="1,254"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total Sales"
          value="$45,231"
          icon={<CreditCard className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Avg. Order Value"
          value="$89.45"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 3, positive: true }}
        />
        <StatCard
          title="Active Customers"
          value="752"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 5, positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <RevenueChart />
        <TopProducts />
      </div>

      <RecentOrders />
    </Layout>
  );
};

export default Index;
