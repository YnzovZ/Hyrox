"use client";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ title, message, confirmLabel = "Ja", cancelLabel = "Annuleer", onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm animate-[fadeIn_0.2s_ease-out] rounded-2xl bg-white px-5 pb-5 pt-5 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="mt-1.5 text-base text-zinc-500 dark:text-zinc-400">{message}</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-zinc-300 py-2.5 text-base font-medium text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-amber-500 py-2.5 text-base font-semibold text-white transition-all hover:bg-amber-600 active:scale-[0.98]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
