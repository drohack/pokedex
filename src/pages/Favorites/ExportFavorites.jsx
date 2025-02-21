import React from 'react';
import { useSelector } from 'react-redux';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './Favorites.module.css';
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";
import { capitalizeFirstLetter, getEvolutions, Starters, StartersLvl1, StartersLvl2, SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from "../../utils/index";
import { speciesConversionArray } from "../../utils/SpeciesConversion";
import { emeraldUniqueWildEncounters } from '../../utils/EmeraldUniqueWildEncounters';
import { emeraldUniqueIngameTrades, emeraldRequestedUniqueIngameTrades } from '../../utils/EmeraldUniqueIngameTrades';
import { fireRedUniqueWildEncounters } from '../../utils/FireRedUniqueWildEncounters';
import { fireRedUniqueIngameTrades, fireRedRequestedUniqueIngameTrades } from '../../utils/FireRedUniqueIngameTrades';

const baseEmeraldPath = '/pokedex/EmeraldExportFiles';
const baseFireRedPath = '/pokedex/FireRedExportFiles';

// Get the current time in local timezone (CST)
const currentDate = new Date();

// Convert to UTC by adjusting for local timezone offset
const localOffset = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
const localDate = new Date(currentDate.getTime() - localOffset);

// Declare global variables
let grassStarterSpecies;
let waterStarterSpecies;
let fireStarterSpecies;
let grassStarterLvl1Species;
let waterStarterLvl1Species;
let fireStarterLvl1Species;
let grassStarterLvl2Species;
let waterStarterLvl2Species;
let fireStarterLvl2Species;
let chosenStarterIds = [];

const removeLeadingSlash = (path) => {
    if (path.startsWith('/pokedex/')) {
        return path.replace(/^\/pokedex\//, '');
    }
    return path.replace(/^\/+/, '');
};

// Shuffle the unique wild encounters array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Function to get a random favorite Pokémon species
const getRandomSpecies = (pokemonList) => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return speciesConversionArray[pokemonList[randomIndex].name].species;
};

// Function to replace Pokémon for a specific type
const getRandomSpeciesForType = (pokemonList, type, favoritePokemon) => {
    // Get a list of favorite Pokémon of the specified type
    let pokemonTypeList = pokemonList.filter(pokemon => pokemon.types.some(typeObj => typeObj.type.name === type));

    // Get random pokemon matching the given type
    if (pokemonTypeList.length > 0) {
        const randomIndex = Math.floor(Math.random() * pokemonTypeList.length);
        const selectedPokemon = pokemonTypeList[randomIndex];
        return {
            species: speciesConversionArray[selectedPokemon.name].species,
            id: selectedPokemon.id
        };
    } else if (favoritePokemon.filter(pokemon => pokemon.types.some(typeObj => typeObj.type.name === type)).length > 0) {
        // If no starters of the type exists, get a random pokemon of the type
        pokemonTypeList = favoritePokemon.filter(pokemon => pokemon.types.some(typeObj => typeObj.type.name === type));
        const randomIndex = Math.floor(Math.random() * pokemonTypeList.length);
        const selectedPokemon = pokemonTypeList[randomIndex];
        return {
            species: speciesConversionArray[selectedPokemon.name].species,
            id: selectedPokemon.id
        };
    } else {
        // If none exists just grab a random favorite pokemon
        const randomIndex = Math.floor(Math.random() * favoritePokemon.length);
        const selectedPokemon = favoritePokemon[randomIndex];
        return {
            species: speciesConversionArray[selectedPokemon.name].species,
            id: selectedPokemon.id
        };
    }
};

const modifyAndZipEmeraldStarterText = async (zip, basePath, favoritePokemon) => {
    // Read the original starter_choose.c file (from public/ folder)
    let starter_choose_text = await fetch(basePath + '/src/starter_choose.c').then(response => response.text());

    // Get list of Base Favorite Pokemon, Lvl 1 evolutions, and Lvl 2 evolutions
    const starterIds = Object.values(Starters).map(starter => starter.id);
    const starterLvl1Ids = Object.values(StartersLvl1).map(starterLvl1 => starterLvl1.id);
    const starterLvl2Ids = Object.values(StartersLvl2).map(starterLvl2 => starterLvl2.id);
    const favoriteStarters = favoritePokemon.filter(pokemon => starterIds.includes(pokemon.id));
    const favoriteStartersLvl1 = favoritePokemon.filter(pokemon => starterLvl1Ids.includes(pokemon.id));
    const favoriteStartersLvl2 = favoritePokemon.filter(pokemon => starterLvl2Ids.includes(pokemon.id));

    grassStarterSpecies = getRandomSpeciesForType(favoriteStarters, "grass", favoritePokemon);
    waterStarterSpecies = getRandomSpeciesForType(favoriteStarters, "water", favoritePokemon);
    fireStarterSpecies = getRandomSpeciesForType(favoriteStarters, "fire", favoritePokemon);
    grassStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "grass", favoritePokemon);
    waterStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "water", favoritePokemon);
    fireStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "fire", favoritePokemon);
    grassStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "grass", favoritePokemon);
    waterStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "water", favoritePokemon);
    fireStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "fire", favoritePokemon);

    chosenStarterIds = [grassStarterSpecies.id, fireStarterSpecies.id, waterStarterSpecies.id, grassStarterLvl1Species.id, fireStarterLvl1Species.id, waterStarterLvl1Species.id, grassStarterLvl2Species.id, fireStarterLvl2Species.id, waterStarterLvl2Species.id];

    // Replace the default starters with a favorite starter
    starter_choose_text = starter_choose_text.replace("SPECIES_TREECKO", grassStarterSpecies.species);
    starter_choose_text = starter_choose_text.replace("SPECIES_TORCHIC", fireStarterSpecies.species);
    starter_choose_text = starter_choose_text.replace("SPECIES_MUDKIP", waterStarterSpecies.species);

    zip.file(removeLeadingSlash(basePath) + '/src/starter_choose.c', starter_choose_text, { date: localDate });
};

const modifyAndZipFireRedStarterText = async (zip, basePath, favoritePokemon) => {
    // Read the starter choose script in Professor Oaks Lab
    let starter_choose_text = await fetch(basePath + '/data/maps/PalletTown_ProfessorOaksLab/scripts.inc').then(response => response.text());
    // Read the starter message box script in Professor Oaks Lab
    let starter_message_text = await fetch(basePath + '/data/maps/PalletTown_ProfessorOaksLab/text.inc').then(response => response.text());
    // Read the Roaming file as the Roaming Legendary is based on your chosen starter
    let wild_pokemon_area_text = await fetch(basePath + '/src/wild_pokemon_area.c').then(response => response.text());
    let roamer_text = await fetch(basePath + '/src/roamer.c').then(response => response.text());
    // Read the field specials file to replace the starter pokemon
    let field_specials_text = await fetch(basePath + '/src/field_specials.c').then(response => response.text());

    // Get list of Base Favorite Pokemon, Lvl 1 evolutions, and Lvl 2 evolutions
    const starterIds = Object.values(Starters).map(starter => starter.id);
    const starterLvl1Ids = Object.values(StartersLvl1).map(starterLvl1 => starterLvl1.id);
    const starterLvl2Ids = Object.values(StartersLvl2).map(starterLvl2 => starterLvl2.id);
    const favoriteStarters = favoritePokemon.filter(pokemon => starterIds.includes(pokemon.id));
    const favoriteStartersLvl1 = favoritePokemon.filter(pokemon => starterLvl1Ids.includes(pokemon.id));
    const favoriteStartersLvl2 = favoritePokemon.filter(pokemon => starterLvl2Ids.includes(pokemon.id));

    grassStarterSpecies = getRandomSpeciesForType(favoriteStarters, "grass", favoritePokemon);
    waterStarterSpecies = getRandomSpeciesForType(favoriteStarters, "water", favoritePokemon);
    fireStarterSpecies = getRandomSpeciesForType(favoriteStarters, "fire", favoritePokemon);
    grassStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "grass", favoritePokemon);
    waterStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "water", favoritePokemon);
    fireStarterLvl1Species = getRandomSpeciesForType(favoriteStartersLvl1, "fire", favoritePokemon);
    grassStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "grass", favoritePokemon);
    waterStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "water", favoritePokemon);
    fireStarterLvl2Species = getRandomSpeciesForType(favoriteStartersLvl2, "fire", favoritePokemon);

    chosenStarterIds = [grassStarterSpecies.id, fireStarterSpecies.id, waterStarterSpecies.id, grassStarterLvl1Species.id, fireStarterLvl1Species.id, waterStarterLvl1Species.id, grassStarterLvl2Species.id, fireStarterLvl2Species.id, waterStarterLvl2Species.id];

    // Replace the default starter name with the favorite grass starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies.species);
    starter_message_text = starter_message_text.replace(/BULBASAUR/g, grassStarterSpecies.species.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies.species);
    roamer_text = roamer_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies.species);
    field_specials_text = field_specials_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies.species);
    let entei_pokemon_species_replacement = getRandomSpecies(favoritePokemon);
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_ENTEI/g, entei_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_ENTEI/g, entei_pokemon_species_replacement);

    // Replace the default starter name with the favorite fire starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies.species);
    starter_message_text = starter_message_text.replace(/CHARMANDER/g, fireStarterSpecies.species.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies.species);
    roamer_text = roamer_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies.species);
    field_specials_text = field_specials_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies.species);
    let suicune_pokemon_species_replacement = getRandomSpecies(favoritePokemon);
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_SUICUNE/g, suicune_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_SUICUNE/g, suicune_pokemon_species_replacement);

    // Replace the default starter name with the favorite water starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies.species);
    starter_message_text = starter_message_text.replace(/SQUIRTLE/g, waterStarterSpecies.species.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies.species);
    roamer_text = roamer_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies.species);
    field_specials_text = field_specials_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies.species);
    let raikou_pokemon_species_replacement = getRandomSpecies(favoritePokemon);
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_RAIKOU/g, raikou_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_RAIKOU/g, raikou_pokemon_species_replacement);

    zip.file(removeLeadingSlash(basePath) + '/data/maps/PalletTown_ProfessorOaksLab/scripts.inc', starter_choose_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/PalletTown_ProfessorOaksLab/text.inc', starter_message_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/wild_pokemon_area.c', wild_pokemon_area_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/roamer.c', roamer_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/field_specials.c', field_specials_text, { date: localDate });
};

