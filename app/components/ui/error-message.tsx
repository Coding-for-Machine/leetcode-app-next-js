export const ErrorMessage = ({ message }: { message: string }) => (
    <div className="p-4 text-red-600 bg-red-100 rounded-lg">
      {message}
    </div>
  )