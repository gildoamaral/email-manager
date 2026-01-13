import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from './mode-toggle'; // Vamos criar esse componente logo abaixo

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6 justify-between">
      {/* Lado Esquerdo: Breadcrumb ou Título (Simplificado) */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-xl">Confraria Vintage</h1>
      </div>

      {/* Lado Direito: Ações e Perfil */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline-block">
            Admin User
          </span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}