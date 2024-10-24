import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
interface BlogPostEditorProps {
  initialContent?: string;
  onSave: (content: string, featuredImage: string) => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [featuredImage, setFeaturedImage] = useState('');
  const quillRef = useRef<ReactQuill>(null);
  const supabase = createClientComponentClient();

  const uploadImage = async (file: File, isFeatured: boolean = false) => {
    const fileName = `${isFeatured ? 'featured-' : ''}${Date.now()}-${
      file.name
    }`;
    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('blog-images').getPublicUrl(fileName);

    return publicUrl;
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const url = await uploadImage(file);
        if (url) {
          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, 'image', url);
          }
        }
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          대표 이미지 (OG 이미지와 썸네일로 사용됨)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await uploadImage(file, true);
              if (url) setFeaturedImage(url);
            }
          }}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700"
        />
        {featuredImage && (
          <Image
            src={featuredImage}
            alt="대표 이미지 미리보기"
            className="mt-2 max-h-40 rounded"
          />
        )}
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
      />
      <button
        onClick={() => onSave(content, featuredImage)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
};

export default BlogPostEditor;
