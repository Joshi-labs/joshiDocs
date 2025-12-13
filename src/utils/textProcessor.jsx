const processText = (text) => {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Changed from <b> to ** for markdown style
    html = html.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>'); // Keep support for legacy <b>
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-700/50 text-slate-100 px-1 py-0.5 rounded text-[0.95em]">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export { processText };