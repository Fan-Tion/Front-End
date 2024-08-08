import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import DraggableFile from './DraggableFile';

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  min-height: 400px;
  margin: auto;
`;

const DropzoneContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  height: 70px;
  border: 2px dashed #cccccc;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

const FileList = styled.div`
  margin-top: 10px;
`;
const Limit = styled.p`
  margin-top: 10px;
`;

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  onMainImageChange: (file: File | null) => void; // 콜백 추가
}

export default function ImageUploader({
  onFilesChange,
  onMainImageChange,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  // 파일이 드롭되었을 때 호출되는 콜백 함수
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filteredFiles = acceptedFiles.filter(
      file => file.size <= 5 * 1024 * 1024,
    ); // 5MB 이하 파일만 허용
    setFiles(prevFiles => {
      const newFiles = filteredFiles.slice(0, 5 - prevFiles.length); // 최대 5개 파일만 허용합니다.
      return [...prevFiles, ...newFiles];
    });
  }, []);

  useEffect(() => {
    onFilesChange(files);
    onMainImageChange(files[0] || null); // 0번째 이미지 전달
  }, [files, onFilesChange, onMainImageChange]);

  // 파일의 순서를 변경하는 함수
  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  // 파일을 삭제하는 함수
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // useDropzone 훅을 사용하여 드롭존을 설정
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // 이미지 파일만 허용
    maxSize: 5 * 1024 * 1024, // 파일 크기 5MB 제한
  });

  return (
    // DndProvider로 드래그 앤 드롭 컨텍스트를 제공
    <DndProvider backend={HTML5Backend}>
      <Container>
        <div>
          <h2>Upload Files</h2>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <p>파일을 여기로 끌어오거나 클릭해서 업로드하세요.</p>
            <Limit>최대 5장의 이미지를 업로드할 수 있습니다.</Limit>
          </DropzoneContainer>
        </div>
        <FileList>
          {files.map((file, index) => (
            // DraggableFile 컴포넌트를 사용하여 파일을 표시하고 드래그 앤 드롭 기능을 추가
            <DraggableFile
              key={`${file.name}-${index}`}
              file={file}
              index={index}
              isMain={index === 0} // 첫 번째 파일을 메인 파일로 설정
              moveFile={moveFile}
              removeFile={removeFile}
            />
          ))}
        </FileList>
      </Container>
    </DndProvider>
  );
}
