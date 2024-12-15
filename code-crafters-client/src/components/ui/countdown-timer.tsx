import {useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';

interface CountdownTimerProps {
  setIsTimerEnded: (value: boolean) => void;
  isTimerEnded: boolean;
}

export function CountdownTimer({setIsTimerEnded, isTimerEnded}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0.1 * 60);

  useEffect(() => {
    if (isTimerEnded) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTimeout(() => setIsTimerEnded(true), 0); // Kết thúc timer
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerEnded, setIsTimerEnded]);

  useEffect(() => {
    if (!isTimerEnded) {
      setTimeLeft(0.1 * 60);
    }
  }, [isTimerEnded]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto my-4">
      <CardContent className="flex flex-col items-center space-y-2 py-2">
        <div className="text-2xl font-bold tabular-nums">{formatTime(timeLeft)}</div>
      </CardContent>
    </Card>
  );
}
