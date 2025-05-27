import { useHUDStore } from '@/stores/hud';

const barClassName =
  'h-6 w-full text-center text-white rounded text-xs font-semibold bg-black/75 relative overflow-hidden';

export const HUD = () => {
  const { health, maxHealth, stamina, maxStamina, mana, maxMana } = useHUDStore();

  return (
    <div className="fixed left-4 bottom-4 flex flex-col w-[300px] gap-y-1">
      <div className={barClassName}>
        <div
          className="h-full bg-gradient-to-r from-red-500 to-red-800"
          style={{ width: `${(health / maxHealth) * 100}%` }}
        />
        <span className="absolute-center z-10 flex-center h-full">
          {health}/{maxHealth}
        </span>
      </div>
      <div className={barClassName}>
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-800"
          style={{ width: `${(stamina / maxStamina) * 100}%` }}
        />
        <span className="absolute-center z-10 flex-center h-full">
          {stamina}/{maxStamina}
        </span>
      </div>
      <div className={barClassName}>
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-800"
          style={{ width: `${(mana / maxMana) * 100}%` }}
        />
        <span className="absolute-center z-10 flex-center h-full">
          {mana}/{maxMana}
        </span>
      </div>
    </div>
  );
};
