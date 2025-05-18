const barClassName =
  'h-6 w-full text-center text-white rounded text-xs font-semibold bg-black/75 relative overflow-hidden';

export const HUD = () => (
  <div className="fixed left-4 bottom-4 flex flex-col w-[300px] gap-y-1">
    <div className={barClassName}>
      <div className="h-full w-[65%] bg-red-500" />
      <span className="absolute-center z-10 flex-center h-full">65/100</span>
    </div>
    <div className={barClassName}>
      <div className="h-full w-[100%] bg-green-500" />
      <span className="absolute-center z-10 flex-center h-full">100/100</span>
    </div>
    <div className={barClassName}>
      <div className="h-full w-[23%] bg-blue-500" />
      <span className="absolute-center z-10 flex-center h-full">23/100</span>
    </div>
  </div>
);
