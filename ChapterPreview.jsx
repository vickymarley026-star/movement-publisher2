import React from "react";

export default function ChapterPreview({ pdf, page = 1, title }) {
  return (
    <div className="aspect-[3/4] overflow-hidden bg-white">
      <iframe
        key={`${pdf}-${page}`}
        src={`${pdf}#page=${page}&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
        title={`${title} chapter design preview`}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}