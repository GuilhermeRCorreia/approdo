import {
  LayoutDashboard,
  ScrollText,
  ClipboardCopy,
  ClipboardPenLine,
  LifeBuoy,
  LogOut,
  Orbit,
} from "lucide-react";

interface MenuItem {
  icon: React.ComponentType<any>;
  label: string;
  ariaLabel: string;
  href?: string;
  action?: () => void; // Adicionado para ações como logout
}
export const headerMenuItems: MenuItem[] = [
  {
    icon: Orbit,
    label: "RodoAPP",
    ariaLabel: "RodoAPP",
    href: "/inicio",
  },
];
export const mainMenuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    ariaLabel: "Dashboard",
    href: "/inicio",
  },
  {
    icon: ScrollText,
    label: "Lista de Pré Notas",
    ariaLabel: "Lista de Pré Notas",
    href: "/inicio/prenota",
  },
  {
    icon: ClipboardPenLine,
    label: "Incluir Pré Nota",
    ariaLabel: "Manual",
    href: "/inicio/prenota/manual",
  },
  {
    icon: ClipboardCopy,
    label: "Importar XML",
    ariaLabel: "XML",
    href: "/inicio/prenota/xml",
  },
];

export const footerMenuItems: MenuItem[] = [
  {
    icon: LifeBuoy,
    label: "Ajuda",
    ariaLabel: "Help",
    href: "http://hesk.rodoparana.com.br",
  },

  {
    icon: LogOut,
    label: "Sair",
    ariaLabel: "Logout",
    action: () => handleLogout(),
  }, // Atualizado para logout
];

// Função de logout
const handleLogout = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (response.ok) {
    window.location.href = "/login";
  }
};
