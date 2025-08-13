import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RotateCcw, Shuffle } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Group } from "@/lib/groupPeople";

type InputFormProps = {
  names: string;
  setNames: React.Dispatch<React.SetStateAction<string>>;
  groupCount: number;
  setGroupCount: React.Dispatch<React.SetStateAction<number>>;
  groups: Group[];
  isAnimating: boolean;
  randomizeGroups: () => void;
  reset: () => void;
  nameList: string[];
};

const InputForm = (props: InputFormProps) => {
  const {
    groupCount,
    groups,
    isAnimating,
    names,
    randomizeGroups,
    reset,
    setGroupCount,
    setNames,
    nameList,
  } = props;

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 max-h-fit">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Shuffle className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          Atur Kelompokmu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div>
          <Label
            htmlFor="names"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
          >
            Masukin Nama (satu per baris)
          </Label>
          <Textarea
            id="names"
            placeholder="Andi&#10;Budi&#10;Citra&#10;Dewi&#10;Eka"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            className="min-h-[150px] md:min-h-[200px] resize-none border-gray-200 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400/20 dark:bg-gray-800 dark:text-gray-100"
          />
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1.5 md:mt-2">
            {nameList.length} orang di tulis
          </p>
        </div>

        <div>
          <Label
            htmlFor="groups"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
          >
            Jumlah Kelompok
          </Label>
          <Input
            id="groups"
            type="number"
            min="1"
            max={Math.max(1, nameList.length)}
            value={groupCount}
            onChange={(e) =>
              setGroupCount(Math.max(1, Number.parseInt(e.target.value) || 1))
            }
            className="border-gray-200 dark:border-gray-700 focus:border-purple-400 focus:ring-purple-400/20 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={randomizeGroups}
            disabled={nameList.length === 0 || isAnimating}
            className="flex-1 cursor-pointer bg-primary text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isAnimating ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Lagi Diacak...
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4 mr-2" />
                Acak Kelompok
              </>
            )}
          </Button>

          {groups.length > 0 && (
            <Button
              onClick={reset}
              variant="outline"
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent dark:text-gray-200"
            >
              Ulangin
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InputForm;
