import { HSXRuntime } from './hsx-runtime.js';

const hsx = new HSXRuntime();

// Monaco Editor setup
let editor;
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: `// Write your HSX code here\n`,
        language: 'javascript', // optionally override later for HSX syntax
        theme: 'vs-light',
        automaticLayout: true,
    });
});

// Buttons
const runBtn = document.getElementById('runBtn');
const downloadBtn = document.getElementById('downloadBtn');
const output = document.getElementById('output');

// Run HSX code from editor
runBtn.addEventListener('click', async () => {
    const code = editor.getValue();
    output.innerHTML = `<pre>⏳ Running HSX...</pre>`;
    try {
        await hsx.execute(code); // << execute the string directly
        output.innerHTML = `<pre>✅ HSX executed! Check page for components/media.</pre>`;
    } catch (err) {
        output.innerHTML = `<pre style="color:red;">❌ Error: ${err.message}</pre>`;
    }
});

// Download HSX code as file
downloadBtn.addEventListener('click', () => {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.hsx';
    a.click();
    URL.revokeObjectURL(url);
});
