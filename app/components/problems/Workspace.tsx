"use client";
import React, { useState, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import Split from "react-split";
import PlayGround from "./PlayGround";
import SettingsModal from "./SettingsModal";
import { Problem } from "@/types/problems";

type Props = {
  problem: Problem;
  currentProblem: any;
  id: string;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

function Workspace({ problem, currentProblem, id }: Props) {
  // Initialize settings with proper type and safe localStorage access
  const [settings, setSettings] = useState<ISettings>({
    fontSize: "14px",
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [solved, setSolved] = useState(false);

  // Load settings from localStorage safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFontSize = localStorage.getItem("editor-font-size");
      setSettings(prev => ({
        ...prev,
        fontSize: savedFontSize || "14px"
      }));
    }
  }, []);

  // Save font size changes
  useEffect(() => {
    if (settings.fontSize && typeof window !== 'undefined') {
      localStorage.setItem("editor-font-size", settings.fontSize);
    }
  }, [settings.fontSize]);

  return (
    <div>
      {settings.settingsModalIsOpen && (
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
        />
      )}
      
      <Split className="split p-2" minSize={354}>
        <div>
          <ProblemDescription
            problem={problem}
            currentProblem={currentProblem}
            _solved={solved}
          />
        </div>
        <div>
          <PlayGround
            problem={problem}
            // problemData={currentProblem}
            // id={id}
            setSolved={setSolved}
            setSettings={setSettings}
            settings={settings}
          />
        </div>
      </Split>
    </div>
  );
}

export default Workspace;