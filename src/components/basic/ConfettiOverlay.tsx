import { Sparkles } from "lucide-react";

export default function ConfettiOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
      ))}
    </div>
  );
}
