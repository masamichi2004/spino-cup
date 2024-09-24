'use client';
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { fetchData } from './NewReoisitoryButton';

export function NewRepositoryButton() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const name = segments[1];
  const [part, setPart] = useState<string>('');
  const router = useRouter();

  const handleClick = async (name: string, part: string) => {
    if (name && part) {
      try {
        const result = await fetchData(part);
        if (result) {
          router.push(`/home/${name}/${part}`);
        } else {
          console.error('Error: result is undefined or falsy');
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } else {
      console.error("name or part is undefined");
    }
  };  

  return (
    <Dialog>
      <DialogTrigger asChild className="mb-2">
        <Button variant="outline" className="w-full bg-green text-white">New Repository</Button>
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
            <Input id="name" onChange={(e) => setPart(e.target.value)} value={part} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => handleClick(name, part)} className="bg-green">Create Repository</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
