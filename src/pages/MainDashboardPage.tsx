import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import KPICard from '@/components/KPICard';
import SummaryChartCard from '@/components/SummaryChartCard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { DollarSign, ShoppingCart, Users, BarChart } from 'lucide-react';
import OrderStatusBadge from '@/components/OrderStatusBadge'; // Assuming this is needed for recent orders

// Placeholder data
const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month", icon: DollarSign, trend: "up" as const, trendValue: "+20.1%" },
  { title: "Subscriptions", value: "+2350", description: "+180.1% from last month", icon: Users, trend: "up" as const, trendValue: "+180.1%" },
  { title: "Sales", value: "+12,234", description: "+19% from last month", icon: ShoppingCart, trend: "up" as const, trendValue: "+19%" },
  { title: "Active Now", value: "+573", description: "+201 since last hour", icon: BarChart, trend: "neutral" as const, trendValue: "+201" },
];

const salesTrendData = [
  { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 }, { name: 'Aug', value: 3200 }, { name: 'Sep', value: 2800 },
  { name: 'Oct', value: 3100 }, { name: 'Nov', value: 3300 }, { name: 'Dec', value: 3700 },
];

const recentOrdersData = [
  { id: 'ORD001', customer: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '$150.00', status: 'Delivered' as const, date: '2023-11-23' },
  { id: 'ORD002', customer: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '$45.00', status: 'Processing' as const, date: '2023-11-22' },
  { id: 'ORD003', customer: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '$250.75', status: 'Shipped' as const, date: '2023-11-21' },
  { id: 'ORD004', customer: 'William Kim', email: 'will@email.com', amount: '$99.99', status: 'Pending' as const, date: '2023-11-24' },
  { id: 'ORD005', customer: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '$12.50', status: 'Cancelled' as const, date: '2023-11-20' },
];

const MainDashboardPage: React.FC = () => {
  console.log('MainDashboardPage loaded');

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Simplified NavigationMenu for illustration */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary ml-4">
                  Profile
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Add search or user profile button here */}
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <h1 className="text-2xl font-semibold my-4">Dashboard</h1>
          {/* KPI Cards Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {kpiData.map((kpi) => (
              <KPICard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                description={kpi.description}
                icon={kpi.icon}
                trend={kpi.trend}
                trendValue={kpi.trendValue}
              />
            ))}
          </section>

          {/* Charts and Recent Activities Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <div className="lg:col-span-4">
              <SummaryChartCard
                title="Sales Overview"
                description="Monthly sales performance"
                data={salesTrendData}
                dataKey="value"
                xAxisDataKey="name"
              />
            </div>
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>A quick look at the latest customer orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrdersData.slice(0, 5).map((order) => ( // Display first 5
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </section>
          {/* Add more sections as needed */}
        </main>
      </div>
    </div>
  );
};

export default MainDashboardPage;