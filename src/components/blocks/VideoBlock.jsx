import React from "react";
import { Youtube } from "lucide-react";

const VideoBlock = ({ videoId, title }) => (
  <div className="my-8">
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        ></iframe>
    </div>
    {title && (
      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
        <Youtube size={16} className="text-red-500"/>
        <span className="italic">Video: {title}</span>
      </div>
    )}
  </div>
);

export default VideoBlock;