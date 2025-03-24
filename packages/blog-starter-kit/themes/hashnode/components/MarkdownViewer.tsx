import React, { useEffect, useState } from 'react';
import {remark} from 'remark';
import remarkHtml from 'remark-html';
import sanitizeHtml from 'sanitize-html';

interface MarkdownViewerProps {
  content: string;
  className?: string;
  sanitizeOptions?: sanitizeHtml.IOptions;
}

const defaultSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height'],
    a: ['href', 'name', 'target', 'rel'],
    span: ['class'],
    code: ['class']
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    a: (tagName, attribs) => {
      // Ensure external links open in new tab and have noopener/noreferrer
      if (attribs.href && attribs.href.startsWith('http')) {
        return {
          tagName,
          attribs: {
            ...attribs,
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        };
      }
      return { tagName, attribs };
    }
  }
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className = '',
  sanitizeOptions = defaultSanitizeOptions
}) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        // Process markdown to HTML
        const processedContent = await remark()
          .use(remarkHtml)
          .process(content);

        // Sanitize HTML
        const sanitizedHtml = sanitizeHtml(
          processedContent.toString(),
          sanitizeOptions
        );

        setHtmlContent(sanitizedHtml);
      } catch (error) {
        console.error('Error processing markdown:', error);
        setHtmlContent('<p>Error rendering markdown content</p>');
      }
    };

    processMarkdown();
  }, [content, sanitizeOptions]);

  return (
    <div 
      className={`markdown-viewer ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent || '<p>Loading...</p>' }}
    />
  );
};

export default MarkdownViewer;