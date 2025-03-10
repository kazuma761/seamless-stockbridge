
import React from 'react';
import { AreaChart, BarChart3, Box, CircleDollarSign, Package, ShoppingCart, Truck, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import StatsCard from '@/components/ui-components/StatsCard';
import GlassCard from '@/components/ui-components/GlassCard';
import MotionDiv from '@/components/ui-components/MotionDiv';
import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

// Sample data for charts
const areaChartData = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 5000 },
  { name: 'Apr', total: 4000 },
  { name: 'May', total: 7000 },
  { name: 'Jun', total: 6000 },
  { name: 'Jul', total: 8000 },
];

const barChartData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 150 },
  { name: 'Toys', value: 100 },
];

// Sample data for low stock items
const lowStockItems = [
  { id: 1, name: 'iPhone 13 Pro', stock: 5, threshold: 10, category: 'Electronics' },
  { id: 2, name: 'Samsung Galaxy S21', stock: 3, threshold: 8, category: 'Electronics' },
  { id: 3, name: 'Sony PlayStation 5', stock: 2, threshold: 5, category: 'Gaming' },
  { id: 4, name: 'Nike Air Max', stock: 4, threshold: 15, category: 'Footwear' },
];

// Sample data for recent activities
const recentActivities = [
  { id: 1, action: 'Order #1234 processed', user: 'John Doe', time: '10 minutes ago', type: 'order' },
  { id: 2, action: 'New shipment received', user: 'Jane Smith', time: '30 minutes ago', type: 'inventory' },
  { id: 3, action: 'Low stock alert: iPhone 13 Pro', user: 'System', time: '1 hour ago', type: 'alert' },
  { id: 4, action: 'New user added: Mike Johnson', user: 'Admin', time: '2 hours ago', type: 'user' },
  { id: 5, action: 'Purchase order #456 created', user: 'Jane Smith', time: '3 hours ago', type: 'purchase' },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-lightGray/80">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Doe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MotionDiv animation="slideUp" delay={100}>
              <StatsCard
                title="Total Products"
                value="2,420"
                icon={Package}
                trend={{ value: 12, isPositive: true }}
                iconClassName="bg-ocean/20 text-ocean"
              />
            </MotionDiv>
            
            <MotionDiv animation="slideUp" delay={200}>
              <StatsCard
                title="Total Orders"
                value="1,210"
                icon={ShoppingCart}
                trend={{ value: 8, isPositive: true }}
                iconClassName="bg-teal/20 text-teal"
              />
            </MotionDiv>
            
            <MotionDiv animation="slideUp" delay={300}>
              <StatsCard
                title="Active Suppliers"
                value="38"
                icon={Truck}
                trend={{ value: 2, isPositive: true }}
                iconClassName="bg-navy/20 text-navy"
              />
            </MotionDiv>
            
            <MotionDiv animation="slideUp" delay={400}>
              <StatsCard
                title="Total Revenue"
                value="$45,210"
                icon={CircleDollarSign}
                trend={{ value: 14, isPositive: true }}
                iconClassName="bg-green-500/20 text-green-500"
              />
            </MotionDiv>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <MotionDiv animation="fadeIn" delay={300} className="lg:col-span-2">
              <GlassCard className="p-6 h-80">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Sales Overview</h2>
                  <select className="text-sm border border-border/50 rounded-md px-2 py-1 bg-background">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart
                      data={areaChartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#508C9B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#508C9B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        tick={{ fill: '#888' }}
                        tickLine={false}
                        axisLine={{ stroke: '#eee' }}
                      />
                      <YAxis 
                        tick={{ fill: '#888' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#508C9B"
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </MotionDiv>
            
            <MotionDiv animation="fadeIn" delay={400}>
              <GlassCard className="p-6 h-80">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Product Categories</h2>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#888' }}
                        tickLine={false}
                        axisLine={{ stroke: '#eee' }}
                      />
                      <YAxis 
                        tick={{ fill: '#888' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#134B70" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </MotionDiv>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionDiv animation="slideUp" delay={500}>
              <GlassCard className="p-6">
                <h2 className="text-lg font-medium mb-4">Low Stock Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-center py-3 px-4 font-medium">Current Stock</th>
                        <th className="text-center py-3 px-4 font-medium">Min Threshold</th>
                        <th className="text-center py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map((item) => (
                        <tr key={item.id} className="border-b border-border/30 hover:bg-secondary/5">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.category}</div>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">{item.stock}</td>
                          <td className="text-center py-3 px-4">{item.threshold}</td>
                          <td className="text-center py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Low Stock
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-ocean hover:text-teal transition-colors">
                    View All Products
                  </button>
                </div>
              </GlassCard>
            </MotionDiv>
            
            <MotionDiv animation="slideUp" delay={600}>
              <GlassCard className="p-6">
                <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const icons = {
                      order: <ShoppingCart className="h-5 w-5" />,
                      inventory: <Box className="h-5 w-5" />,
                      alert: <Package className="h-5 w-5" />,
                      user: <Users className="h-5 w-5" />,
                      purchase: <BarChart3 className="h-5 w-5" />,
                    };
                    
                    const iconColors = {
                      order: "bg-teal/10 text-teal",
                      inventory: "bg-ocean/10 text-ocean",
                      alert: "bg-red-500/10 text-red-500",
                      user: "bg-navy/10 text-navy",
                      purchase: "bg-green-500/10 text-green-500",
                    };
                    
                    return (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${iconColors[activity.type as keyof typeof iconColors]}`}>
                          {icons[activity.type as keyof typeof icons]}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>{activity.user}</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-ocean hover:text-teal transition-colors">
                    View All Activity
                  </button>
                </div>
              </GlassCard>
            </MotionDiv>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
