import React from "react";
import { useQuery } from "react-query";
import { labels, statuses, priorities } from "@/data/filters";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const fetchData = async (endpoint) => {
  const url = `http://172.16.99.174:8400/rest/${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useFetchFiliais = (endpoint) => {
  return useQuery(["Filiais", endpoint], () => fetchData(endpoint), {
    select: (data) => data.Filiais, // Filtra para obter somente Filiais
    onError: (error) => console.error("Error fetching data:", error),
  });
};

const FilterGroup = ({ endpoint, onSelect }) => {
  const {
    data: filiais,
    error,
    isLoading,
    isError,
  } = useFetchFiliais(endpoint);

  if (isLoading) {
    return <div>Carregando filiais...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Erro ao carregar filiais. Tente novamente mais tarde.</div>;
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 dark:hover:bg-gray-900">Filial</MenubarTrigger>
        <MenubarContent>
          {filiais &&
            filiais.map((filial) => (
              <MenubarItem
                key={filial.M0_CODFIL}
                onSelect={() => onSelect(filial.M0_CODFIL)}
              >
                {filial.M0_FILIAL.trim()}
              </MenubarItem>
            ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 dark:hover:bg-gray-900">Tipo de Item</MenubarTrigger>
        <MenubarContent>
          {labels.map((label) => (
            <MenubarItem
              key={label.value}
              onSelect={() => onSelect(label.value)}
            >
              {label.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 dark:hover:bg-gray-900">Status</MenubarTrigger>
        <MenubarContent>
          {statuses.map((status) => (
            <MenubarItem
              key={status.value}
              onSelect={() => onSelect(status.value)}
            >
              {status.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 dark:hover:bg-gray-900">Prioridade</MenubarTrigger>
        <MenubarContent>
          {priorities.map((priority) => (
            <MenubarItem
              key={priority.value}
              onSelect={() => onSelect(priority.value)}
            >
              {priority.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      

    </Menubar>
  );
};

export default FilterGroup;
