import { communityApi } from '@api/community';
import '@toast-ui/editor/dist/i18n/ko-kr'; // 툴바 한글로 표시하기 위한 모듈
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import { forwardRef, useState } from 'react';

const CommunityTextEditor = forwardRef<Editor, EditorProps>(
  ({ initialValue }, ref) => {
    const [isInitial, setIsInitial] = useState(true); // 초기 상태를 관리

    // 이미지 업로드 기능을 사용하게 툴바에 이미지 버튼 추가
    const toolbarItems = [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'link'],
      ['image'], // 이미지 업로드 버튼 추가
    ];

    const language = 'ko-KR';

    const handleFocus = () => {
      if (isInitial && ref && typeof ref !== 'function' && ref.current) {
        const editorInstance = ref.current.getInstance();
        const currentContent = editorInstance.getMarkdown(); // Markdown으로 내용을 가져옴

        if (
          currentContent.trim() ===
          '부적절한 내용을 게시할 경우 불이익이 발생할 수 있습니다.'
        ) {
          editorInstance.setMarkdown(''); // 초기 값 지우기
          setIsInitial(false); // 초기 상태를 false로 설정
        }
      }
    };

    return (
      <div
        style={{
          width: '100%',
          margin: '10px 0',
        }}
      >
        <Editor
          ref={ref}
          initialValue={
            initialValue ||
            '부적절한 내용을 게시할 경우 불이익이 발생할 수 있습니다.'
          }
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          toolbarItems={toolbarItems}
          hideModeSwitch={true}
          language={language}
          height="500px"
          onFocus={handleFocus}
          hooks={{
            addImageBlobHook: async (
              blob: Blob, // blob 타입 명시
              callback: (url: string, text: string) => void, // callback 타입 명시
            ) => {
              // 이미지 업로드 로직
              const formData = new FormData();
              formData.append('file', blob);

              try {
                const communityId = '1';
                const response = await communityApi.uploadImage(
                  formData,
                  communityId,
                );
                const result = response.data;

                console.log('Response:', response); // 전체 응답 객체를 출력
                console.log('Response data:', result); // 응답 데이터 구조 확인

                if (result && result.url) {
                  callback(result.url, 'alt text');
                } else {
                  console.error('Invalid response structure:', result);
                }
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            },
          }}
        />
      </div>
    );
  },
);

export default CommunityTextEditor;
