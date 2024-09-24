'use client';
import React from "react";
import { Button } from "@/src/components/ui/button"
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
import { useCreateTraining } from './useCreateTraining';

export function AddMachoButton() {
  const { training, setTraining, handleClick } = useCreateTraining();

  return (
    <Dialog>
      <DialogTrigger asChild className="mb-2">
        <Button variant="outline" className="w-full bg-green text-white">Add Training!</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Training!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Training Name
            </Label>
            <Input id="weight" type="string" onChange={(e) => setTraining(e.target.value)} value={training} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleClick} className="bg-green">Create Repository</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
