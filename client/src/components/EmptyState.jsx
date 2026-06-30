import { FolderX } from 'lucide-react';
import { cn } from '../utils/cn';

export default function EmptyState({ 
  icon: Icon = FolderX, 
  title = "No data found", 
  description = "Get started by creating a new entry.",
  action,
  className
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-gray-300 bg-gray-50", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
