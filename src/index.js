// ES Module formatida main fayl - barcha ichki modullarni birlashtiradi
// Routerlarni import qilish
import clubRoutes from "./routes/club.routes.js"; // Club uchun routerlar
import tournamentRoutes from "./routes/tournament.routes.js"; // Tournament uchun routerlar
import teamRoutes from "./routes/team.routes.js"; // Team uchun routerlar
import playerRoutes from "./routes/player.routes.js"; // Player uchun routerlar
import matchRoutes from "./routes/match.routes.js"; // Match uchun routerlar
import tournamentGroupRoutes from "./routes/tournament_groups.routes.js"; // Tournament groups uchun routerlar

// Barcha routlarni jami qilish
const routes = {
  clubRoutes,
  tournamentRoutes,
  teamRoutes,
  playerRoutes,
  matchRoutes,
  tournamentGroupRoutes,
};

// Eksport qilish
export { routes };
