import { Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

export function StoreSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Configurações da Loja
        </CardTitle>
        <CardDescription>
          Informações sobre sua loja conectada à Shopify
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="storeName">Nome da Loja</Label>
          <Input 
            id="storeName" 
            defaultValue="Minha Loja Shopify" 
            readOnly 
            className="bg-muted/40 text-muted-foreground" 
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="storeUrl">URL da Loja</Label>
          <Input 
            id="storeUrl" 
            defaultValue="minhaloja.myshopify.com" 
            readOnly 
            className="bg-muted/40 text-muted-foreground" 
          />
        </div>

        <div className="grid gap-2">
          <Label>Status da Integração</Label>
          <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Conectado
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
