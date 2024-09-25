'use client'
import { useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Camera } from 'lucide-react';
import { VideoSet } from '@/src/feature/VideoSet/VideoSet'
import { postWorkoutData } from '@/src/feature/CommitDialogPage/CommitDialog'
import useSegment from '@/src/hooks/useSegment';

interface Set {
  weight: number;
  reps: number;
}

function CommitDialog() {
  const [weight, setWeight] = useState<number | ''>('');
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<Set[]>([]);
  const { segments } = useSegment();
  const [wristDecreaseCount, setWristDecreaseCount] = useState(0);
  const [home, ownerId, repoName, dirName] = segments;

  // 回数を増加させる関数
  const increaseWristDecreaseCount = () => {
    setReps(prev => prev + 1);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAdd = () => {
    if (weight !== '' && reps > 0) {
      const newSet: Set = {
        weight: Number(weight),
        reps: Number(reps),
      };
      setSets(prevSets => [...prevSets, newSet]); // 最新の sets を基に配列を更新
      setWeight(''); // 入力フィールドをクリア
      setReps(0);   // 入力フィールドをクリア
      setIsDialogOpen(false);
      console.log('sets:', [...sets, newSet]); // 状態が更新された後の sets を表示するための確認
    } else if (reps === 0) {
      setIsDialogOpen(false); // ダイアログを閉じる
      alert('Reps が 0 だったため、記録されませんでした');
    } else {
      setErrorMessage('Both fields are required');
    }
  };

  const handleCommit = () => {
    postWorkoutData(ownerId, repoName, dirName, sets);
  };

  const handleVideoShoot = () => {
    if (weight !== '') {
      setIsDialogOpen(true);
      setErrorMessage(null); // エラーをリセット
    } else {
      setErrorMessage('重量を設定してください！');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <Label htmlFor="weight">重量 (kg)</Label>
          <Input
            id="weight"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={weight}
            onChange={(e) => setWeight(e.target.value !== '' ? Number(e.target.value) : '')}
            placeholder="重量を設定"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold">記録</h2>
          <ul className="space-y-2">
            {sets.map((set, index) => (
              <li key={index} className="border p-2 rounded">
                <p>{index + 1}セット目: 重量 {set.weight}kg, 回数 {set.reps}</p>
              </li>
            ))}
          </ul>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex space-x-4">
          <Button onClick={handleCommit} className="bg-green text-white">
            Commit!
          </Button>
          <Button onClick={handleVideoShoot} variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Video Shoot
          </Button>
        </div>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Shooting</DialogTitle>
          </DialogHeader>
          <div>
            <h1>Wrist Y Position Decrease Count: {reps}</h1>
            <VideoSet increaseCount={increaseWristDecreaseCount} />
          </div>
          <Button onClick={handleAdd} variant="outline" className="mt-4">
            stop
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CommitDialog };
