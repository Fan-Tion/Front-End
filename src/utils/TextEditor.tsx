import '@toast-ui/editor/dist/i18n/ko-kr'; // 툴바 한글로 표시하기 위한 모듈
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import { forwardRef, useEffect } from 'react';

const TextEditor = forwardRef<Editor, EditorProps>(({ initialValue }, ref) => {
  // 이미지 업로드 기능을 사용하지 못하게 할 예정이므로 툴바 커스텀
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
  ];

  // 추후 다국어 지원을 할 수 있으므로 변수로 선언해두기
  const language = 'ko-KR';

  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current) {
      const editorInstance = ref.current.getInstance();
      const currentContent = editorInstance.getMarkdown();

      if (
        currentContent.includes('편집하기') ||
        currentContent.includes('미리보기')
      ) {
        editorInstance.setMarkdown(''); // 초기화
      }
    }
  }, []);

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
      />
    </div>
  );
});

export default TextEditor;
