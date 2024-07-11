import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr' // 툴바 한글로 표시하기 위한 모듈

export default function TextEditor() {

  // 이미지 업로드 기능을 사용하지 못하게 할 예정이므로 툴바 커스텀 
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
  ];

  // 추후 다국어 지원을 할 수 있으므로 변수로 선언해두기
  const language = 'ko-KR';

  return (
    <Editor
      initialValue="부적절한 내용을 게시할 경우 불이익이 발생할 수 있습니다."
      previewStyle="vertical"
      height="auto"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
      hideModeSwitch={true}  // 편집기 모드 체인지 버튼을 숨김
      language={language}
    />
  )
}
