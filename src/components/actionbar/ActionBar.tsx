import { Input } from "../input/Input";


interface ActionBarProps {
  action: () => void;
  disableItems?: boolean;
  filterText: string;
  onFilterChange: (value: string) => void;
}

export const ActionBar = ({ 
  action, 
  disableItems = false, 
  filterText, 
  onFilterChange, 
}: ActionBarProps) => {
  if (disableItems) return null;

  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mt-4">
      <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
        <Input
          placeholder="Buscar"
          iconRight="search"
          value={filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange(e.target.value)}
        />
      </div>

      {/* <Button
        icon="plus-lg"
        text="Agregar"
        onClick={() => {
          console.log("Agregar");
          action();
        }}
      /> */}
    </div>
  );
};