const modifyAndZipWildEncountersText = async (zip, basePath, favoritePokemon, filteredFavorites, uniqueWildEncounters) => {
    // Read the original wild_encounters_text.json file (from public/ folder)
    let wild_encounters_text = await fetch(basePath + '/src/data/wild_encounters.json').then(response => response.text());

    // Shuffle the list of unique wild encounters
    shuffleArray(uniqueWildEncounters);

    // Replace unique wild encounters with favorite Pokémon species
    for (let i = 0; i < uniqueWildEncounters.length; i++) {
        if (i < filteredFavorites.length) {
            // Use a unique favorite Pokémon
            const favorite = filteredFavorites[i];
            const speciesEntry = speciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : getRandomSpecies(filteredFavorites);
            if (speciesName) {
                const regex = new RegExp(`"${uniqueWildEncounters[i]}"`, 'g');
                wild_encounters_text = wild_encounters_text.replace(regex, `"${speciesName}"`);
            }
        } else if (filteredFavorites.length > 0) {
            // Use a random filtered favorite Pokémon for remaining encounters
            const regex = new RegExp(`"${uniqueWildEncounters[i]}"`, 'g');
            wild_encounters_text = wild_encounters_text.replace(regex, `"${getRandomSpecies(filteredFavorites)}"`);
        } else {
            // Use a random favorite Pokémon for remaining encounters
            const regex = new RegExp(`"${uniqueWildEncounters[i]}"`, 'g');
            wild_encounters_text = wild_encounters_text.replace(regex, `"${getRandomSpecies(favoritePokemon)}"`);
        }
    }

    zip.file(removeLeadingSlash(basePath) + '/src/data/wild_encounters.json', wild_encounters_text, { date: localDate });
};

const modifyAndZipIngameTradesText = async (zip, path, favoritePokemon, filteredFavorites, uniqueIngameTrades, requestedUniqueIngameTrades, uniqueWildEncounters) => {
    // Read the original ingame_trades.json file (from public/ folder)
    let ingame_trades_text = await fetch(path).then(response => response.text());

    // Shuffle the list of unique ingame trades
    shuffleArray(uniqueIngameTrades);

    // Replace unique wild encounters with favorite Pokémon species
    for (let i = 0; i < uniqueIngameTrades.length; i++) {
        let j = i + uniqueWildEncounters.length; // Get the next unique pokemon after the wild encounters
        if (j < filteredFavorites.length) {
            // Use a unique favorite Pokémon
            const favorite = filteredFavorites[j];
            const speciesEntry = speciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : getRandomSpecies(filteredFavorites);
            if (speciesName) {
                const regex = new RegExp(`${uniqueIngameTrades[i]}`, 'g');
                ingame_trades_text = ingame_trades_text.replace(regex, `${speciesName}`);
            }
        } else if (filteredFavorites.length > 0) {
            // Use a random filtered favorite Pokémon for remaining encounters
            const regex = new RegExp(`${uniqueIngameTrades[i]}`, 'g');
            ingame_trades_text = ingame_trades_text.replace(regex, `${getRandomSpecies(filteredFavorites)}`);
        } else {
            // Use a random favorite Pokémon for remaining encounters
            const regex = new RegExp(`${uniqueIngameTrades[i]}`, 'g');
            ingame_trades_text = ingame_trades_text.replace(regex, `${getRandomSpecies(favoritePokemon)}`);
        }
    }

    // Shuffle the list of unique ingame trades
    shuffleArray(requestedUniqueIngameTrades);

    // Replace unique wild encounters with favorite Pokémon species
    for (let i = 0; i < requestedUniqueIngameTrades.length; i++) {
        uniqueWildEncounters.length; // Get the next unique pokemon after the wild encounters
        if (uniqueWildEncounters.length < filteredFavorites.length) {
            // Get a random filtered favorite Pokémon that you can find in the wild
            // get a random number between 0 and the length of the unique wild encounters
            const randomIndex = Math.floor(Math.random() * uniqueWildEncounters.length);
            const favorite = filteredFavorites[randomIndex];
            const speciesEntry = speciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : getRandomSpecies(filteredFavorites);
            if (speciesName) {
                const regex = new RegExp(`${requestedUniqueIngameTrades[i]}`, 'g');
                ingame_trades_text = ingame_trades_text.replace(regex, `${speciesName}`);
            }
        } else if (filteredFavorites.length > 0) {
            // Use a random filtered favorite Pokémon for remaining encounters
            const regex = new RegExp(`${requestedUniqueIngameTrades[i]}`, 'g');
            ingame_trades_text = ingame_trades_text.replace(regex, `${getRandomSpecies(filteredFavorites)}`);
        } else {
            // Use a random favorite Pokémon for remaining encounters
            const regex = new RegExp(`${requestedUniqueIngameTrades[i]}`, 'g');
            ingame_trades_text = ingame_trades_text.replace(regex, `${getRandomSpecies(favoritePokemon)}`);
        }
    }

    zip.file(removeLeadingSlash(path), ingame_trades_text, { date: localDate });
};

