import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

interface SearchPopoverProps {
  onSearch: (query: string) => void;
}

const SearchPopover: React.FC<SearchPopoverProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Search className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={handleSearchChange}
          className="h-8"
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopover;
