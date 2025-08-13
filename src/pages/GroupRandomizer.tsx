import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Users } from "lucide-react";
import ConfettiOverlay from "@/components/basic/ConfettiOverlay";
import Headers from "@/components/basic/Headers";
import InputForm from "@/components/basic/InputForm";
import { Group } from "@/lib/groupPeople";
import { ThemeToggle } from "@/components/basic/ThemeToggle";
import GroupCard from "@/components/basic/GroupCard";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

export default function GroupRandomizer() {
  const [names, setNames] = useState("");
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomizeGroups = async () => {
    const nameList = names
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (nameList.length === 0) return;
    if (groupCount <= 0) return;

    setIsAnimating(true);
    setShowConfetti(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const shuffledNames = shuffleArray(nameList);
    const newGroups: Group[] = [];

    for (let i = 0; i < Math.min(groupCount, nameList.length); i++) {
      newGroups.push({
        id: i + 1,
        name: `Group ${i + 1}`,
        members: [],
      });
    }

    shuffledNames.forEach((name, index) => {
      const groupIndex = index % newGroups.length;
      newGroups[groupIndex].members.push(name);
    });

    setGroups(newGroups);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsAnimating(false);
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 2000);
  };

  const reset = () => {
    setGroups([]);
    setShowConfetti(false);
  };

  const nameList = names.split("\n").filter((name) => name.trim().length > 0);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          filter: (node) => {
            // Exclude button dari capture
            return !(
              node instanceof HTMLElement && node.dataset.exclude === "true"
            );
          },
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Kelompok-${new Date().toISOString()}.png`;
        link.click();
      } catch (err) {
        console.error("Gagal download gambar:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-10 w-full transition-colors duration-300">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      {showConfetti && <ConfettiOverlay />}

      <div className="max-w-6xl mx-auto">
        <Headers />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <InputForm
            groupCount={groupCount}
            setGroupCount={setGroupCount}
            groups={groups}
            isAnimating={isAnimating}
            names={names}
            setNames={setNames}
            randomizeGroups={randomizeGroups}
            reset={reset}
            nameList={nameList}
          />

          <div>
            {groups.length > 0 && (
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1.5 md:mb-2">
                  Nih Kelompoknya Udah Diacak 🔥
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 px-2">
                  {nameList.length} orang dibagi jadi {groups.length} kelompok
                </p>

                {/* Tombol download (excluded dari image) */}
                <Button
                  data-exclude="true"
                  onClick={handleDownload}
                  className="flex gap-2 mx-auto mt-2"
                >
                  <Download className="w-4 h-4" />
                  Simpan Gambar
                </Button>
              </div>
            )}

            <div ref={cardRef}>
              <div className="grid gap-3 md:gap-4">
                {groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    members={group.members}
                    index={group.id - 1}
                    name={group.name}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
            </div>

            {groups.length === 0 && !isAnimating && (
              <Card className="shadow-lg border-0 bg-white/60 dark:border-gray-800 dark:bg-gray-900/80 backdrop-blur-sm border-dashed border-gray-300 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
                  <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-400 dark:text-gray-500 mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mb-1.5 md:mb-2">
                    Yuk Bikin Kelompok!
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 px-4">
                    Masukin nama-nama terus klik{" "}
                    <span className="font-semibold text-primary dark:text-primary-light">
                      Acak Kelompok
                    </span>{" "}
                    buat mulai!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