const modifyAndZipEmeraldOtherPokemonText = async (zip, basePath, favoritePokemon, filteredFavorites, startingId) => {
    // Read the different files (from public/ folder)
    let aquahideout_bf1_text = await fetch(basePath + '/data/maps/AquaHideout_B1F/scripts.inc').then(response => response.text());
    let battlefrontier_outsideeast_text = await fetch(basePath + '/data/maps/BattleFrontier_OutsideEast/scripts.inc').then(response => response.text());
    let lavaridgetown_text = await fetch(basePath + '/data/maps/LavaridgeTown/scripts.inc').then(response => response.text());
    let mossdeepcity_stevenshouse_text = await fetch(basePath + '/data/maps/MossdeepCity_StevensHouse/scripts.inc').then(response => response.text());
    let newmauville_inside = await fetch(basePath + '/data/maps/NewMauville_Inside/scripts.inc').then(response => response.text());
    let route199_weatherinstitue_2f_text = await fetch(basePath + '/data/maps/Route119_WeatherInstitute_2F/scripts.inc').then(response => response.text());
    let route120_text = await fetch(basePath + '/data/maps/Route120/scripts.inc').then(response => response.text());
    let rustborocity_devoncorp_2f_text = await fetch(basePath + '/data/maps/RustboroCity_DevonCorp_2F/scripts.inc').then(response => response.text());
    let battle_partners_text = await fetch(basePath + '/src/data/battle_partners.h').then(response => response.text());
    let contest_opponents_text = await fetch(basePath + '/src/data/contest_opponents.h').then(response => response.text());
    let lilycove_lady_text = await fetch(basePath + '/src/data/lilycove_lady.h').then(response => response.text());
    let bf_mons_text = await fetch(basePath + '/src/data/battle_frontier/battle_frontier_mons.h').then(response => response.text());
    let bp_lvl50_wild_mons_text = await fetch(basePath + '/src/data/battle_frontier/battle_pyramid_level_50_wild_mons.h').then(response => response.text());
    let bp_open_lvl_wild_mons_text = await fetch(basePath + '/src/data/battle_frontier/battle_pyramid_open_level_wild_mons.h').then(response => response.text());
    let bf_tent_text = await fetch(basePath + '/src/data/battle_frontier/battle_tent.h').then(response => response.text());
    let bf_trainer_hill_text = await fetch(basePath + '/src/data/battle_frontier/trainer_hill.h').then(response => response.text());

    // Replace unique wild encounters with favorite Pokémon species
    const getSpeciesWithOffset = (favoritePokemon, filteredFavorites, offset) => {
        if (offset < filteredFavorites.length) {
            // Use a unique favorite Pokémon
            const favorite = filteredFavorites[j];
            const speciesEntry = speciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : getRandomSpecies(filteredFavorites);
            return speciesName;
        } else if (filteredFavorites.length > 0) {
            // Use a random filtered favorite Pokémon for remaining encounters
            return getRandomSpecies(filteredFavorites);
        } else {
            // Use a random favorite Pokémon for remaining encounters
            return getRandomSpecies(favoritePokemon);
        }
    }

    aquahideout_bf1_text = aquahideout_bf1_text.replace(/SPECIES_ELECTRODE/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId));
    battlefrontier_outsideeast_text = battlefrontier_outsideeast_text.replace(/SPECIES_SUDOWOODO/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 1));
    lavaridgetown_text = lavaridgetown_text.replace(/SPECIES_WYNAUT/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 2));
    mossdeepcity_stevenshouse_text = mossdeepcity_stevenshouse_text.replace(/SPECIES_BELDUM/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 3));
    newmauville_inside = newmauville_inside.replace(/SPECIES_VOLTORB/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 4));
    route199_weatherinstitue_2f_text = route199_weatherinstitue_2f_text.replace(/SPECIES_CASTFORM_NORMAL/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 5));
    route120_text = route120_text.replace(/SPECIES_KECLEON/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 6));
    rustborocity_devoncorp_2f_text = rustborocity_devoncorp_2f_text.replace(/SPECIES_LILEEP/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 7));
    rustborocity_devoncorp_2f_text = rustborocity_devoncorp_2f_text.replace(/SPECIES_ANORITH/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 8));
    battle_partners_text = battle_partners_text.replace(/SPECIES_METANG/g, getRandomSpecies(favoritePokemon));
    battle_partners_text = battle_partners_text.replace(/SPECIES_SKARMORY/g, getRandomSpecies(favoritePokemon));
    battle_partners_text = battle_partners_text.replace(/SPECIES_AGGRON/g, getRandomSpecies(favoritePokemon));
    contest_opponents_text = contest_opponents_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    lilycove_lady_text = lilycove_lady_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    bf_mons_text = bf_mons_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    bp_lvl50_wild_mons_text = bp_lvl50_wild_mons_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    bp_open_lvl_wild_mons_text = bp_open_lvl_wild_mons_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    bf_tent_text = bf_tent_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));
    bf_trainer_hill_text = bf_trainer_hill_text.replace(/SPECIES[^,]+(?=,)/g, () => getRandomSpecies(favoritePokemon));

    // Write the modified text to the zip file
    zip.file(removeLeadingSlash(basePath) + '/data/maps/AquaHideout_B1F/scripts.inc', aquahideout_bf1_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/BattleFrontier_OutsideEast/scripts.inc', battlefrontier_outsideeast_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/LavaridgeTown/scripts.inc', lavaridgetown_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/MossdeepCity_StevensHouse/scripts.inc', mossdeepcity_stevenshouse_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/NewMauville_Inside/scripts.inc', newmauville_inside, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route119_WeatherInstitute_2F/scripts.inc', route199_weatherinstitue_2f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route120/scripts.inc', route120_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/RustboroCity_DevonCorp_2F/scripts.inc', rustborocity_devoncorp_2f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_partners.h', battle_partners_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/contest_opponents.h', contest_opponents_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/lilycove_lady.h', lilycove_lady_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_frontier/battle_frontier_mons.h', bf_mons_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_frontier/battle_pyramid_level_50_wild_mons.h', bp_lvl50_wild_mons_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_frontier/battle_pyramid_open_level_wild_mons.h', bp_open_lvl_wild_mons_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_frontier/battle_tent.h', bf_tent_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_frontier/trainer_hill.h', bf_trainer_hill_text, { date: localDate });
};

const modifyAndZipFireRedOtherPokemonText = async (zip, basePath, favoritePokemon, filteredFavorites, startingId) => {
    // Read the different files (from public/ folder)
    let celedon_condominiums_roofroom_text = await fetch(basePath + '/data/maps/CeladonCity_Condominiums_RoofRoom/scripts.inc').then(response => response.text());
    let celedon_gamecorner_prizeroom_text = await fetch(basePath + '/data/maps/CeladonCity_GameCorner_PrizeRoom/scripts.inc').then(response => response.text());
    let cinnabar_pokemonlab_experimentroom_text = await fetch(basePath + '/data/maps/CinnabarIsland_PokemonLab_ExperimentRoom/scripts.inc').then(response => response.text());
    let pokemontower_6f_text = await fetch(basePath + '/data/maps/PokemonTower_6F/scripts.inc').then(response => response.text());
    let powerplant_text = await fetch(basePath + '/data/maps/PowerPlant/scripts.inc').then(response => response.text());
    let route4_pokemoncenter_1f_script_text = await fetch(basePath + '/data/maps/Route4_PokemonCenter_1F/scripts.inc').then(response => response.text());
    let route4_pokemoncenter_1f_text = await fetch(basePath + '/data/maps/Route4_PokemonCenter_1F/text.inc').then(response => response.text());
    let route12_text = await fetch(basePath + '/data/maps/Route12/scripts.inc').then(response => response.text());
    let route12_fishinghouse_script_text = await fetch(basePath + '/data/maps/Route12_FishingHouse/scripts.inc').then(response => response.text());
    let route12_fishinghouse_text = await fetch(basePath + '/data/maps/Route12_FishingHouse/text.inc').then(response => response.text());
    let route16_text = await fetch(basePath + '/data/maps/Route16/scripts.inc').then(response => response.text());
    let route25_seacottage_text = await fetch(basePath + '/data/maps/Route25_SeaCottage/scripts.inc').then(response => response.text());
    let saffroncity_dojo_script_text = await fetch(basePath + '/data/maps/SaffronCity_Dojo/scripts.inc').then(response => response.text());
    let saffroncity_dojo_text = await fetch(basePath + '/data/maps/SaffronCity_Dojo/text.inc').then(response => response.text());
    let silphco_7f_script_text = await fetch(basePath + '/data/maps/SilphCo_7F/scripts.inc').then(response => response.text());
    let silphco_7f_text = await fetch(basePath + '/data/maps/SilphCo_7F/text.inc').then(response => response.text());
    let ssanne_2f_room1_text = await fetch(basePath + '/data/maps/SSAnne_2F_Room1/scripts.inc').then(response => response.text());
    let threeisland_berryforest_text = await fetch(basePath + '/data/maps/ThreeIsland_BerryForest/scripts.inc').then(response => response.text());
    let battle_setup_text = await fetch(basePath + '/src/battle_setup.c').then(response => response.text());

    // Replace unique wild encounters with favorite Pokémon species
    const getSpeciesWithOffset = (favoritePokemon, filteredFavorites, offset) => {
        if (offset < filteredFavorites.length) {
            // Use a unique favorite Pokémon
            const favorite = filteredFavorites[j];
            const speciesEntry = speciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : getRandomSpecies(filteredFavorites);
            return speciesName;
        } else if (filteredFavorites.length > 0) {
            // Use a random filtered favorite Pokémon for remaining encounters
            return getRandomSpecies(filteredFavorites);
        } else {
            // Use a random favorite Pokémon for remaining encounters
            return getRandomSpecies(favoritePokemon);
        }
    }

    celedon_condominiums_roofroom_text = celedon_condominiums_roofroom_text.replace(/SPECIES_EEVEE/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_ABRA/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 1));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_CLEFAIRY/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 2));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_DRATINI/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 3));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_PINSIR/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 4));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_SCYTHER/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 5));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_DRATINI/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 6));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_PORYGON/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 7));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_OMANYTE/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 8));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_KABUTO/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 9));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_AERODACTYL/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 10));
    pokemontower_6f_text = pokemontower_6f_text.replace(/SPECIES_MAROWAK/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 11));
    powerplant_text = powerplant_text.replace(/SPECIES_ELECTRODE/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 12));
    let route4_pokemon_species = getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 13);
    route4_pokemoncenter_1f_script_text = route4_pokemoncenter_1f_script_text.replace(/SPECIES_MAGIKARP/g, route4_pokemon_species);
    route4_pokemoncenter_1f_text = route4_pokemoncenter_1f_text.replace(/MAGIKARP/g, route4_pokemon_species.replace("SPECIES_", ""));
    route12_text = route12_text.replace(/SPECIES_SNORLAX/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 14));
    let rout12_pokemon_species = getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 15)
    route12_fishinghouse_script_text = route12_fishinghouse_script_text.replace(/SPECIES_MAGIKARP/g, rout12_pokemon_species);
    route12_fishinghouse_text = route12_fishinghouse_text.replace(/MAGIKARP/g, rout12_pokemon_species.replace("SPECIES_", ""));
    route16_text = route16_text.replace(/SPECIES_SNORLAX/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 16));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_EEVEE/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 17));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_FLAREON/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 18));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_JOLTEON/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 19));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_VAPOREON/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 20));
    let dojo_hitmonlee_species = getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 21);
    let dojo_hitmonchan_species = getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 22);
    saffroncity_dojo_script_text = saffroncity_dojo_script_text.replace(/SPECIES_HITMONLEE/g, dojo_hitmonlee_species);
    saffroncity_dojo_script_text = saffroncity_dojo_script_text.replace(/SPECIES_HITMONCHAN/g, dojo_hitmonchan_species);
    saffroncity_dojo_text = saffroncity_dojo_text.replace(/HITMONLEE/g, dojo_hitmonlee_species.replace("SPECIES_", ""));
    saffroncity_dojo_text = saffroncity_dojo_text.replace(/HITMONCHAN/g, dojo_hitmonchan_species.replace("SPECIES_", ""));
    let silphco_7f_pokemon_species = getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 23);
    silphco_7f_script_text = silphco_7f_script_text.replace(/SPECIES_LAPRAS/g, silphco_7f_pokemon_species);
    silphco_7f_text = silphco_7f_text.replace(/LAPRAS/g, silphco_7f_pokemon_species.replace("SPECIES_", ""));
    ssanne_2f_room1_text = ssanne_2f_room1_text.replace(/SPECIES_SNORLAX/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 24));
    threeisland_berryforest_text = threeisland_berryforest_text.replace(/SPECIES_HYPNO/g, getSpeciesWithOffset(favoritePokemon, filteredFavorites, startingId + 25));
    battle_setup_text = battle_setup_text.replace(/SPECIES_WEEDLE/g, getRandomSpecies(favoritePokemon));
    battle_setup_text = battle_setup_text.replace(/SPECIES_MAROWAK/g, getRandomSpecies(favoritePokemon));

    // Write the modified text to the zip file
    zip.file(removeLeadingSlash(basePath) + '/data/maps/CeladonCity_Condominiums_RoofRoom/scripts.inc', celedon_condominiums_roofroom_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/CeladonCity_GameCorner_PrizeRoom/scripts.inc', celedon_gamecorner_prizeroom_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/CinnabarIsland_PokemonLab_ExperimentRoom/scripts.inc', cinnabar_pokemonlab_experimentroom_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/PokemonTower_6F/scripts.inc', pokemontower_6f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/PowerPlant/scripts.inc', powerplant_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route4_PokemonCenter_1F/scripts.inc', route4_pokemoncenter_1f_script_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route4_PokemonCenter_1F/text.inc', route4_pokemoncenter_1f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route12/scripts.inc', route12_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route12_FishingHouse/scripts.inc', route12_fishinghouse_script_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route12_FishingHouse/text.inc', route12_fishinghouse_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route16/scripts.inc', route16_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/Route25_SeaCottage/scripts.inc', route25_seacottage_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SaffronCity_Dojo/scripts.inc', saffroncity_dojo_script_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SaffronCity_Dojo/text.inc', saffroncity_dojo_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SilphCo_7F/scripts.inc', silphco_7f_script_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SilphCo_7F/text.inc', silphco_7f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SSAnne_2F_Room1/scripts.inc', ssanne_2f_room1_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/ThreeIsland_BerryForest/scripts.inc', threeisland_berryforest_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/battle_setup.c', battle_setup_text, { date: localDate });
};

