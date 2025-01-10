import evolutions from './evolutions.json';

export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return ""; // Handle empty or null strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const entryRange = (limit, offset) => {
  return {
    limit: limit,
    offset: offset,
  };
};

export const getEvolutions = (name, depth = 1) => {
  let result = [];
  for (const evolution of evolutions) {
    if (evolution[name]) {
      const nextEvolutions = Object.keys(evolution[name]);
      result = result.concat(nextEvolutions.map(evo => ({ name: evo, depth })));
      nextEvolutions.forEach(nextEvolution => {
        result = result.concat(getEvolutions(nextEvolution, depth + 1));
      });
    }
  }
  return result;
};

export const Regions = {
  ALL: entryRange(-1, 0),
  KANTO: entryRange(151, 0),
  JOHTO: entryRange(100, 151),
  HOENN: entryRange(135, 251),
  SINNOH: entryRange(107, 386),
  UNOVA: entryRange(156, 493),
  KALOS: entryRange(72, 649),
  ALOLA: entryRange(88, 721),
  GALAR: entryRange(96, 809),
  PALDEA: entryRange(120, 905),
  MEGA: entryRange(58, 1057),
  ALOLA_form: entryRange(25, 1115),
  GALAR_form: entryRange(20, 1185),
  GMAX: entryRange(34, 1219),
  HISUI_form: entryRange(16, 1253)
};

// Map of type to background color
export const typeColors = {
  normal: "#aab09f",
  fire: "#ea7a3c",
  water: "#539ae2",
  electric: "#e5c531",
  grass: "#71c558",
  ice: "#70cbd4",
  fighting: "#cb5f48",
  poison: "#b468b7",
  ground: "#cc9f4f",
  flying: "#7da6de",
  psychic: "#e5709b",
  bug: "#94bc4a",
  rock: "#b2a061",
  ghost: "#846ab6",
  dragon: "#6a7baf",
  dark: "#736c75",
  steel: "#89a1b0",
  fairy: "#e397d1",
};


export const Starters = {
  bulbasaur: {"id": 1},
  charmander: {"id": 4},
  squirtle: {"id": 7},
  chikorita: {"id": 152},
  cyndaquil: {"id": 155},
  totodile: {"id": 158},
  treecko: {"id": 252},
  torchic: {"id": 255},
  mudkip: {"id": 258},
  turtwig: {"id": 387},
  chimchar: {"id": 390},
  piplup: {"id": 393},
  snivy: {"id": 495},
  tepig: {"id": 498},
  oshawott: {"id": 501},
  chespin: {"id": 650},
  fennekin: {"id": 653},
  froakie: {"id": 656},
  rowlet: {"id": 722},
  litten: {"id": 725},
  popplio: {"id": 728},
  grookey: {"id": 810},
  scorbunny: {"id": 813},
  sobble: {"id": 816},
  sprigatito: {"id": 906},
  fuecoco: {"id": 909},
  quaxly: {"id": 912},
}

