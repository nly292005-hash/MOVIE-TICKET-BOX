function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;