import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Example: LineChart
import { cn } from "@/lib/utils";

// Example data structure for the chart
interface ChartDataPoint {
  name: string; // e.g., month, day
  value: number;
  // Add other data series if needed, e.g., value2: number;
}

interface SummaryChartCardProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  dataKey: string; // key for the 'value' in ChartDataPoint
  xAxisDataKey: string; // key for the 'name' in ChartDataPoint
  className?: string;
  // You can add more props to customize chart type, colors, etc.
}

const SummaryChartCard: React.FC<SummaryChartCardProps> = ({
  title,
  description,
  data,
  dataKey = "value",
  xAxisDataKey = "name",
  className,
}) => {
  console.log("Rendering SummaryChartCard:", title);

  if (!data || data.length === 0) {
    console.warn("SummaryChartCard: No data provided for chart:", title);
    // Optionally render a placeholder or message
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full"> {/* Set a fixed height for the chart container */}
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted left margin */}
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <XAxis dataKey={xAxisDataKey} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} /> {/* Example formatter */}
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                {/* Add other lines if needed: <Line type="monotone" dataKey="value2" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No data available for this chart.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default SummaryChartCard;