import { createRef, FC, MouseEvent, useState } from 'react';
import { styled } from '../../../../styled';
import {
  AiFillFolder as DirClosedIcon,
  AiFillFolderOpen as DirOpenIcon,
  AiFillFile as FileIcon,
  AiFillEdit as RenameIcon,
  AiOutlineClose as DeleteIcon,
} from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDelayGroup } from '@floating-ui/react-dom-interactions';
import { Tooltip } from '../../../../components';
import { useModal, useOutsideAlerter, useTheme } from '../../../../hooks';
import { ConfirmationModal } from '../../../../modals';
import { useSandpack } from '@codesandbox/sandpack-react';

const Button = styled.button<{ isActive: boolean; depth: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  background-color: transparent;
  padding-left: ${({ depth }) => `${depth * 2}rem`};
  border-radius: 0;

  div {
    display: flex;
    align-items: center;
  }

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : theme.colors.text};

    &:hover {
      color: ${({ theme }) => theme.colors.gray};
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

export interface FileProps {
  path: string;
  selectFile?: (path: string) => void; // basically checks if it is a file or a directory
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  depth: number;
  isDirOpen?: boolean;
}

export const File: FC<FileProps> = ({
  path,
  selectFile,
  isDirOpen,
  active,
  onClick,
  depth,
}) => {
  const theme = useTheme();
  const { sandpack } = useSandpack();
  const [hover, setHover] = useState<boolean>(false);
  const [Wrapper, open, close] = useModal();
  const ref = createRef<HTMLDivElement>();
  useOutsideAlerter(ref, () => close());

  const fileName = path.split('/').filter(Boolean).pop()!;
  // const extension = fileName.split('.').pop();

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (selectFile) {
      selectFile(path);
    }
    onClick?.(event);
  };

  const handleDelete = () => {
    const filePaths = sandpack.visibleFiles;
    console.log(path);
    const toDelete = filePaths.filter((filePath) =>
      filePath.startsWith(path.slice(0, -1))
    );
    console.log(filePaths);
    console.log(toDelete);
    for (const i of toDelete) {
      sandpack.deleteFile(i);
    }
  };

  // handle click events
  const handleOnDeleteClick = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  const handleOnRenameClick = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnNewFileClick = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`${path.slice(0, -1)}`);
    sandpack.updateFile(`${path.slice(0, -1)}newFileeeee.tsx`);
  };

  const handleOnNewDirClick = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getIcon = (): JSX.Element => {
    if (selectFile) return <FileIcon size={20} />;

    return isDirOpen ? (
      <DirOpenIcon fill={theme.colors.primary} size={20} />
    ) : (
      <DirClosedIcon fill={theme.colors.primary} size={20} />
    );
  };

  const getModal = (): JSX.Element => (
    <Wrapper>
      <ConfirmationModal
        type="error"
        title="Delete directory"
        close={close}
        description={`Are you sure you want to delete '${fileName}'? The ${
          selectFile ? 'file' : 'directory'
        } will be permanently removed.`}
        action={handleDelete}
        actionText="Delete"
        ref={ref}
      />
    </Wrapper>
  );

  const getActions = (): JSX.Element => {
    if (selectFile) {
      return (
        <FloatingDelayGroup delay={{ open: 1000, close: 200 }}>
          <Tooltip label="Rename" placement="top">
            <div>
              <RenameIcon size={16} onClick={handleOnRenameClick} />
            </div>
          </Tooltip>
          <Tooltip label="Delete" placement="top">
            <div>
              <DeleteIcon onClick={handleOnDeleteClick} size={16} />
            </div>
          </Tooltip>
        </FloatingDelayGroup>
      );
    } else {
      return (
        <FloatingDelayGroup delay={{ open: 1000, close: 200 }}>
          <Tooltip label="Rename" placement="top">
            <div>
              <RenameIcon size={16} />
            </div>
          </Tooltip>
          <Tooltip label="New file" placement="top">
            <div>
              <FileIcon size={16} onClick={handleOnNewFileClick} />
            </div>
          </Tooltip>
          <Tooltip label="New directory" placement="top">
            <div>
              <DirClosedIcon size={16} onClick={handleOnNewDirClick} />
            </div>
          </Tooltip>
          <Tooltip label="Delete" placement="top">
            <div>
              <DeleteIcon onClick={handleOnDeleteClick} size={16} />
            </div>
          </Tooltip>
        </FloatingDelayGroup>
      );
    }
  };

  return (
    <>
      <Button
        isActive={active ? true : false}
        depth={depth}
        title={fileName}
        onClick={onClickButton}
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div>
          {getIcon()}
          <span>{fileName}</span>
        </div>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {getActions()}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      {getModal()}
    </>
  );
};
