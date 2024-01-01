import { Chip } from '@takaro/lib-components';
import { PATHS } from 'paths';
import { usePlayer } from 'queries/players';
import { FC } from 'react';
import { AiOutlineArrowRight as LinkIcon } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface PlayerProps {
  playerId: string;
  showIcon?: 'always' | 'hover';
}

export const Player: FC<PlayerProps> = ({ playerId, showIcon = 'hover' }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePlayer(playerId);

  if (isLoading) {
    return <Chip color="backgroundAccent" isLoading label="" />;
  }

  if (!data || error) {
    return <Chip variant="outline" color="backgroundAccent" label="unknown" />;
  }

  return (
    <Chip
      onClick={() => {
        navigate(PATHS.player.profile(playerId));
      }}
      variant="outline"
      showIcon={showIcon}
      color="backgroundAccent"
      label={data.name}
      icon={<LinkIcon />}
    />
  );
};
