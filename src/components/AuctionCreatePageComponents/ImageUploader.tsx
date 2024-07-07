import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import DraggableFile from './DraggableFile';

// 스타일드 컴포넌트를 사용하여 컨테이너 스타일을 정의합니다.
const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: auto;
`;

// 스타일드 컴포넌트를 사용하여 드롭존 스타일을 정의합니다.
const DropzoneContainer = styled.div`
  padding: 20px;
  border: 2px dashed #cccccc;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

// 스타일드 컴포넌트를 사용하여 파일 리스트 스타일을 정의합니다.
const FileList = styled.div`
  margin-top: 10px;
`;

// ImageUploader 컴포넌트를 정의하고 기본으로 내보냅니다.
export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]); // 파일 상태를 관리하기 위해 useState 훅을 사용합니다.

  // 파일이 드롭되었을 때 호출되는 콜백 함수입니다.
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => {
      const newFiles = acceptedFiles.slice(0, 5 - prevFiles.length); // 최대 5개 파일만 허용합니다.
      return [...prevFiles, ...newFiles];
    });
  }, []);

  // 파일의 순서를 변경하는 함수입니다.
  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  // 파일을 삭제하는 함수입니다.
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // useDropzone 훅을 사용하여 드롭존을 설정합니다.
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    // DndProvider로 드래그 앤 드롭 컨텍스트를 제공합니다.
    <DndProvider backend={HTML5Backend}>
      <Container>
        <h2>Upload Files</h2>
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </DropzoneContainer>
        <FileList>
          {files.map((file, index) => (
            // DraggableFile 컴포넌트를 사용하여 파일을 표시하고 드래그 앤 드롭 기능을 추가합니다.
            <DraggableFile
              key={file.name}
              file={file}
              index={index}
              isMain={index === 0} // 첫 번째 파일을 메인 파일로 설정합니다.
              moveFile={moveFile}
              removeFile={removeFile}
            />
          ))}
        </FileList>
      </Container>
    </DndProvider>
  );
}
