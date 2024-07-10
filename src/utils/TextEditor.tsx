import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function TextEditor() {

  // 이미지 업로드 기능을 사용하지 못하게 할 예정이므로 툴바를 커스텀함 
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
  ];

  return (
    <Editor
      initialValue="부적절한 내용을 게시할 경우 불이익이 발생할 수 있습니다."
      previewStyle="vertical"
      height="auto"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
      hideModeSwitch={true}  // 편집기 모드 체인지 버튼을 숨김
    />
  )
}
