// components/Card.tsx
export default function Card({ children, title }: any) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 shadow-lg">
      {title && (
        <h2 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}