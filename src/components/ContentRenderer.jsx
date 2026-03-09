import React from "react";
import { ChevronRight } from "lucide-react";
import { processText } from "../utils/textProcessor";
import CodeBlock from "./blocks/CodeBlock";
import Alert from "./blocks/Alert";
import ImageBlock from "./blocks/ImageBlock";
import VideoBlock from "./blocks/VideoBlock";
import PdfBlock from "./blocks/PdfBlock";

const ContentRenderer = ({ content, onImageClick }) => {
  if (!content) return null;
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        switch (block.type) {
          case 'header':
            return <h1 key={index} className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 pb-2 border-b border-slate-800 pt-10">{processText(block.text)}</h1>;
          case 'header2':
            return <h2 key={index} className="text-2xl font-semibold text-slate-100 mt-8 mb-4 flex items-center gap-2 pt-6"><ChevronRight className="text-purple-500" size={20}/> {processText(block.text)}</h2>;
          case 'text':
            return <p key={index} className="text-slate-400 leading-7 text-lg">{processText(block.text)}</p>;
          case 'code':
            return <CodeBlock key={index} code={block.code} language={block.language} />;
          case 'alert':
            return <Alert key={index} variant={block.variant} title={block.title} text={block.text} />;
          case 'image':
            return <ImageBlock key={index} src={block.src} alt={block.alt} caption={block.caption} onImageClick={onImageClick} />;
          case 'video':
            return <VideoBlock key={index} videoId={block.videoId} title={block.title} />;
          case 'list':
            return <ul key={index} className="list-disc pl-5 space-y-2 text-slate-400 marker:text-purple-500">{block.items.map((item, i) => <li key={i}>{processText(item)}</li>)}</ul>;
          case 'pdf':
            return <PdfBlock key={index} src={block.src} title={block.title} />;

          default: return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;