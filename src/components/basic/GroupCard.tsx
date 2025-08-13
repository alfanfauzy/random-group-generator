import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupCardProps {
  name: string;
  members: string[];
  index: number;
  isAnimating: boolean;
}

export default function GroupCard({
  name,
  members,
  index,
  isAnimating,
}: GroupCardProps) {
  const colors = ["blue", "purple", "green", "pink"];
  const color = colors[index % colors.length];

  return (
    <Card
      className={`dark:border-gray-800 dark:bg-gray-900/80 shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform ${
        isAnimating
          ? "animate-pulse scale-95"
          : "hover:scale-[1.02] animate-in slide-in-from-right duration-500"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <div
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-${color}-500`}
          />
          {name}
          <span className="text-xs md:text-sm font-normal text-gray-500">
            ({members.length} orang)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {members.map((member, memberIndex) => (
            <span
              key={memberIndex}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-${color}-100 text-${color}-700 animate-in fade-in duration-300`}
              style={{
                animationDelay: `${index * 100 + memberIndex * 50}ms`,
              }}
            >
              {member}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
