import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="dark"
      toastOptions={{
        style: {
          background: "#1e293b",
          border: "1px solid #475569",
          borderRadius: "0.75rem",
          color: "#f1f5f9",
        },
        classNames: {
          toast: "text-sm font-medium",
          title: "text-sm font-semibold",
          description: "text-xs text-slate-400",
          actionButton: "bg-amber-400 text-slate-950 hover:bg-amber-300",
          cancelButton: "bg-slate-800 text-slate-400",
          closeButton: "bg-slate-800 text-slate-400",
        },
      }}
      closeButton
    />
  );
}
