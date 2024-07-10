export default function SearchBox({
  label,
  searchRef,
  placeholder,
  handleSearch,
}: {
  label: string;
  searchRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
  handleSearch: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label htmlFor="search" className="text-xs ml-1">
        {label}
      </label>
      <input
        type="text"
        id="search"
        placeholder={placeholder}
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"
        ref={searchRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
    </div>
  );
}
