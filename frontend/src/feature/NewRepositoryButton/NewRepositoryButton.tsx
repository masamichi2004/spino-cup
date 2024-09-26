'use client';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useCreateRepository } from './useCreateRepository';

export function NewRepositoryButton() {
  const { part, setPart, handleClick } = useCreateRepository();

  return (
    <Dialog>
      <DialogTrigger asChild className="mb-2">
        <Button variant="outline" className="w-full bg-green text-white">
          New Repository
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Repository!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Repository Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setPart(e.target.value)}
              value={part}
              className="col-span-3"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleClick} className="bg-green">
            Create Repository
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { useCreateRepository };
