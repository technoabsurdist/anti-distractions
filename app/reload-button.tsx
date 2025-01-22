'use client'

export default function ReloadButton() {
  return (
    <button 
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
    >
      Reload
    </button>
  );
}