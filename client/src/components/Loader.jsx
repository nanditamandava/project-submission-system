import { cn } from '../utils/cn';

export default function Loader({ className, fullScreen = false }) {
  const loader = (
    <div className={cn("animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600", className)}></div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {loader}
      </div>
    );
  }

  return loader;
}
