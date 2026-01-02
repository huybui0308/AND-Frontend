import React, { useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import { PageLayout } from '../../components/layout';
import { Button, ConfirmDialog } from '../../components/common';
import { GameStatusCard } from '../../components/game';
import { useGameStore } from '../../stores/gameStore';
import './AdminPages.css';

export const GameControlPage: React.FC = () => {
  const { game, isLoading, fetchStatus, startGame, stopGame } = useGameStore();
  const [startConfirm, setStartConfirm] = React.useState(false);
  const [stopConfirm, setStopConfirm] = React.useState(false);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleStart = async () => {
    await startGame();
    setStartConfirm(false);
    fetchStatus();
  };

  const handleStop = async () => {
    await stopGame();
    setStopConfirm(false);
    fetchStatus();
  };

  const canStart = game?.status === 'DRAFT' || game?.status === 'PAUSED';
  const canStop = game?.status === 'RUNNING';

  return (
    <PageLayout title="Game Control" subtitle="Start, stop, and monitor the game">
      <div className="game-control-page">
        <GameStatusCard game={game} isLoading={isLoading} />

        <div className="game-controls">
          <Button
            variant="default"
            size="lg"
            onClick={() => setStartConfirm(true)}
            disabled={!canStart || isLoading}
          >
            <Play size={20} />
            <span>Start Game</span>
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={() => setStopConfirm(true)}
            disabled={!canStop || isLoading}
          >
            <Square size={20} />
            <span>Stop Game</span>
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={startConfirm}
        onClose={() => setStartConfirm(false)}
        onConfirm={handleStart}
        title="Start Game"
        message="Are you sure you want to start the game? This will begin the competition."
        confirmText="Start Game"
        variant="info"
        isLoading={isLoading}
      />

      <ConfirmDialog
        isOpen={stopConfirm}
        onClose={() => setStopConfirm(false)}
        onConfirm={handleStop}
        title="Stop Game"
        message="Are you sure you want to stop the game? This will end the current round."
        confirmText="Stop Game"
        variant="destructive"
        isLoading={isLoading}
      />
    </PageLayout>
  );
};
