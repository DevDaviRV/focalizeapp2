import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ButtonForAddTimerProps {
  onAddTimer: (duration: number) => void;
}

export function ButtonForAddTimer({ onAddTimer }: ButtonForAddTimerProps) {
  const [timerDuration, setTimerDuration] = useState<number>(0);

  const handleAddTimer = () => {
    if (timerDuration > 0) {
      console.log(`Adicionando timer com duração de ${timerDuration} segundos`);
      onAddTimer(timerDuration); 
      setTimerDuration(0); 
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label>
        Duração do Timer (segundos):
      </label>
      <input
        type="number"
        value={timerDuration}
        onChange={(e) => setTimerDuration(parseInt(e.target.value, 10))}
      />
      <Button onClick={handleAddTimer}>
        Adicionar Timer
      </Button>
    </div>
  );
}
