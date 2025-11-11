import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Globe, Calendar, Ruler, FileText } from "lucide-react";

interface CharacterDetail {
  name: string;
  height: string;
  birth_year: string;
  homeworld: string;
}

interface SavedCard {
  character: CharacterDetail;
  planet: string;
  nickname: string;
  isFavorite: boolean;
}

interface CharacterSummaryProps {
  savedCard: SavedCard | null;
}

const CharacterSummary = ({ savedCard }: CharacterSummaryProps) => {
  if (!savedCard) {
    return (
      <Card className="border-dashed border-primary/30 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Ficha Guardada
          </CardTitle>
          <CardDescription>Tu ficha aparecerá aquí una vez guardada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Aún no has guardado ninguna ficha</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-card to-secondary/20 shadow-xl shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Ficha Guardada
          </CardTitle>
          {savedCard.isFavorite && (
            <Badge variant="default" className="bg-destructive hover:bg-destructive/90">
              <Heart className="w-3 h-3 mr-1 fill-current" />
              Favorito
            </Badge>
          )}
        </div>
        <CardDescription>Resumen de tu ficha personalizada</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Character name and nickname */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1">{savedCard.character.name}</h3>
          <p className="text-muted-foreground italic">"{savedCard.nickname}"</p>
        </div>

        <Separator className="bg-border/50" />

        {/* Character details */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Ruler className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Altura</p>
              <p className="font-medium">{savedCard.character.height} cm</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Año de nacimiento</p>
              <p className="font-medium">{savedCard.character.birth_year}</p>
            </div>
          </div>

          {savedCard.planet && (
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Planeta de origen</p>
                <p className="font-medium">{savedCard.planet}</p>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Preferences */}
        <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-primary">Preferencias</p>
          <div className="flex items-center gap-2">
            <Heart className={`w-4 h-4 ${savedCard.isFavorite ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
            <p className="text-sm">
              {savedCard.isFavorite ? 'Marcado como favorito' : 'No es tu favorito'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterSummary;
