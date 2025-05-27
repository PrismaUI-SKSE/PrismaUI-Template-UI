export const Preview = () => (
  <div className="fixed left-4 top-4 bg-black/85 p-4 text-white min-w-[600px] shadow flex flex-col">
    <span className="font-bold text-xl mb-2">PrismaUI Template UI Preview</span>
    <span>Hi! You&apos;re in the development browser environment!</span>
    <span>
      Read the documentation about this UI template{' '}
      <a
        href="https://github.com/PrismaUI-SKSE/PrismaUI-Template-UI?tab=readme-ov-file#documentation"
        target="_blank"
        rel="noreferrer"
        className="underline text-sky-500"
      >
        here
      </a>
      .
    </span>
    <span>
      You&apos;re able to change the background at{' '}
      <b className="text-sky-500">/src/assets/images/background.png</b> file.
    </span>
    <span>
      Press <b className="text-sky-500">F3</b> to open DevTools.
    </span>
    <span className="text-xs mt-2 text-gray-400">
      You can remove this block. Search <b className="text-white">Preview</b> in your code to find
      this component.
    </span>
  </div>
);
