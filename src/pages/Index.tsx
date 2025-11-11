import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Rocket, Star, User } from "lucide-react";
import CharacterPreview from "@/components/CharacterPreview";
import CharacterSummary from "@/components/CharacterSummary";

interface Character {
  name: string;
  url: string;
}

interface CharacterDetail {
  name: string;
  height: string;
  birth_year: string;
  homeworld: string;
}

interface Planet {
  name: string;
}

interface SavedCard {
  character: CharacterDetail;
  planet: string;
  nickname: string;
  isFavorite: boolean;
}

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterUrl, setSelectedCharacterUrl] = useState<string>("");
  const [characterDetail, setCharacterDetail] = useState<CharacterDetail | null>(null);
  const [planet, setPlanet] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [savedCard, setSavedCard] = useState<SavedCard | null>(null);

  // Load characters on mount
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/?page=1");
        const data = await response.json();
        setCharacters(data.results);
        
        // Load saved card from localStorage
        const saved = localStorage.getItem("starWarsCard");
        if (saved) {
          const savedData: SavedCard = JSON.parse(saved);
          setSavedCard(savedData);
          toast.success("Ficha recuperada del almacenamiento local");
        }
      } catch (error) {
        toast.error("Error al cargar personajes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Fetch character details when selection changes
  useEffect(() => {
    if (!selectedCharacterUrl) return;

    const fetchCharacterDetail = async () => {
      setLoadingDetail(true);
      try {
        const response = await fetch(selectedCharacterUrl);
        const data: CharacterDetail = await response.json();
        setCharacterDetail(data);

        // Fetch homeworld
        if (data.homeworld) {
          const planetResponse = await fetch(data.homeworld);
          const planetData: Planet = await planetResponse.json();
          setPlanet(planetData.name);
        }
      } catch (error) {
        toast.error("Error al cargar detalles del personaje");
        console.error(error);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchCharacterDetail();
  }, [selectedCharacterUrl]);

  const handleSaveCard = () => {
    if (!characterDetail) {
      toast.error("Selecciona un personaje primero");
      return;
    }

    if (nickname.length < 2) {
      toast.error("El apodo debe tener al menos 2 caracteres");
      return;
    }

    const card: SavedCard = {
      character: characterDetail,
      planet,
      nickname,
      isFavorite,
    };

    setSavedCard(card);
    localStorage.setItem("starWarsCard", JSON.stringify(card));
    toast.success("¡Ficha guardada exitosamente!");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-star-glow to-primary bg-clip-text text-transparent">
              Ficha Galáctica
            </h1>
            <Star className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Crea tu ficha personalizada de personajes de Star Wars
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column - Character selection and form */}
          <Card className="border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Seleccionar Personaje
              </CardTitle>
              <CardDescription>Elige un personaje y crea su ficha personalizada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Character selector */}
              <div className="space-y-2">
                <Label htmlFor="character">Personaje</Label>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select value={selectedCharacterUrl} onValueChange={setSelectedCharacterUrl}>
                    <SelectTrigger id="character">
                      <SelectValue placeholder="Selecciona un personaje..." />
                    </SelectTrigger>
                    <SelectContent>
                      {characters.map((character) => (
                        <SelectItem key={character.url} value={character.url}>
                          {character.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Character preview */}
              {loadingDetail ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : characterDetail ? (
                <CharacterPreview character={characterDetail} planet={planet} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Selecciona un personaje para ver sus detalles
                </div>
              )}

              {/* Form fields */}
              {characterDetail && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Apodo en tu ficha</Label>
                    <Input
                      id="nickname"
                      placeholder="Ej: El Elegido"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="border-border/50 focus:border-primary"
                    />
                    {nickname.length > 0 && nickname.length < 2 && (
                      <p className="text-destructive text-sm">Mínimo 2 caracteres</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="favorite" checked={isFavorite} onCheckedChange={(checked) => setIsFavorite(checked as boolean)} />
                    <Label htmlFor="favorite" className="cursor-pointer">
                      ¿Es tu favorito?
                    </Label>
                  </div>

                  <Button onClick={handleSaveCard} className="w-full" size="lg">
                    <Star className="w-4 h-4 mr-2" />
                    Guardar Ficha
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Right column - Saved card summary */}
          <CharacterSummary savedCard={savedCard} />
        </div>
      </div>
    </div>
  );
};

export default Index;
