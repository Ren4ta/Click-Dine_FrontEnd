// WishListContext.jsx
import { createContext, useContext, useState } from "react";

const WishListContext = createContext(null);

// Hook para usar el contexto
export const useCarrito = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un WishListProvider");
  }
  return context;
};

// Provider del carrito
export const WishListProvider = ({ children }) => {
  const [pedidoId, setPedidoId] = useState(null);

  return (
    <WishListContext.Provider value={{ pedidoId, setPedidoId }}>
      {children}
    </WishListContext.Provider>
  );
};