export const StartersAndEvolutions = {
  bulbasaur: {"id": 1},
  ivysaur: {"id": 2},
  venusaur: {"id": 3},
  charmander: {"id": 4},
  charmeleon: {"id": 5},
  charizard: {"id": 6},
  squirtle: {"id": 7},
  wartortle: {"id": 8},
  blastoise: {"id": 9},
  chikorita: {"id": 152},
  bayleef: {"id": 153},
  meganium: {"id": 154},
  cyndaquil: {"id": 155},
  quilava: {"id": 156},
  typhlosion: {"id": 157},
  totodile: {"id": 158},
  croconaw: {"id": 159},
  feraligatr: {"id": 160},
  treecko: {"id": 252},
  grovyle: {"id": 253},
  sceptile: {"id": 254},
  torchic: {"id": 255},
  combusken: {"id": 256},
  blaziken: {"id": 257},
  mudkip: {"id": 258},
  marshtomp: {"id": 259},
  swampert: {"id": 260},
  turtwig: {"id": 387},
  grotle: {"id": 388},
  torterra: {"id": 389},
  chimchar: {"id": 390},
  monferno: {"id": 391},
  infernape: {"id": 392},
  piplup: {"id": 393},
  prinplup: {"id": 394},
  empoleon: {"id": 395},
  snivy: {"id": 495},
  servine: {"id": 496},
  serperior: {"id": 497},
  tepig: {"id": 498},
  pignite: {"id": 499},
  emboar: {"id": 500},
  oshawott: {"id": 501},
  dewott: {"id": 502},
  samurott: {"id": 503},
  chespin: {"id": 650},
  quilladin: {"id": 651},
  chesnaught: {"id": 652},
  fennekin: {"id": 653},
  braixen: {"id": 654},
  delphox: {"id": 655},
  froakie: {"id": 656},
  frogadier: {"id": 657},
  greninja: {"id": 658},
  rowlet: {"id": 722},
  dartrix: {"id": 723},
  decidueye: {"id": 724},
  litten: {"id": 725},
  torracat: {"id": 726},
  incineroar: {"id": 727},
  popplio: {"id": 728},
  brionne: {"id": 729},
  primarina: {"id": 730},
  grookey: {"id": 810},
  thwackey: {"id": 811},
  rillaboom: {"id": 812},
  scorbunny: {"id": 813},
  raboot: {"id": 814},
  cinderace: {"id": 815},
  sobble: {"id": 816},
  drizzile: {"id": 817},
  inteleon: {"id": 818},
  sprigatito: {"id": 906},
  floragato: {"id": 907},
  meowscarada: {"id": 908},
  fuecoco: {"id": 909},
  crocalor: {"id": 910},
  skeledirge: {"id": 911},
  quaxly: {"id": 912},
  quaxwell: {"id": 913},
  quaquaval: {"id": 914},
}

export const StartersLvl1 = {
  ivysaur: {"id": 2},
  charmeleon: {"id": 5},
  wartortle: {"id": 8},
  bayleef: {"id": 153},
  quilava: {"id": 156},
  croconaw: {"id": 159},
  grovyle: {"id": 253},
  combusken: {"id": 256},
  marshtomp: {"id": 259},
  grotle: {"id": 388},
  monferno: {"id": 391},
  prinplup: {"id": 394},
  servine: {"id": 496},
  pignite: {"id": 499},
  dewott: {"id": 502},
  quilladin: {"id": 651},
  braixen: {"id": 654},
  frogadier: {"id": 657},
  dartrix: {"id": 723},
  torracat: {"id": 726},
  brionne: {"id": 729},
  thwackey: {"id": 811},
  raboot: {"id": 814},
  drizzile: {"id": 817},
  floragato: {"id": 907},
  crocalor: {"id": 910},
  quaxwell: {"id": 913},
};

export const StartersLvl2 = {
  venusaur: {"id": 3},
  charizard: {"id": 6},
  blastoise: {"id": 9},
  meganium: {"id": 154},
  typhlosion: {"id": 157},
  feraligatr: {"id": 160},
  sceptile: {"id": 254},
  blaziken: {"id": 257},
  swampert: {"id": 260},
  torterra: {"id": 389},
  infernape: {"id": 392},
  empoleon: {"id": 395},
  serperior: {"id": 497},
  emboar: {"id": 500},
  samurott: {"id": 503},
  chesnaught: {"id": 652},
  delphox: {"id": 655},
  greninja: {"id": 658},
  decidueye: {"id": 724},
  incineroar: {"id": 727},
  primarina: {"id": 730},
  rillaboom: {"id": 812},
  cinderace: {"id": 815},
  inteleon: {"id": 818},
  meowscarada: {"id": 908},
  skeledirge: {"id": 911},
  quaquaval: {"id": 914},
};

export const PseudoLegendaries = {
  dragonite: {"id": 149},
  tyranitar: {"id": 248},
  salamence: {"id": 373},
  metagross: {"id": 376},
  garchomp: {"id": 445},
  hydreigon: {"id": 635},
  goodra: {"id": 706},
  "kommo-o": {"id": 784},
  dragapult: {"id": 887},
  baxcalibur: {"id": 998},
}

