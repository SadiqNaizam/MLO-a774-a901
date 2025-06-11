import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // Example trend icons

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  onClick,
}) => {
  console.log("Rendering KPICard:", title);

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full", onClick && "cursor-pointer hover:shadow-md transition-shadow", className)} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trend && trendValue && (
          <div className="flex items-center text-xs text-muted-foreground pt-1">
            <TrendIcon className={cn("h-3 w-3 mr-1", trendColor)} />
            <span className={cn(trendColor, "font-semibold")}>{trendValue}</span>
            {/* <span className="ml-1">from last month</span> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default KPICard;