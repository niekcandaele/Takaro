import { FC } from 'react';
import { fromPropsToModules } from './utils';
import { FileExplorerProps } from '.';
import { Directory } from './Directory';
import { File } from './File';
import { StudioProps } from '../useStudioStore';

export interface ModuleListProps extends FileExplorerProps {
  prefixedPath: string;
  files: StudioProps['fileMap'];
  selectFile: (path: string) => void;
  depth?: number;
  visibleFiles: StudioProps['visibleFiles'];
  activeFile: StudioProps['activeFile'];
}

export const ModuleList: FC<ModuleListProps> = ({
  depth = 0,
  activeFile,
  selectFile,
  prefixedPath,
  files,
  autoHiddenFiles,
  visibleFiles,
}) => {
  const { directories, modules } = fromPropsToModules({
    visibleFiles,
    autoHiddenFiles,
    prefixedPath,
    files,
    depth,
  });

  return (
    <>
      {directories.map((dir) => (
        <Directory
          key={dir}
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          depth={depth}
          files={files}
          prefixedPath={dir}
          selectFile={selectFile}
          visibleFiles={visibleFiles}
        />
      ))}

      {modules.map((file) => {
        return <File key={file} active={activeFile === file} depth={depth} path={file} openFile={selectFile} />;
      })}
    </>
  );
};
