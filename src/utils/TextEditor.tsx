import '@toast-ui/editor/dist/i18n/ko-kr'; // 툴바 한글로 표시하기 위한 모듈
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import { forwardRef, useState } from 'react';

const TextEditor = forwardRef<Editor, EditorProps>(({ initialValue }, ref) => {
  const [isInitial, setIsInitial] = useState(true); // 초기 상태를 관리

  // 이미지 업로드 기능을 사용하지 못하게 할 예정이므로 툴바 커스텀
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
  ];

  // 추후 다국어 지원을 할 수 있으므로 변수로 선언해두기
  const language = 'ko-KR';

  const handleFocus = () => {
    if (isInitial && ref && typeof ref !== 'function' && ref.current) {
      const editorInstance = ref.current.getInstance();
      const currentContent = editorInstance.getMarkdown(); // Markdown으로 내용을 가져옴

      // 초기 상태와 일치하는지 확인 후 초기화
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
        initialValue={initialValue || ''}
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={toolbarItems}
        hideModeSwitch={true} // 편집기 모드 체인지 버튼을 숨김
        language={language}
        onFocus={handleFocus} // 사용자가 에디터를 클릭하면 초기 값 제거
      />
    </div>
  );
});

export default TextEditor;