export const SubLegendaries = {
  articuno: {"id": 144},
  zapdos: {"id": 145},
  moltres: {"id": 146},
  raikou: {"id": 243},
  entei: {"id": 244},
  suicune: {"id": 245},
  regirock: {"id": 377},
  regice: {"id": 378},
  registeel: {"id": 379},
  latias: {"id": 380},
  latios: {"id": 381},
  uxie: {"id": 480},
  mesprit: {"id": 481},
  azelf: {"id": 482},
  heatran: {"id": 485},
  regigigas: {"id": 486},
  cresselia: {"id": 488},
  cobalion: {"id": 638},
  terrakion: {"id": 639},
  virizion: {"id": 640},
  tornadus: {"id": 641},
  thundurus: {"id": 642},
  landorus: {"id": 645},
  "type-null": {"id": 772},
  silvally: {"id": 773},
  "tapu-koko": {"id": 785},
  "tapu-lele": {"id": 786},
  "tapu-bulu": {"id": 787},
  "tapu-fini": {"id": 788},
  nihilego: {"id": 793},
  buzzwole: {"id": 794},
  pheromosa: {"id": 795},
  xurkitree: {"id": 796},
  celesteela: {"id": 797},
  kartana: {"id": 798},
  guzzlord: {"id": 799},
  poipole: {"id": 803},
  naganadel: {"id": 804},
  stakataka: {"id": 805},
  blacephalon: {"id": 806},
  kubfu: {"id": 891},
  urshifu: {"id": 892},
  regieleki: {"id": 894},
  regidrago: {"id": 895},
  glastrier: {"id": 896},
  spectrier: {"id": 897},
  enamorus: {"id": 905},
  "wo-chien": {"id": 1001},
  "chien-pao": {"id": 1002},
  "ting-lu": {"id": 1003},
  "chi-yu": {"id": 1004},
  okidogi: {"id": 1014},
  munkidori: {"id": 1015},
  fezandipiti: {"id": 1016},
  ogerpon: {"id": 1017},
};

export const Legendaries = {
  mewtwo: {"id": 150},
  lugia: {"id": 249},
  "ho-oh": {"id": 250},
  kyogre: {"id": 382},
  groudon: {"id": 383},
  rayquaza: {"id": 384},
  dialga: {"id": 483},
  palkia: {"id": 484},
  giratina: {"id": 487},
  reshiram: {"id": 643},
  zekrom: {"id": 644},
  kyurem: {"id": 646},
  xerneas: {"id": 716},
  yveltal: {"id": 717},
  zygarde: {"id": 718},
  cosmog: {"id": 789},
  cosmoem: {"id": 790},
  solgaleo: {"id": 791},
  lunala: {"id": 792},
  necrozma: {"id": 800},
  zacian: {"id": 888},
  zamazenta: {"id": 889},
  eternatus: {"id": 890},
  calyrex: {"id": 898},
  koraidon: {"id": 1007},
  miraidon: {"id": 1008},
  terapagos: {"id": 1024},
}

export const Mythical = {
  mew: {"id": 151},
  celebi: {"id": 251},
  jirachi: {"id": 385},
  deoxys: {"id": 386},
  phione: {"id": 489},
  manaphy: {"id": 490},
  darkrai: {"id": 491},
  shaymin: {"id": 492},
  arceus: {"id": 493},
  victini: {"id": 494},
  keldeo: {"id": 647},
  meloetta: {"id": 648},
  genesect: {"id": 649},
  diancie: {"id": 719},
  hoopa: {"id": 720},
  volcanion: {"id": 721},
  magearna: {"id": 801},
  marshadow: {"id": 802},
  zeraora: {"id": 807},
  meltan: {"id": 808},
  melmetal: {"id": 809},
  zarude: {"id": 893},
  pecharunt: {"id": 1025},
}