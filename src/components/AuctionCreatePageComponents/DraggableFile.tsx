import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

// 스타일드 컴포넌트를 사용하여 파일 아이템의 스타일을 정의합니다.
// $isDragging: 드래그 중인지 여부를 나타냅니다.
// $isMain: 메인 파일인지 여부를 나타냅니다.
const FileItem = styled.div<{ $isDragging: boolean; $isMain: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid black;
  margin-bottom: 4px;
  background-color: ${({ $isMain }) =>
    ($isMain ? '#ffe4e1' : 'white')}; // 메인 파일일 경우 배경색을 변경합니다.
  opacity: ${({ $isDragging }) =>
    ($isDragging ? 0.5 : 1)}; // 드래그 중일 경우 투명도를 조절합니다.
  position: relative;
`;

// 미리보기 이미지의 스타일을 정의합니다.
const Preview = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

// 메인 파일 라벨의 스타일을 정의합니다.
const MainLabel = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  border-bottom-left-radius: 4px;
`;

// 드래그 앤 드롭에서 사용할 아이템 타입을 정의합니다.
const ItemTypes = {
  FILE: 'file',
};

// 컴포넌트에 전달될 props의 타입을 정의합니다.
interface FileProps {
  file: File; // 파일 객체
  index: number; // 파일의 인덱스
  isMain: boolean; // 메인 파일 여부
  moveFile: (fromIndex: number, toIndex: number) => void; // 파일 순서를 변경하는 함수
  removeFile: (index: number) => void; // 파일을 삭제하는 함수
}

// DraggableFile 컴포넌트를 정의하고 기본으로 내보냅니다.
export default function DraggableFile({ file, index, isMain, moveFile, removeFile }: FileProps) {
  // useDrag 훅을 사용하여 드래그 가능한 요소로 설정합니다.
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FILE, // 아이템 타입을 FILE로 설정합니다.
    item: { index }, // 드래그할 때 전달할 데이터 (여기서는 인덱스)
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // 드래그 상태를 모니터링하여 isDragging 값을 업데이트합니다.
    }),
  });

  // useDrop 훅을 사용하여 드롭 가능한 영역으로 설정합니다.
  const [, drop] = useDrop({
    accept: ItemTypes.FILE, // 파일 타입만 허용합니다.
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveFile(item.index, index); // 파일의 순서를 변경하는 함수 호출
        item.index = index; // 현재 인덱스로 업데이트
      }
    },
  });

  return (
    // FileItem에 drag와 drop을 모두 연결하여 드래그와 드롭을 모두 지원합니다.
    <FileItem ref={(node) => drag(drop(node))} $isDragging={isDragging} $isMain={isMain}>
      {/* 파일의 미리보기 이미지를 표시합니다. */}
      <Preview src={URL.createObjectURL(file)} alt={file.name} />
      <span>{file.name}</span>
      {/* 파일을 삭제할 수 있는 버튼을 표시합니다. */}
      <button type='button' onClick={() => removeFile(index)}>Delete</button>
      {/* 파일이 메인 파일일 경우 'Main Image' 라벨을 표시합니다. */}
      {isMain && <MainLabel>Main Image</MainLabel>}
    </FileItem>
  );
}
