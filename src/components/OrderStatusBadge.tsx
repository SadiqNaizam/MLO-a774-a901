import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge"; // Assuming Badge is from shadcn
import { cn } from "@/lib/utils";

export type OrderStatus = 
  | 'Pending' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled' 
  | 'Refunded' 
  | 'AwaitingPayment'
  | 'Completed'
  | 'OnHold';

interface OrderStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: OrderStatus | string; // Allow string for flexibility with backend statuses
  variant?: BadgeProps['variant']; // Allow overriding shadcn badge variant
}

const getStatusColors = (status: OrderStatus | string): string => {
  // Normalize status to lower case for consistent matching
  const lowerStatus = typeof status === 'string' ? status.toLowerCase() : '';

  switch (lowerStatus) {
    case 'pending':
    case 'awaitingpayment':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'; // More distinct yellow
    case 'processing':
    case 'onhold':
      return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200';
    case 'delivered':
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
    case 'cancelled':
    case 'refunded':
      return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
    default:
      console.warn(`OrderStatusBadge: Unknown status "${status}", using default colors.`);
      return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'; // Default for unknown statuses
  }
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className, variant = "outline", ...props }) => {
  console.log("Rendering OrderStatusBadge for status:", status);
  const statusColors = getStatusColors(status as OrderStatus); // Cast for switch

  return (
    <Badge
      variant={variant}
      className={cn(
        "px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        statusColors,
        className
      )}
      {...props}
    >
      {typeof status === 'string' ? status.charAt(0).toUpperCase() + status.slice(1) : status}
    </Badge>
  );
}
export default OrderStatusBadge;