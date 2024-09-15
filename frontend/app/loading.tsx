import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 m-auto h-24 w-24">
      <LoaderCircle className="animate-spin text-primary/10 h-24 w-24 stroke-1" />
    </div>
  );
}
