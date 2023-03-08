import { useEffect } from "react";
import { Character } from "./components/Character";
import { ConfigPanel } from "./components/ConfigPanel";
import { useSkillEngine } from "./engine/SkillEngine";
import { useGlobalStateSnapshot } from "./global-state";
import { trailOfCthulhu } from "./systems/trail-of-cthulhu";

export const App = () => {
  const { lang, playersCount } = useGlobalStateSnapshot();
  const skillEngine = useSkillEngine(trailOfCthulhu);

  useEffect(() => {
    skillEngine.setPlayersCount(playersCount);
  }, [skillEngine, playersCount]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <ConfigPanel skillEngine={skillEngine} />
      <Character skillEngine={skillEngine} />
    </>
  );
};