const modifyAndZipEmeraldLegendaries = async (zip, basePath, favoritePokemon) => {
    // Combine all legendary IDs
    const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
    const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
    const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
    const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];

    // Filter the list of favorite Pokémon to include only legendaries
    let favoriteLegendaries = [...favoritePokemon.filter(pokemon => allLegendaryIds.includes(pokemon.id))];
    shuffleArray(favoriteLegendaries);

    // You might need these later
    const pseudoLegendaryIds = Object.values(PseudoLegendaries).map(pseudoLegendary => pseudoLegendary.id);
    // Filter the list of favorite Pokémon to include only pseudo legendaries
    const favoritePseudoLegendaries = favoritePokemon.filter(pokemon => pseudoLegendaryIds.includes(pokemon.id));
    shuffleArray(favoritePseudoLegendaries);

    // Backup use Pseudo Legendaries if no Legendaries are selected, else use random favorite pokemon
    if (favoriteLegendaries.length === 0 && favoritePseudoLegendaries.length > 0) {
        favoriteLegendaries = [...favoritePseudoLegendaries];
        shuffleArray(favoriteLegendaries);
    } else if (favoriteLegendaries.length === 0 && favoritePseudoLegendaries.length === 0) {
        favoriteLegendaries = [...favoritePokemon];
        shuffleArray(favoriteLegendaries);
    }

    // There are 12 unique legendary encounters in Emerald, Fill them first with Favorite Legendaries
    // Fill the remaining encounters with pseudo legendaries and duplicate legendaries (or pair down legendaries if over)
    if (favoriteLegendaries.length < 12) {
        // Create duplicates of favorite legendaries
        const favoriteLegendariesCopy = favoriteLegendaries.slice();
        // Fill the remaining encounters with pseudo legendaries and duplicates
        if (favoriteLegendaries.length + favoritePseudoLegendaries.length <= 12 && favoritePseudoLegendaries.length > 0) {
            // Add pseudo legendaries to favoriteLegendaries
            favoriteLegendaries.push(...favoritePseudoLegendaries);
            // Continue adding random duplicates of favorite legendaries to favoriteLegendaries
            while (favoriteLegendaries.length < 12) {
                favoriteLegendaries.push(favoriteLegendariesCopy[Math.floor(Math.random() * favoriteLegendariesCopy.length)]);
            }
        } else if (favoritePseudoLegendaries.length > 0) {
            // Add pseudo legendaries one at a time to favoriteLegendaries till there's 12
            for (let i = 0; favoriteLegendaries.length < 12; i++) {
                favoriteLegendaries.push(favoritePseudoLegendaries[i]);
            }
        } else {
            // There are no pseudo legendaries so add random legendaries one at a time to favoriteLegendaries till there's 12
            for (let i = 0; favoriteLegendaries.length < 12; i++) {
                favoriteLegendaries.push(favoriteLegendaries[Math.floor(Math.random() * favoriteLegendaries.length)]);
            }
        }
    }

    const replaceLegendary = async (zip, path, replaceText, legendaryId, default_species) => {
        let script_text = await fetch(path).then(response => response.text());
        const conversionPokemon = speciesConversionArray[favoriteLegendaries[legendaryId].name];
        const favoriteSpecies = conversionPokemon ? conversionPokemon.species : default_species;
        const newText = replaceText.replace(default_species, favoriteSpecies);
        script_text = script_text.replace(replaceText, newText);
        zip.file(removeLeadingSlash(path), script_text, { date: localDate });
    };

    // Replace legendary encounters with favorite Legendaries
    await replaceLegendary(zip, basePath + '/data/maps/MarineCave_End/scripts.inc', "setwildbattle SPECIES_KYOGRE", 0, "SPECIES_KYOGRE");
    await replaceLegendary(zip, basePath + '/data/maps/TerraCave_End/scripts.inc', "setwildbattle SPECIES_GROUDON", 1, "SPECIES_GROUDON");
    await replaceLegendary(zip, basePath + '/data/maps/DesertRuins/scripts.inc', "setwildbattle SPECIES_REGIROCK", 2, "SPECIES_REGIROCK");
    await replaceLegendary(zip, basePath + '/data/maps/IslandCave/scripts.inc', "setwildbattle SPECIES_REGICE", 3, "SPECIES_REGICE");
    await replaceLegendary(zip, basePath + '/data/maps/AncientTomb/scripts.inc', "setwildbattle SPECIES_REGISTEEL", 4, "SPECIES_REGISTEEL");
    await replaceLegendary(zip, basePath + '/data/maps/SkyPillar_Top/scripts.inc', "setwildbattle SPECIES_RAYQUAZA", 5, "SPECIES_RAYQUAZA");
    // Latias and Latios
    const latiasReplacementPokemon = speciesConversionArray[favoriteLegendaries[6].name];
    const latiasReplacementSpecies = latiasReplacementPokemon ? latiasReplacementPokemon.species : "SPECIES_LATIAS";
    const latiosReplacementPokemon = speciesConversionArray[favoriteLegendaries[7].name];
    const latiosReplacementSpecies = latiosReplacementPokemon ? latiosReplacementPokemon.species : "SPECIES_LATIOS";
    // Set the roaming encounter for Latias and Latios
    let roamer_text = await fetch(basePath + '/src/roamer.c').then(response => response.text());
    roamer_text = roamer_text.replace("SPECIES_LATIAS", latiasReplacementSpecies);
    roamer_text = roamer_text.replace("SPECIES_LATIOS", latiosReplacementSpecies);
    zip.file(removeLeadingSlash(basePath) + '/src/roamer.c', roamer_text, { date: localDate });
    // Set static encounter for Latias and Latios
    let SouthernIsland_Interior_text = await fetch(basePath + '/data/maps/SouthernIsland_Interior/scripts.inc').then(response => response.text());
    SouthernIsland_Interior_text = SouthernIsland_Interior_text.replace("seteventmon SPECIES_LATIAS", "seteventmon " + latiasReplacementSpecies);
    SouthernIsland_Interior_text = SouthernIsland_Interior_text.replace("seteventmon SPECIES_LATIOS", "seteventmon " + latiosReplacementSpecies);
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SouthernIsland_Interior/scripts.inc', SouthernIsland_Interior_text, { date: localDate });
    // Set event legendary encounters with favorite Legendaries
    await replaceLegendary(zip, basePath + '/data/maps/FarawayIsland_Interior/scripts.inc', "seteventmon SPECIES_MEW", 8, "SPECIES_MEW");
    await replaceLegendary(zip, basePath + '/data/maps/NavelRock_Bottom/scripts.inc', "seteventmon SPECIES_LUGIA", 9, "SPECIES_LUGIA");
    await replaceLegendary(zip, basePath + '/data/maps/NavelRock_Top/scripts.inc', "seteventmon SPECIES_HO_OH", 10, "SPECIES_HO_OH");
    await replaceLegendary(zip, basePath + '/data/maps/BirthIsland_Exterior/scripts.inc', "seteventmon SPECIES_DEOXYS_NORMAL", 11, "SPECIES_DEOXYS_NORMAL");
};

