import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Calendar, Ruler } from "lucide-react";

interface CharacterDetail {
  name: string;
  height: string;
  birth_year: string;
  homeworld: string;
}

interface CharacterPreviewProps {
  character: CharacterDetail;
  planet: string;
}

const CharacterPreview = ({ character, planet }: CharacterPreviewProps) => {
  return (
    <Card className="bg-secondary/50 border-primary/10">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">{character.name}</h3>
          <Badge variant="outline" className="border-primary/30 text-primary">
            Vista Previa
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Altura:</span>
            <span className="font-medium">{character.height} cm</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Nacimiento:</span>
            <span className="font-medium">{character.birth_year}</span>
          </div>
          
          {planet && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Planeta:</span>
              <span className="font-medium">{planet}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterPreview;
