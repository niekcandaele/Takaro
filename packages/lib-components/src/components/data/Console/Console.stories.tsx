import { Meta, Story } from '@storybook/react';
import { Dispatch, SetStateAction } from 'react';
import { Console as ConsoleComponent } from '../Console';
import { Message, MessageType } from './ConsoleInterface';

export default {
  title: 'Data/Console',
  component: ConsoleComponent
} as Meta;

const MessageTypeMap: MessageType[] = ['command', 'info', 'debug', 'warning', 'error'];
const commandList = [
  { command: 'example command', description: 'command description' },
  { command: 'give weapon', description: 'give weapon to user' },
  { command: 'teleport', description: 'teleport [from] [to]' }
];

export const Console: Story = () => {
  function listener(setter: Dispatch<SetStateAction<Message[]>>) {
    const generateMessagesInterval = setInterval(() => {
      const r = Math.floor(Math.random() * 5);
      const newMessage: Message = {
        data: `this is a ${MessageTypeMap[r]} logline`,
        timestamp: new Date().toISOString(),
        type: MessageTypeMap[r],
      };

      setter((prev: Message[]) => [...prev, newMessage]);
      return () => clearInterval(generateMessagesInterval);
    }, 1000);
  };
  return (
    <ConsoleComponent
      listener={listener}
      onExecuteCommand={async () => { return { type: 'command', data: 'response here', 'timestamp': new Date().toISOString() }; }}
      commandList={commandList}

    />
  );
};