const modifyAndZipFireRedLegendaries = async (zip, basePath, favoritePokemon) => {
    // Combine all legendary IDs
    const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
    const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
    const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
    const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];

    // Filter the list of favorite Pokémon to include only legendaries
    let favoriteLegendaries = [...favoritePokemon.filter(pokemon => allLegendaryIds.includes(pokemon.id))];
    shuffleArray(favoriteLegendaries);

    // You might need these later
    const pseudoLegendaryIds = Object.values(PseudoLegendaries).map(pseudoLegendary => pseudoLegendary.id);
    // Filter the list of favorite Pokémon to include only pseudo legendaries
    const favoritePseudoLegendaries = favoritePokemon.filter(pokemon => pseudoLegendaryIds.includes(pokemon.id));
    shuffleArray(favoritePseudoLegendaries);

    // Backup use Pseudo Legendaries if no Legendaries are selected, else use random favorite pokemon
    if (favoriteLegendaries.length === 0 && favoritePseudoLegendaries.length > 0) {
        favoriteLegendaries = [...favoritePseudoLegendaries];
        shuffleArray(favoriteLegendaries);
    } else if (favoriteLegendaries.length === 0 && favoritePseudoLegendaries.length === 0) {
        favoriteLegendaries = [...favoritePokemon];
        shuffleArray(favoriteLegendaries);
    }

    // There are 7 unique legendary encounters in FireRed, Fill them first with Favorite Legendaries
    // The 3 Legendary Dogs are set with the Starter Pokemon for FireRed as they are based on which type you choose
    // Fill the remaining encounters with pseudo legendaries and duplicate legendaries (or pair down legendaries if over)
    if (favoriteLegendaries.length < 7) {
        // Create duplicates of favorite legendaries
        const favoriteLegendariesCopy = favoriteLegendaries.slice();
        // Fill the remaining encounters with pseudo legendaries and duplicates
        if (favoriteLegendaries.length + favoritePseudoLegendaries.length <= 7 && favoritePseudoLegendaries.length > 0) {
            // Add pseudo legendaries to favoriteLegendaries
            favoriteLegendaries.push(...favoritePseudoLegendaries);
            // Continue adding random duplicates of favorite legendaries to favoriteLegendaries
            while (favoriteLegendaries.length < 7) {
                favoriteLegendaries.push(favoriteLegendariesCopy[Math.floor(Math.random() * favoriteLegendariesCopy.length)]);
            }
        } else if (favoritePseudoLegendaries.length > 0) {
            // Add pseudo legendaries one at a time to favoriteLegendaries till there's 12
            for (let i = 0; favoriteLegendaries.length < 7; i++) {
                favoriteLegendaries.push(favoritePseudoLegendaries[i]);
            }
        } else {
            // There are no pseudo legendaries so add random legendaries one at a time to favoriteLegendaries till there's 12
            while (favoriteLegendaries.length < 7) {
                favoriteLegendaries.push(favoriteLegendaries[Math.floor(Math.random() * favoriteLegendaries.length)]);
            }
        }
    }

    const replaceLegendary = async (zip, path, replaceText, legendaryId, default_species) => {
        let script_text = await fetch(path).then(response => response.text());
        const conversionPokemon = speciesConversionArray[favoriteLegendaries[legendaryId].name];
        const favoriteSpecies = conversionPokemon ? conversionPokemon.species : default_species;
        const newText = replaceText.replace(default_species, favoriteSpecies);
        script_text = script_text.replace(replaceText, newText);
        zip.file(removeLeadingSlash(path), script_text, { date: localDate });
    };

    // Replace legendary encounters with favorite Legendaries
    await replaceLegendary(zip, basePath + '/data/maps/SeafoamIslands_B4F/scripts.inc', "setwildbattle SPECIES_ARTICUNO", 0, "SPECIES_ARTICUNO");
    await replaceLegendary(zip, basePath + '/data/maps/PowerPlant/scripts.inc', "setwildbattle SPECIES_ZAPDOS", 1, "SPECIES_ZAPDOS");
    await replaceLegendary(zip, basePath + '/data/maps/MtEmber_Summit/scripts.inc', "setwildbattle SPECIES_MOLTRES", 2, "SPECIES_MOLTRES");
    await replaceLegendary(zip, basePath + '/data/maps/CeruleanCave_B1F/scripts.inc', "setwildbattle SPECIES_MEWTWO", 3, "SPECIES_MEWTWO");
    await replaceLegendary(zip, basePath + '/data/maps/NavelRock_Base/scripts.inc', "seteventmon SPECIES_LUGIA", 4, "SPECIES_LUGIA");
    await replaceLegendary(zip, basePath + '/data/maps/NavelRock_Summit/scripts.inc', "seteventmon SPECIES_HO_OH", 5, "SPECIES_HO_OH");
    await replaceLegendary(zip, basePath + '/data/maps/BirthIsland_Exterior/scripts.inc', "seteventmon SPECIES_DEOXYS", 6, "SPECIES_DEOXYS");
};

