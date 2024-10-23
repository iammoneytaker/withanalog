import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface BlogPostEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const quillRef = useRef<ReactQuill>(null);
  const supabase = createClientComponentClient();

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file);

        if (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } else {
          const {
            data: { publicUrl },
          } = supabase.storage.from('blog-images').getPublicUrl(fileName);

          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, 'image', publicUrl);
          } else {
            console.error('Quill 에디터를 찾을 수 없습니다.');
          }
        }
      }
    };
  }, [supabase]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
      />
      <button
        onClick={() => onSave(content)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
};

export default BlogPostEditor;
