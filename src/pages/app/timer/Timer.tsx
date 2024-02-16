import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export function Timer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerDurationInput, setTimerDurationInput] = useState<string>("");
  const [timerDuration, setTimerDuration] = useState<number>(60 * 2); // Padrão para 2 minutos

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        if (startTime !== null) {
          setElapsedTime(Date.now() - startTime);
        }
      }, 1000);
    } else {
      if (timer !== null) {
        clearInterval(timer);
      }
    }

    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isRunning, startTime]);

  const handleStart = (): void => {
    setStartTime(Date.now() - elapsedTime);
    setIsRunning(true);
  };

  const handlePause = (): void => {
    setIsRunning(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTimerDurationInput(event.target.value);
  };

  const handleSetTimerDuration = (): void => {
    const inputSeconds = parseInt(timerDurationInput, 10);
    if (!isNaN(inputSeconds) && inputSeconds > 0) {
      setTimerDuration(inputSeconds);
    }
  };

  const formatTime = (milliseconds: number): string => {
    const seconds: number = Math.floor(milliseconds / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="h-full overflow-hidden bg-[#181818] relative">
      {/* Barra roxa com texto */}
      <div
        style={{
          backgroundColor: "#7934FF",
          color: "white",
          textAlign: "center",
          padding: "10px",
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: 999,
        }}
      >
        Utilize o timer para sua produtividade, enquanto o tempo estiver
        rodando, foque somente na sua tarefa! Depois relaxe um pouco :)
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-6 mt-15">
          {" "}
          {/* Adicionando margem superior aqui */}
          <Label className="text-white">Duração do Timer (segundos):</Label>
          <Input
            type="number"
            value={timerDurationInput}
            onChange={handleInputChange}
          />
          <Button onClick={handleSetTimerDuration} className="bg-purple-600">
            Definir Duração
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          {" "}
          {/* Adicionando margem superior aqui */}
          <CountdownCircleTimer
            isPlaying={isRunning}
            duration={timerDuration}
            colors="#9076F5"
            size={200}
            strokeWidth={6}
            onComplete={() => setIsRunning(false)}
          >
            {({ remainingTime }) => (
              <div className="text-white text-[18px]">
                {formatTime(remainingTime * 1000)}
              </div>
            )}
          </CountdownCircleTimer>
          <div className="flex items-center justify-center my-2 gap-2">
            <Button
              onClick={handleStart}
              disabled={isRunning}
              className="bg-purple-600"
            >
              Começar
            </Button>
            <Button
              onClick={handlePause}
              disabled={!isRunning}
              className="bg-purple-600"
            >
              Parar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