async function modifyAndZipEvolutions(zip, basePath, favoritePokemon) {
    let gen_1_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_1_families.h').then(response => response.text());
    let gen_2_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_2_families.h').then(response => response.text());
    let gen_3_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_3_families.h').then(response => response.text());
    let gen_4_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_4_families.h').then(response => response.text());
    let gen_5_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_5_families.h').then(response => response.text());
    let gen_6_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_6_families.h').then(response => response.text());
    let gen_7_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_7_families.h').then(response => response.text());
    let gen_8_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_8_families.h').then(response => response.text());
    let gen_9_families_text = await fetch(basePath + '/src/data/pokemon/species_info/gen_9_families.h').then(response => response.text());

    let familiesTexts = [
        { text: gen_1_families_text, path: basePath + '/src/data/pokemon/species_info/gen_1_families.h' },
        { text: gen_2_families_text, path: basePath + '/src/data/pokemon/species_info/gen_2_families.h' },
        { text: gen_3_families_text, path: basePath + '/src/data/pokemon/species_info/gen_3_families.h' },
        { text: gen_4_families_text, path: basePath + '/src/data/pokemon/species_info/gen_4_families.h' },
        { text: gen_5_families_text, path: basePath + '/src/data/pokemon/species_info/gen_5_families.h' },
        { text: gen_6_families_text, path: basePath + '/src/data/pokemon/species_info/gen_6_families.h' },
        { text: gen_7_families_text, path: basePath + '/src/data/pokemon/species_info/gen_7_families.h' },
        { text: gen_8_families_text, path: basePath + '/src/data/pokemon/species_info/gen_8_families.h' },
        { text: gen_9_families_text, path: basePath + '/src/data/pokemon/species_info/gen_9_families.h' },
    ];

    async function modifySpeciesEvolutions(targetSpecies, newEvolutionSpecies) {
        const speciesBlockRegex = new RegExp(`\\[${targetSpecies}\\][\\s\\S]*?\\.evolutions\\s*=\\s*EVOLUTION\\(([^)]*)\\),`, 'm');
        const speciesRegex = /SPECIES_\w+/g;

        for (let family of familiesTexts) {
            if (speciesBlockRegex.test(family.text)) {
                family.text = family.text.replace(speciesBlockRegex, (match, p1) => {
                    const newEvolutions = p1.replace(speciesRegex, newEvolutionSpecies);
                    return match.replace(p1, newEvolutions);
                });
                break;
            }
        }
    }

    async function removeSpeciesEvolutions(targetSpecies, whitelist = []) {
        const speciesBlockRegex = new RegExp(`\\[${targetSpecies}\\][\\s\\S]*?\\.evolutions\\s*=\\s*EVOLUTION\\(([^)]*)\\),`, 'm');

        for (let family of familiesTexts) {
            if (speciesBlockRegex.test(family.text)) {
                family.text = family.text.replace(speciesBlockRegex, (match, p1) => {
                    if (whitelist.length === 0) {
                        match = match.replace(/\.evolutions\s*=\s*EVOLUTION\(([\s\S]*?)\}\),?/, '');
                    } else {
                        const evolutions = p1.split('},').map((evo, index, array) => {
                            if (index === array.length - 1) {
                                return evo.trim(); // Do not add '}' to the last item
                            }
                            return evo.trim() + '}';
                        });
                        const filteredEvolutions = evolutions.filter(evo => {
                            return whitelist.some(species => {
                                // Extract the species part from the evolution string
                                const speciesMatch = evo.match(/SPECIES_\w+/);
                                return speciesMatch && speciesMatch[0] === species;
                            });
                        });
                        if (filteredEvolutions.length > 0) {
                            match = match.replace(p1, filteredEvolutions.join(', '));
                        } else {
                            match = match.replace(/\.evolutions\s*=\s*EVOLUTION\(([\s\S]*?)\}\),?/, '');
                        }
                    }
                    return match;
                });
                break;
            }
        }
    }

    function getEvolutionsText(speciesName) {
        // Regex to match `[SPECIES_NAME]` and the `.evolutions = EVOLUTION(...)` part
        const speciesPattern = new RegExp(`\\[${speciesName}\\][\\s\\S]*?\\.evolutions\\s*=\\s*EVOLUTION\\(([^)]*\\))`, 'm');

        for (let family of familiesTexts) {
            const match = speciesPattern.exec(family.text);
            if (match) {
                // Extract the full `.evolutions = EVOLUTION(...)` string
                const startIndex = match[0].indexOf('.evolutions');
                let evolutionsBlock = match[0].substring(startIndex).trim();

                // Append a comma if it isn't already present
                if (!evolutionsBlock.endsWith(',')) {
                    evolutionsBlock += ',';
                }

                return evolutionsBlock;
            }
        }

        return null; // Return null if no match is found
    }

    const replaceEvolutionsText = (targetSpecies, newEvolutionsText) => {
        // Regex to match `[SPECIES_NAME]` and the `.evolutions = EVOLUTION(...)` part
        const speciesRegex = new RegExp(`\\[${targetSpecies}\\][\\s\\S]*?\\.evolutions\\s*=\\s*EVOLUTION\\(([^)]*)\\),`, 'm');

        for (let family of familiesTexts) {
            const match = family.text.match(speciesRegex);

            if (match) {
                // Replace the old evolutions block with the new one, making sure to add only one closing parenthesis
                family.text = family.text.replace(speciesRegex, `${match[0].substring(0, match[0].indexOf('.evolutions'))}${newEvolutionsText}`);
                return true; // Indicate that the replacement was successful
            }
        }

        return false; // Indicate that the target species was not found
    };


    // Modify all Starter evolutions with your Favorites
    modifySpeciesEvolutions(grassStarterSpecies.species, grassStarterLvl1Species.species);
    modifySpeciesEvolutions(grassStarterLvl1Species.species, grassStarterLvl2Species.species);
    modifySpeciesEvolutions(waterStarterSpecies.species, waterStarterLvl1Species.species);
    modifySpeciesEvolutions(waterStarterLvl1Species.species, waterStarterLvl2Species.species);
    modifySpeciesEvolutions(fireStarterSpecies.species, fireStarterLvl1Species.species);
    modifySpeciesEvolutions(fireStarterLvl1Species.species, fireStarterLvl2Species.species);

    // Filter out the chosen starter Pokémon from the favorites list
    const nonStarterFavorites = favoritePokemon.filter(pokemon => !chosenStarterIds.includes(pokemon.id));

    // Loop through all nonStarterFavorites and modify their evolutions
    for (let favorite of nonStarterFavorites) {
        const evolutionChain = getEvolutions(favorite.name);
        // If favorite is "wurmple" or "goomy" they are exceptions, they are the only 3 stage evolutions with a split at stage 2...
        if (favorite.name === "wurmple" || favorite.name === "goomy") {
            if (favorite.name === "wurmple") {
                const silcoonInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "silcoon");
                const beautiflyInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "beautifly");
                const cascoonInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "cascoon");
                const dustoxInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "dustox");
                // check if "silcoon" is in the favorite list, but not "cascoon" and vice versa
                if (silcoonInFavorites && !cascoonInFavorites) {
                    // check if "dustox" is in the favorite list, if it is then modify cascoon to dustox, else remove cascoon
                    if (dustoxInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["wurmple"].species, ".evolutions = EVOLUTION({EVO_LEVEL_SILCOON, 7, SPECIES_SILCOON},{EVO_LEVEL_CASCOON, 7, SPECIES_DUSTOX}),");
                    } else {
                        removeSpeciesEvolutions(speciesConversionArray["wurmple"].species, [speciesConversionArray["silcoon"].species]);
                    }
                } else if (!silcoonInFavorites && cascoonInFavorites) {
                    // check if "beautifly" is in the favorite list, if it is then modify silcoon to beautifly, else remove silcoon
                    if (beautiflyInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["wurmple"].species, ".evolutions = EVOLUTION({EVO_LEVEL_SILCOON, 7, SPECIES_BEAUTIFLY},{EVO_LEVEL_CASCOON, 7, SPECIES_CASCOON}),");
                    } else {
                        removeSpeciesEvolutions(speciesConversionArray["wurmple"].species, [speciesConversionArray["cascoon"].species]);
                    }
                } else if (!silcoonInFavorites && !cascoonInFavorites) {
                    if (beautiflyInFavorites && dustoxInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["wurmple"].species, ".evolutions = EVOLUTION({EVO_LEVEL_SILCOON, 7, SPECIES_BEAUTIFLY},{EVO_LEVEL_CASCOON, 7, SPECIES_DUSTOX}),");
                    } else if (beautiflyInFavorites) {
                        // Remove "cascoon" and modify "silcoon" to "beautifly"
                        replaceEvolutionsText(speciesConversionArray["wurmple"].species, ".evolutions = EVOLUTION({EVO_LEVEL_SILCOON, 7, SPECIES_BEAUTIFLY}),");
                    } else if (dustoxInFavorites) {
                        // Remove "silcoon" and modify "cascoon" to "dustox"
                        replaceEvolutionsText(speciesConversionArray["wurmple"].species, ".evolutions = EVOLUTION({EVO_LEVEL_CASCOON, 7, SPECIES_DUSTOX}),");
                    } else {
                        // Remove all evolutions from wurmple
                        removeSpeciesEvolutions(speciesConversionArray["wurmple"].species);
                    }
                }
            } else if (favorite.name === "goomy") {
                const sliggooInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "sliggoo");
                const goodraInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "goodra");
                const sliggooHisuiInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "sliggoo-hisui");
                const goodraHisuiInFavorites = nonStarterFavorites.some(pokemon => pokemon.name === "goodra-hisui");
                // check if "sliggoo" is in the favorite list, but not "sliggoo-hisui" and vice versa
                if (sliggooInFavorites && !sliggooHisuiInFavorites) {
                    // check if "goodra-hisui" is in the favorite list, if it is then modify sliggoo-hisui to goodra-hisui, else remove sliggoo-hisui
                    if (goodraHisuiInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["goomy"].species, ".evolutions = EVOLUTION({EVO_LEVEL, 40, SPECIES_SLIGGOO},{EVO_NONE, 0, SPECIES_GOODRA_HISUI}),");
                    } else {
                        removeSpeciesEvolutions(speciesConversionArray["goomy"].species, [speciesConversionArray["sliggoo"].species]);
                    }
                } else if (!sliggooInFavorites && sliggooHisuiInFavorites) {
                    // check if "goodra" is in the favorite list, if it is then modify sliggoo to goodra, else remove sliggoo
                    if (goodraInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["goomy"].species, ".evolutions = EVOLUTION({EVO_LEVEL, 40, SPECIES_GOODRA},{EVO_NONE, 0, SPECIES_SLIGGOO_HISUI}),");
                    } else {
                        removeSpeciesEvolutions(speciesConversionArray["goomy"].species, [speciesConversionArray["sliggoo-hisui"].species]);
                    }
                } else if (!sliggooInFavorites && !sliggooHisuiInFavorites) {
                    if (goodraInFavorites && goodraHisuiInFavorites) {
                        replaceEvolutionsText(speciesConversionArray["goomy"].species, ".evolutions = EVOLUTION({EVO_LEVEL, 40, SPECIES_GOODRA},{EVO_NONE, 0, SPECIES_GOODRA_HISUI}),");
                    } else if (goodraInFavorites) {
                        // Remove "sliggoo-hisui" and modify "sliggoo" to "goodra"
                        replaceEvolutionsText(speciesConversionArray["goomy"].species, ".evolutions = EVOLUTION({EVO_LEVEL, 40, SPECIES_GOODRA}),");
                    } else if (goodraHisuiInFavorites) {
                        // Remove "sliggoo" and modify "sliggoo-hisui" to "goodra-hisui"
                        replaceEvolutionsText(speciesConversionArray["goomy"].species, ".evolutions = EVOLUTION({EVO_NONE, 0, SPECIES_GOODRA_HISUI}),");
                    } else {
                        // Remove all evolutions from goomy
                        removeSpeciesEvolutions(speciesConversionArray["goomy"].species);
                    }
                }
            }
            continue;
        }
        // If there's no evolution there's nothing to modify
        if (evolutionChain.length === 0) {
            continue;
        }
        // Loop through all of the evolutions in the chain and check if they are in the favorite list
        let evolutionsToModify = [];
        for (let evolution of evolutionChain) {
            if (nonStarterFavorites.some(pokemon => pokemon.name === evolution.name)) {
                evolutionsToModify.push(evolution);
            }
        }
        // If there are no evolutions in the favorite list then remove all evolutions
        if (evolutionsToModify.length === 0) {
            removeSpeciesEvolutions(speciesConversionArray[favorite.name].species);
            continue;
        }
        // Loop through evolutionsToModify and create a list of level depth 1 evolutions if any exists then remove all other evolutions
        let evolutionsLvl1ToKeep = [];
        for (let evolution of evolutionsToModify) {
            if (evolution.depth === 1) {
                evolutionsLvl1ToKeep.push(evolution.name);
            }
        }
        let totalEvolutionLvl1s = [];
        for (let evolution of evolutionChain) {
            if (evolution.depth === 1) {
                totalEvolutionLvl1s.push(evolution.name);
            }
        }
        if (evolutionsLvl1ToKeep.length > 0) {
            if (evolutionsLvl1ToKeep.length === totalEvolutionLvl1s.length) {
                continue;
            } else {
                // create a new array of evolutionsLvl1ToKeep but with their species names
                evolutionsLvl1ToKeep = evolutionsLvl1ToKeep.map(evo => speciesConversionArray[evo].species);
                removeSpeciesEvolutions(speciesConversionArray[favorite.name].species, evolutionsLvl1ToKeep);
                continue;
            }
        }
        // There are no level 1 evolutions, but there are higher tier evolutions, modify the existing one for the next level up
        // If there's only 1 higher evolution than just modify it
        // Else if there's multiple, check to see if there's a single next higher evolution and modify it
        // Else there's a branching evolution, add all branching evolutions to the evolution
        if (evolutionsToModify.length === 1) {
            modifySpeciesEvolutions(speciesConversionArray[favorite.name].species, speciesConversionArray[evolutionsToModify[0].name].species);
        } else {
            // Get the single next evolution, if there's multiple set nextEvolution to null
            let nextEvolution = null;
            for (let evolution of evolutionsToModify) {
                if (evolution.depth === 2) {
                    if (nextEvolution === null) {
                        nextEvolution = evolution;
                    } else {
                        nextEvolution = null;
                        break;
                    }
                }
            }
            // If there's a single next evolution modify the species to that evolution
            // Else there are branching evolutions, modify the evolution to use the branching logic
            if (nextEvolution !== null) {
                modifySpeciesEvolutions(speciesConversionArray[favorite.name].species, speciesConversionArray[nextEvolution.name].species);
            } else {
                // Find total number of max depth evolutions from evolutionChain
                let totalMaxDepthEvolutions = [];
                let maxDepth = 0;

                // Determine the maximum depth
                for (let evolution of evolutionChain) {
                    if (evolution.depth > maxDepth) {
                        maxDepth = evolution.depth;
                    }
                }

                // Filter evolutions that have the maximum depth
                for (let evolution of evolutionChain) {
                    if (evolution.depth === maxDepth) {
                        totalMaxDepthEvolutions.push(evolution.name);
                    }
                }

                // Get the 2nd to last evolution in the chain depth wise
                let secondToLastEvolution = null;
                for (let evolution of evolutionChain) {
                    if (evolution.depth === maxDepth - 1) {
                        secondToLastEvolution = evolution.name;
                        break;
                    }
                }

                // SHOULD NOT GET HERE If secondToLastEvolution is null then there's no branching evolution to modify
                if (secondToLastEvolution === null) {
                    continue;
                }

                // Get the evolution script for the second to last evolution
                const secondToLastEvolutionText = getEvolutionsText(speciesConversionArray[secondToLastEvolution].species);

                // If the total number of max depth evolutions is equal to the total number of evolutions to modify then replace all evolutions with the new one
                if (totalMaxDepthEvolutions.length === evolutionsToModify.length) {
                    replaceEvolutionsText(speciesConversionArray[favorite.name].species, secondToLastEvolutionText);
                    continue;
                } else {
                    // SHOULD NOT GET HERE
                    console.error("There's more than 1 branching evolution, but less than the max.")
                }
            }
        }
    }

    // Zip up the modified evolution files
    for (let family of familiesTexts) {
        zip.file(removeLeadingSlash(family.path), family.text, { date: localDate });
    }
}

