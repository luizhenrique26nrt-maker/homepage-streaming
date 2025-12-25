"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Info, X, Star, Plus, Check, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

// Tipos
interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  year: number;
  duration: string;
  cast: string[];
  synopsis: string;
  genre: string[];
}

// Dados fictícios de filmes expandidos
const moviesData: Movie[] = [
  {
    id: 1,
    title: "Aventura Espacial",
    description: "Uma jornada épica através das estrelas",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=450&fit=crop",
    category: "Ação",
    rating: 4.5,
    year: 2023,
    duration: "2h 15min",
    cast: ["John Smith", "Maria Silva", "Carlos Santos"],
    synopsis: "Em um futuro distante, uma equipe de exploradores embarca em uma missão perigosa para salvar a humanidade. Com efeitos visuais impressionantes e uma história emocionante, este filme redefine o gênero de ficção científica.",
    genre: ["Ficção Científica", "Aventura", "Ação"]
  },
  {
    id: 2,
    title: "Mistério na Cidade",
    description: "Um detetive investiga crimes inexplicáveis",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=450&fit=crop",
    category: "Suspense",
    rating: 4.2,
    year: 2023,
    duration: "1h 55min",
    cast: ["Ana Costa", "Pedro Lima", "Julia Mendes"],
    synopsis: "Um detetive brilhante precisa desvendar uma série de crimes que desafiam toda lógica. Cada pista leva a mais mistérios em uma trama cheia de reviravoltas.",
    genre: ["Suspense", "Mistério", "Crime"]
  },
  {
    id: 3,
    title: "Comédia do Verão",
    description: "Risadas garantidas nesta aventura hilária",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
    category: "Comédia",
    rating: 4.0,
    year: 2024,
    duration: "1h 40min",
    cast: ["Roberto Gomes", "Fernanda Souza", "Lucas Alves"],
    synopsis: "Um grupo de amigos decide fazer uma viagem de verão que se transforma em uma série de situações hilárias e inesquecíveis.",
    genre: ["Comédia", "Aventura"]
  },
  {
    id: 4,
    title: "Romance de Outono",
    description: "Uma história de amor inesquecível",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop",
    category: "Romance",
    rating: 4.7,
    year: 2023,
    duration: "2h 05min",
    cast: ["Isabella Martins", "Gabriel Rocha", "Sofia Dias"],
    synopsis: "Dois estranhos se encontram por acaso em uma pequena cidade e descobrem que o amor pode surgir nos momentos mais inesqurados.",
    genre: ["Romance", "Drama"]
  },
  {
    id: 5,
    title: "Terror na Floresta",
    description: "Prepare-se para uma experiência aterrorizante",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=450&fit=crop",
    category: "Terror",
    rating: 3.8,
    year: 2024,
    duration: "1h 30min",
    cast: ["Rafael Santos", "Camila Oliveira", "Bruno Costa"],
    synopsis: "Um grupo de amigos acampa em uma floresta isolada e descobre que não estão sozinhos. O terror se intensifica a cada minuto.",
    genre: ["Terror", "Suspense"]
  },
  {
    id: 6,
    title: "Documentário Natureza",
    description: "Explore as maravilhas do nosso planeta",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
    category: "Documentário",
    rating: 4.9,
    year: 2023,
    duration: "1h 50min",
    cast: ["Narrador: David Attenborough"],
    synopsis: "Uma jornada visual impressionante pelos ecossistemas mais incríveis da Terra, revelando a beleza e fragilidade da natureza.",
    genre: ["Documentário", "Natureza"]
  },
  {
    id: 7,
    title: "Corrida Mortal",
    description: "Velocidade e adrenalina em cada curva",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=450&fit=crop",
    category: "Ação",
    rating: 4.3,
    year: 2024,
    duration: "2h 00min",
    cast: ["Marcus Vieira", "Leticia Campos", "Diego Ferreira"],
    synopsis: "Um piloto talentoso precisa vencer a corrida mais perigosa do mundo para salvar sua família. Ação e emoção do início ao fim.",
    genre: ["Ação", "Suspense", "Corrida"]
  },
  {
    id: 8,
    title: "Enigma do Passado",
    description: "Segredos enterrados voltam à tona",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
    category: "Suspense",
    rating: 4.4,
    year: 2023,
    duration: "2h 10min",
    cast: ["Patricia Almeida", "Ricardo Nunes", "Amanda Silva"],
    synopsis: "Uma jornalista investiga um caso antigo e descobre uma conspiração que pode mudar tudo o que ela conhece sobre sua própria história.",
    genre: ["Suspense", "Mistério", "Drama"]
  },
  {
    id: 9,
    title: "Heróis da Galáxia",
    description: "A última esperança da humanidade",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=450&fit=crop",
    category: "Ação",
    rating: 4.6,
    year: 2024,
    duration: "2h 30min",
    cast: ["Chris Evans", "Scarlett Johnson", "Tom Hardy"],
    synopsis: "Quando alienígenas ameaçam destruir a Terra, um grupo improvável de heróis deve se unir para salvar o planeta.",
    genre: ["Ação", "Ficção Científica", "Aventura"]
  },
  {
    id: 10,
    title: "Amor em Paris",
    description: "Encontre o amor na cidade luz",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=450&fit=crop",
    category: "Romance",
    rating: 4.5,
    year: 2023,
    duration: "1h 50min",
    cast: ["Emma Stone", "Ryan Gosling", "Marion Cotillard"],
    synopsis: "Uma artista americana se muda para Paris e encontra o amor de forma inesperada enquanto persegue seus sonhos.",
    genre: ["Romance", "Drama", "Comédia"]
  },
  {
    id: 11,
    title: "Risadas Garantidas",
    description: "A comédia mais engraçada do ano",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&h=450&fit=crop",
    category: "Comédia",
    rating: 4.1,
    year: 2024,
    duration: "1h 35min",
    cast: ["Kevin Hart", "Tiffany Haddish", "Ice Cube"],
    synopsis: "Situações hilárias acontecem quando um grupo de amigos decide abrir um negócio juntos sem experiência alguma.",
    genre: ["Comédia"]
  },
  {
    id: 12,
    title: "A Mansão Assombrada",
    description: "Nem todos sobreviverão à noite",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&h=450&fit=crop",
    category: "Terror",
    rating: 4.0,
    year: 2024,
    duration: "1h 45min",
    cast: ["Vera Farmiga", "Patrick Wilson", "Madison Wolfe"],
    synopsis: "Uma família se muda para uma mansão antiga e logo descobre que ela esconde segredos sombrios e presenças sobrenaturais.",
    genre: ["Terror", "Sobrenatural"]
  }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [muted, setMuted] = useState(true);
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("streamflix-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Salvar favoritos no localStorage
  const toggleFavorite = (movieId: number) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];
    
    setFavorites(newFavorites);
    localStorage.setItem("streamflix-favorites", JSON.stringify(newFavorites));
  };

  // Categorias disponíveis
  const categories = ["Ação", "Suspense", "Comédia", "Romance", "Terror", "Documentário"];

  // Filme em destaque (primeiro da lista)
  const featuredMovie = moviesData[0];

  // Função para scroll horizontal
  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${category}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-10">
            <h1 className="text-[#E50914] text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              STREAMFLIX
            </h1>
            <div className="hidden lg:flex gap-6 text-sm">
              <button className="text-white hover:text-gray-300 transition-colors font-medium">
                Início
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Séries
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Filmes
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Bombando
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Minha Lista
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[85vh] sm:h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={featuredMovie.image} 
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="px-2 py-1 bg-[#E50914] text-white font-bold rounded">
                N
              </span>
              <span className="text-gray-300 uppercase tracking-wider font-semibold">
                Filme Original
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              {featuredMovie.title}
            </h2>
            
            <div className="flex items-center gap-4 text-sm sm:text-base">
              <span className="flex items-center gap-1 text-green-400 font-bold">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                {featuredMovie.rating}
              </span>
              <span className="text-gray-300">{featuredMovie.year}</span>
              <span className="px-2 py-0.5 border border-gray-500 text-gray-400 text-xs">
                {featuredMovie.category}
              </span>
              <span className="text-gray-400">{featuredMovie.duration}</span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {featuredMovie.synopsis}
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <button 
                onClick={() => setSelectedMovie(featuredMovie)}
                className="flex items-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-md font-bold text-base sm:text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                Assistir
              </button>
              <button 
                onClick={() => setSelectedMovie(featuredMovie)}
                className="flex items-center gap-2 sm:gap-3 bg-gray-500/70 backdrop-blur-sm text-white px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-md font-bold text-base sm:text-lg hover:bg-gray-500/90 transition-all shadow-xl"
              >
                <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                Mais Informações
              </button>
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-24 sm:bottom-32 right-4 sm:right-8 p-2 sm:p-3 border-2 border-gray-500 rounded-full hover:bg-gray-500/30 transition-all"
        >
          {muted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </section>

      {/* Movies Sections with Horizontal Scroll */}
      <section className="relative z-20 -mt-16 sm:-mt-24 lg:-mt-32 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
        {categories.map((category) => {
          const categoryMovies = moviesData.filter(movie => movie.category === category);
          
          return (
            <div key={category} className="space-y-3 sm:space-y-4">
              <div className="container mx-auto px-4 sm:px-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {category}
                </h3>
              </div>
              
              <div className="relative group">
                {/* Scroll Left Button */}
                <button
                  onClick={() => scroll(category, 'left')}
                  className="absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-r from-[#141414] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
                </button>

                {/* Movies Container */}
                <div
                  id={`scroll-${category}`}
                  className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoryMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => setSelectedMovie(movie)}
                      className="flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[23vw] lg:w-[18vw] xl:w-[15vw] group/card cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900 transform transition-all duration-300 group-hover/card:scale-110 group-hover/card:z-20 group-hover/card:shadow-2xl">
                        <img 
                          src={movie.image} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                            <h4 className="font-bold text-sm sm:text-base mb-2 line-clamp-1">
                              {movie.title}
                            </h4>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMovie(movie);
                                }}
                                className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-black fill-current" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(movie.id);
                                }}
                                className="p-1.5 sm:p-2 border-2 border-gray-400 rounded-full hover:border-white transition-colors"
                              >
                                {favorites.includes(movie.id) ? (
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1 text-green-400 font-semibold">
                                <Star className="w-3 h-3 fill-current" />
                                {movie.rating}
                              </span>
                              <span className="text-gray-400">{movie.year}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scroll Right Button */}
                <button
                  onClick={() => scroll(category, 'right')}
                  className="absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-l from-[#141414] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Minha Lista Section */}
        {favorites.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="container mx-auto px-4 sm:px-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Minha Lista
              </h3>
            </div>
            
            <div className="relative group">
              <div
                id="scroll-favorites"
                className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {moviesData
                  .filter(movie => favorites.includes(movie.id))
                  .map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => setSelectedMovie(movie)}
                      className="flex-shrink-0 w-[45vw] sm:w-[30vw] md:w-[23vw] lg:w-[18vw] xl:w-[15vw] group/card cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900 transform transition-all duration-300 group-hover/card:scale-110 group-hover/card:z-20 group-hover/card:shadow-2xl">
                        <img 
                          src={movie.image} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                            <h4 className="font-bold text-sm sm:text-base mb-2 line-clamp-1">
                              {movie.title}
                            </h4>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMovie(movie);
                                }}
                                className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-black fill-current" />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(movie.id);
                                }}
                                className="p-1.5 sm:p-2 border-2 border-white rounded-full hover:border-gray-300 transition-colors"
                              >
                                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1 text-green-400 font-semibold">
                                <Star className="w-3 h-3 fill-current" />
                                {movie.rating}
                              </span>
                              <span className="text-gray-400">{movie.year}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Modal de Detalhes */}
      {selectedMovie && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedMovie(null)}
        >
          <div 
            className="bg-[#181818] rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="relative aspect-video">
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#181818] hover:bg-gray-800 rounded-full p-2 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
                  {selectedMovie.title}
                </h2>
                
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button className="flex items-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-md font-bold text-base sm:text-lg hover:bg-gray-200 transition-all transform hover:scale-105">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    Assistir
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedMovie.id);
                    }}
                    className={`flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-md font-bold text-base sm:text-lg transition-all ${
                      favorites.includes(selectedMovie.id)
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-600/80 text-white hover:bg-gray-600"
                    }`}
                  >
                    {favorites.includes(selectedMovie.id) ? (
                      <>
                        <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                        Na Minha Lista
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                        Minha Lista
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
                <span className="flex items-center gap-1.5 text-green-400 font-bold text-lg">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  {selectedMovie.rating} / 5.0
                </span>
                <span className="text-white font-semibold">{selectedMovie.year}</span>
                <span className="text-gray-400">{selectedMovie.duration}</span>
                <span className="px-3 py-1 border-2 border-gray-600 rounded text-gray-300 text-xs sm:text-sm font-semibold">
                  {selectedMovie.category}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                <div className="md:col-span-2 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">Sinopse</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {selectedMovie.synopsis}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">Elenco</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.cast.map((actor, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Gêneros</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.genre.map((g, index) => (
                        <span 
                          key={index}
                          className="text-sm text-white"
                        >
                          {g}{index < selectedMovie.genre.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Classificação</h4>
                    <span className="px-3 py-1 border-2 border-gray-600 rounded text-white text-sm font-semibold inline-block">
                      16+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS para esconder scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
