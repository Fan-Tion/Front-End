import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export default function QuillEditor() {
  const theme = 'snow';

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      ['link'],
      ['clean']                                         // remove formatting button
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const placeholder = 'Compose an epic...';

  const formats = ['bold', 'italic', 'underline', 'strike'];

  const { quillRef } = useQuill({ theme, modules, formats, placeholder });

  return (
    <Wrapper>
      <div ref={quillRef} />
    </Wrapper>
  );
}