const createAndZipEmeraldTrainers = async (zip, basePath, favoritePokemon) => {
    // Function to replace Pokémon for a specific type
    const replacePokemonForType = async (filePath, type) => {
        // Get a list of favorite Pokémon of the specified type
        let favoriteTypePokemon = favoritePokemon.filter(pokemon => pokemon.types.some(typeObj => typeObj.type.name === type));
        // If none exists just grab a random favorite pokemon
        if (favoriteTypePokemon.length === 0) {
            favoriteTypePokemon = favoritePokemon;
        }
        let fileText = await fetch(basePath + filePath).then(response => response.text());
        fileText = fileText.replace(/SPECIES_\w+/g, () => getRandomSpecies(favoriteTypePokemon));
        return fileText;
    };

    // Replace each instance of SPECIES_xxx with a random favorite Pokémon species
    let trainers_text = await fetch(basePath + '/src/data/trainers.h').then(response => response.text());
    trainers_text = trainers_text.replace(/SPECIES_\w+/g, () => getRandomSpecies(favoritePokemon));

    // Replace Pokémon for each gym leader and elite four member based on their type and append to trainers_text
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_roxanne_rock.h', 'rock');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_brawly_fighting.h', 'fighting');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_watson_electric.h', 'electric');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_flannery_fire.h', 'fire');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_norman_normal.h', 'normal');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_winona_flying.h', 'flying');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_tate_and_liza_psychic.h', 'psychic');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_juan_water.h', 'water');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_sidney_dark.h', 'dark');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_phoebe_ghost.h', 'ghost');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_glacia_ice.h', 'ice');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_drake_dragon.h', 'dragon');


    // Add the modified trainers_text to the zip file
    zip.file(removeLeadingSlash(basePath) + '/src/data/trainers.h', trainers_text, { date: localDate });
};

const createAndZipFireRedTrainers = async (zip, basePath, favoritePokemon) => {
    // Function to replace Pokémon for a specific type
    const replacePokemonForType = async (filePath, type) => {
        // Get a list of favorite Pokémon of the specified type
        let favoriteTypePokemon = favoritePokemon.filter(pokemon => pokemon.types.some(typeObj => typeObj.type.name === type));
        // If none exists just grab a random favorite pokemon
        if (favoriteTypePokemon.length === 0) {
            favoriteTypePokemon = favoritePokemon;
        }
        let fileText = await fetch(basePath + filePath).then(response => response.text());
        fileText = fileText.replace(/SPECIES_\w+/g, () => getRandomSpecies(favoriteTypePokemon));
        return fileText;
    };

    // Replace the Rival's Pokémon with the opposite starter type and a random favorite Pokémon
    const replacePokemonForRival = async (filePath, speciesToReplace, replacementSpecies) => {
        // Fetch the file text
        let fileText = await fetch(basePath + filePath).then(response => response.text());

        // Replace the species
        fileText = fileText.replace(/SPECIES_\w+/g, (match) => {
            if (match === speciesToReplace) {
                return replacementSpecies;
            } else {
                return getRandomSpecies(favoritePokemon);
            }
        });

        return fileText;
    };

    // Replace each instance of SPECIES_xxx with a random favorite Pokémon species
    let trainers_text = await fetch(basePath + '/src/data/trainers.h').then(response => response.text());
    trainers_text = trainers_text.replace(/SPECIES_\w+/g, () => getRandomSpecies(favoritePokemon));

    // Replace Pokémon for each gym leader and elite four member based on their type and append to trainers_text
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_brock_rock.h', 'rock');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_misty_water.h', 'water');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_lt_surge_electric.h', 'electric');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_erika_grass.h', 'grass');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_koga_poison.h', 'poison');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_sabrina_psychic.h', 'psychic');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_blaine_fire.h', 'fire');
    trainers_text += '\n' + await replacePokemonForType('/src/data/gym_leader_giovanni_ground.h', 'ground');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_lorelei_ice.h', 'ice');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_bruno_fighting.h', 'fighting');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_agatha_ghost.h', 'ghost');
    trainers_text += '\n' + await replacePokemonForType('/src/data/elite_4_lance_dragon.h', 'dragon');

    // Replace Rival's pokemon with opposite starter type and random other favorite pokemon
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_fire_stage1.h', 'SPECIES_CHARMANDER', fireStarterSpecies.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_fire_stage2.h', 'SPECIES_CHARMELEON', fireStarterLvl1Species.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_fire_stage3.h', 'SPECIES_CHARIZARD', fireStarterLvl2Species.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_grass_stage1.h', 'SPECIES_BULBASAUR', grassStarterSpecies.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_grass_stage2.h', 'SPECIES_IVYSAUR', grassStarterLvl1Species.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_grass_stage3.h', 'SPECIES_VENUSAUR', grassStarterLvl2Species.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_water_stage1.h', 'SPECIES_SQUIRTLE', waterStarterSpecies.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_water_stage2.h', 'SPECIES_WARTORTLE', waterStarterLvl1Species.species);
    trainers_text += '\n' + await replacePokemonForRival('/src/data/rival_water_stage3.h', 'SPECIES_BLASTOISE', waterStarterLvl2Species.species);

    // Add the modified trainers_text to the zip file
    zip.file(removeLeadingSlash(basePath) + '/src/data/trainers.h', trainers_text, { date: localDate });
};


