interface ToastProps {
  message: string | null;
}

export const Toast = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 rounded-xl bg-ink px-4 py-2 text-sm text-white shadow-lg">
      {message}
    </div>
  );
};
