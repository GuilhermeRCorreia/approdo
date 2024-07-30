// src/components/ui/ProductTable.tsx
import React from "react";

interface Product {
  cod: string;
  nome: string;
  qtd: string;
  origem: string;
  ncm: string;
  vlrUni: string;
  vlrTot: string;
}
interface Infos {
  created: string;
  classified: string;
  dateInclude: string;
  dateClassf: string;
}

interface ProductTableProps {
  products: Product[];
  infos: Infos[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products, infos }) => {
  const total = products.reduce((sum, product) => {
    const value = parseFloat(product.vlrTot.replace('.', '').replace(',', '.'));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <div className="flex flex-col gap-3 w-full pt-4 overflow-y-auto">
      <div className="w-full">
        <div className="font-semibold text-lg pb-3">Dados da Pré Nota</div>
        {infos.map((info, index) => (
          <div key={index} className="flex justify-between border-b pb-4">
            <div className="">
              <div className="text-muted-foreground text-xs">
                Criado por:
                <span className="text-white text-sm">{info.created}</span>
              </div>
              <div className="text-muted-foreground text-xs">
                Classificado por:{" "}
                <span className="text-white text-sm">{info.classified}</span>
              </div>
            </div>

            <div className="flex flex-col w-72">
              <div className="flex justify-between">
                <div className="text-muted-foreground text-xs">
                  Data de Inclusão:
                </div>
                <span className="text-white"> {info.dateInclude}</span>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground text-xs">
                  Data de Classificação:
                </div>
                <span className="text-white">{info.dateClassf}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-b">
        <div className="font-semibold text-lg pb-3 ">Produtos</div>
        {products.map((product, index) => (
          <div key={index} className="flex justify-between  py-4">
            <div>
              <div className="text-muted-foreground text-xs">
                {product.cod} | Origem: {product.origem} | NCM: {product.ncm}
              </div>
              <div>
                {product.nome}
                <span className="text-muted-foreground text-xs"> x {product.qtd}</span>
              </div>
            </div>

            <div className="flex flex-col space-x-5 w-fit">
              <div className="flex justify-between">
                <div className="text-muted-foreground text-xs">Valor Unitário: </div>
                <div> R$ {product.vlrUni},00</div>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground text-xs">Valor Total: </div>
                <div>R${product.vlrTot},00</div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex w-full justify-between  py-3">
          <div className="font-semibold text-base">Total:</div>
          <div className="text-muted-foreground text-xs ">
            R${" "}
            <span className="text-base font-medium text-white">
              {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