export const ExportFavorites = () => {
    const favoritePokemon = useSelector(getFavoritePokemon);

    const handleExportList = () => {
        if (favoritePokemon.length === 0) {
            alert('Please add some favorite Pokémon before exporting the text file.');
            return;
        }
        console.log(favoritePokemon);
        // Create a string with each favorite Pokémon on a new line
        const favoriteList = favoritePokemon.map(pokemon => `${capitalizeFirstLetter(pokemon.name)}`).join('\n');

        // Create a Blob from the string
        const blob = new Blob([favoriteList], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'favorite_pokemon.txt';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleExportEmeraldROM = async () => {
        if (favoritePokemon.length === 0) {
            alert('Please add some favorite Pokémon before exporting the ROM.');
            return;
        }

        // Combine all IDs to be excluded
        const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
        const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
        const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
        const exclusionIds = [...chosenStarterIds, ...subLegendaryIds, ...legendaryIds, ...mythicalIds];

        // Filter out the excluded Pokémon from the favorites list
        const filteredFavorites = favoritePokemon.filter(pokemon => !exclusionIds.includes(pokemon.id));
        shuffleArray(filteredFavorites);

        const zip = new JSZip();

        // Add the README file to the zip
        const readme_text = await fetch('/pokedex/EmeraldExportREADME.txt').then(response => response.text());
        zip.file(removeLeadingSlash('/pokedex/EmeraldExportREADME.txt'), readme_text, { date: localDate });

        // Add the general.h config file to the zip
        const general_config_text = await fetch(baseEmeraldPath + '/include/config/general.h').then(response => response.text());
        zip.file(removeLeadingSlash(baseEmeraldPath + '/include/config/general.h'), general_config_text, { date: localDate });

        // Add the new_game.c script to enable National PokeDex at start and give running shoes
        const new_game_text = await fetch(baseEmeraldPath + '/src/new_game.c').then(response => response.text());
        zip.file(removeLeadingSlash(baseEmeraldPath + '/src/new_game.c'), new_game_text, { date: localDate });

        // Modify the starters to use the favorite's base starter pokemon of their type
        await modifyAndZipEmeraldStarterText(zip, baseEmeraldPath, favoritePokemon);

        // Modify the wild encounters to use the favorite's pokemon (non base starters or legendaries)
        await modifyAndZipWildEncountersText(zip, baseEmeraldPath, favoritePokemon, filteredFavorites, emeraldUniqueWildEncounters);

        // Modify the ingame trades to use the favorite's pokemon (non base starters or legendaries)
        await modifyAndZipIngameTradesText(zip, baseEmeraldPath + '/src/data/trade.h', favoritePokemon, filteredFavorites, emeraldUniqueIngameTrades, emeraldRequestedUniqueIngameTrades, emeraldUniqueWildEncounters);

        // Modify the shop/trap/world/other pokemon to use the favorite's pokemon (non base starters or legendaries) (start favorite index after already used)
        let startingId = emeraldUniqueWildEncounters.length + emeraldUniqueIngameTrades.length + emeraldRequestedUniqueIngameTrades.length;
        await modifyAndZipEmeraldOtherPokemonText(zip, baseEmeraldPath, favoritePokemon, filteredFavorites, startingId);

        // Modify the legendary encounters to use the favorite's pokemon (fill with pseudo legendaries, and duplicates)
        await modifyAndZipEmeraldLegendaries(zip, baseEmeraldPath, favoritePokemon);

        // Modify the evolutions to use the favorite's pokemon
        await modifyAndZipEvolutions(zip, baseEmeraldPath, favoritePokemon);

        // Create the trainers.h with random trainer pokemon, and gymleader/eliet 4 having random but same type pokemon
        await createAndZipEmeraldTrainers(zip, baseEmeraldPath, favoritePokemon);

        // Generate the zip blob to download
        const content = await zip.generateAsync({ type: "blob" });

        // Trigger the download
        saveAs(content, "EmeraldROMFiles.zip");
    };

    const handleExportFireRedROM = async () => {
        if (favoritePokemon.length === 0) {
            alert('Please add some favorite Pokémon before exporting the ROM.');
            return;
        }

        // Combine all IDs to be excluded
        const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
        const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
        const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
        const exclusionIds = [...chosenStarterIds, ...subLegendaryIds, ...legendaryIds, ...mythicalIds];

        // Filter out the excluded Pokémon from the favorites list
        const filteredFavorites = favoritePokemon.filter(pokemon => !exclusionIds.includes(pokemon.id));
        shuffleArray(filteredFavorites);

        const zip = new JSZip();

        // Add the README file to the zip
        const readme_text = await fetch('/pokedex/FireRedExportREADME.txt').then(response => response.text());
        zip.file(removeLeadingSlash('/pokedex/FireRedExportREADME.txt'), readme_text, { date: localDate });

        // Add the general.h config file to the zip
        const general_config_text = await fetch(baseFireRedPath + '/include/config/general.h').then(response => response.text());
        zip.file(removeLeadingSlash(baseFireRedPath + '/include/config/general.h'), general_config_text, { date: localDate });

        // Add the new_game.c script to enable National PokeDex at start and give B dash
        const new_game_text = await fetch(baseFireRedPath + '/src/new_game.c').then(response => response.text());
        zip.file(removeLeadingSlash(baseFireRedPath + '/src/new_game.c'), new_game_text, { date: localDate });

        // Add the Department Store 4F script to add Linking Cable as a puchasable item
        const celadon_city_department_store_4F_text = await fetch(baseFireRedPath + '/data/maps/CeledonCity_DepartmentStore_4F/scripts.inc').then(response => response.text());
        zip.file(removeLeadingSlash(baseFireRedPath + '/data/maps/CeledonCity_DepartmentStore_4F/scripts.inc'), celadon_city_department_store_4F_text, { date: localDate });

        // Modify the starters to use the favorite's base starter pokemon of their type
        await modifyAndZipFireRedStarterText(zip, baseFireRedPath, favoritePokemon);

        // Modify the wild encounters to use the favorite's pokemon (non base starters or legendaries)
        await modifyAndZipWildEncountersText(zip, baseFireRedPath, favoritePokemon, filteredFavorites, fireRedUniqueWildEncounters);

        // Modify the ingame trades to use the favorite's pokemon (non base starters or legendaries)
        await modifyAndZipIngameTradesText(zip, baseFireRedPath + '/src/data/ingame_trades.h', favoritePokemon, filteredFavorites, fireRedUniqueIngameTrades, fireRedRequestedUniqueIngameTrades, fireRedUniqueWildEncounters);

        // Modify the shop/trap/world/other pokemon to use the favorite's pokemon (non base starters or legendaries) (start favorite index after already used)
        let startingId = fireRedUniqueWildEncounters.length + fireRedUniqueIngameTrades.length + fireRedRequestedUniqueIngameTrades.length;
        await modifyAndZipFireRedOtherPokemonText(zip, baseFireRedPath, favoritePokemon, filteredFavorites, startingId);

        // Modify the legendary encounters to use the favorite's pokemon (fill with pseudo legendaries, and duplicates)
        await modifyAndZipFireRedLegendaries(zip, baseFireRedPath, favoritePokemon);

        // Modify the evolutions to use the favorite's pokemon
        await modifyAndZipEvolutions(zip, baseFireRedPath, favoritePokemon);

        // Create the trainers.h with random trainer pokemon, and gymleader/eliet 4 having random but same type pokemon
        await createAndZipFireRedTrainers(zip, baseFireRedPath, favoritePokemon);

        // Generate the zip blob to download
        const content = await zip.generateAsync({ type: "blob" });

        // Trigger the download
        saveAs(content, "FireRedROMFiles.zip");
    };

    return (
        <div className={styles.filterContainer}>
            <button onClick={handleExportList} className={styles.clearButton}>Export List</button>
            <button onClick={handleExportEmeraldROM} className={styles.clearButton}>Export Emerald ROM</button>
            <button onClick={handleExportFireRedROM} className={styles.clearButton}>Export FireRed ROM</button>
        </div>
    );
};

export default ExportFavorites;
