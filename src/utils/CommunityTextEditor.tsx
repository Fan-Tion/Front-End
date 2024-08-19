import { communityApi } from '@api/community';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import { forwardRef, useEffect, useRef } from 'react';

const CommunityTextEditor = forwardRef<Editor, EditorProps>(
  ({ initialValue, onPostIdChange, postId }, ref) => {
    const currentPostIdRef = useRef<number | null>(postId || null);

    const toolbarItems = [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'link'],
      ['image'], // 이미지 업로드 버튼 추가
    ];

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

    const handleImageUpload = async (
      blob: Blob,
      callback: (url: string, text: string) => void,
    ) => {
      const formData = new FormData();
      formData.append('file', blob);

      try {
        const channelId = 1;
        let response;

        if (currentPostIdRef.current === null) {
          // 첫 번째 이미지 업로드: postId 없이 요청
          response = await communityApi.uploadImage(formData, channelId, null);
          const result = response.data;

          if (result && result.postId) {
            currentPostIdRef.current = result.postId; // useRef를 통해 postId 저장
            if (onPostIdChange) onPostIdChange(result.postId);
          }

          if (result && result.imageUrl[0]) {
            callback(result.imageUrl[0], 'alt text');
          } else {
            console.error('Invalid response structure:', result);
          }
        } else {
          // 이후 이미지 업로드: postId를 쿼리 파라미터로 전달
          response = await communityApi.uploadImage(
            formData,
            channelId,
            currentPostIdRef.current,
          );
          const result = response.data;

          if (result && result.imageUrl[0]) {
            callback(result.imageUrl[0], 'alt text');
          } else {
            console.error('Invalid response structure:', result);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    return (
      <div style={{ width: '100%', margin: '10px 0' }}>
        <Editor
          ref={ref}
          initialValue={initialValue || ''}
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          toolbarItems={toolbarItems}
          hideModeSwitch={true}
          language={language}
          height="500px"
          hooks={{ addImageBlobHook: handleImageUpload }}
        />
      </div>
    );
  },
);

export default CommunityTextEditor;
