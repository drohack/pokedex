import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './Ultimate151.module.css';
import { capitalizeFirstLetter, getEvolutions, Starters, StartersLvl1, StartersLvl2, SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from "../../utils/index";
import { speciesConversionArray } from "../../utils/SpeciesConversion";
import { fireRedUniqueWildEncounters } from '../../utils/FireRedUniqueWildEncounters';
import { fireRedUniqueIngameTrades, fireRedRequestedUniqueIngameTrades } from '../../utils/FireRedUniqueIngameTrades';
import { original151Pokemon } from '../../utils/Original151Pokemon';
import { getUltimate151, getIsUltimate151Loading } from './ultimate151Slice';
import html2canvas from "html2canvas";
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

const baseFireRedPath = '/pokedex/FireRedExportFiles';

// Get the current time in local timezone (CST)
const currentDate = new Date();

// Convert to UTC by adjusting for local timezone offset
const localOffset = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
const localDate = new Date(currentDate.getTime() - localOffset);

const removeLeadingSlash = (path) => {
    if (path.startsWith('/pokedex/')) {
        return path.replace(/^\/pokedex\//, '');
    }
    return path.replace(/^\/+/, '');
};

const getInitialNameFromSpecies = (species) => {
    for (const [name, data] of Object.entries(speciesConversionArray)) {
        if (data.species === species) {
            return name;
        }
    }
    return null; // Return null if the species is not found
};

const getUltimateReplacementSpecies = (ultimate151, kantoSpecies) => {
    const kantoName = kantoSpecies.replace("SPECIES_", "").toLowerCase();
    // Find the entry in the ultimate 151 array
    const entry = ultimate151.find(entry => entry.kanto.name.toLowerCase() === kantoName);
    // Return the replacement (favorite) Pokémon species if it exists
    if (entry && entry.favorite) {
        return speciesConversionArray[entry.favorite.name].species;
    } else {
        return kantoSpecies;
    }
};

const modifyAndZipFireRedStarterText = async (zip, basePath, sortedUltimate151) => {
    // Read the starter choose script in Professor Oaks Lab
    let starter_choose_text = await fetch(basePath + '/data/maps/PalletTown_ProfessorOaksLab/scripts.inc').then(response => response.text());
    // Read the starter message box script in Professor Oaks Lab
    let starter_message_text = await fetch(basePath + '/data/maps/PalletTown_ProfessorOaksLab/text.inc').then(response => response.text());
    // Read the Roaming file as the Roaming Legendary is based on your chosen starter
    let wild_pokemon_area_text = await fetch(basePath + '/src/wild_pokemon_area.c').then(response => response.text());
    let roamer_text = await fetch(basePath + '/src/roamer.c').then(response => response.text());
    // Read the field specials file to replace the starter pokemon
    let field_specials_text = await fetch(basePath + '/src/field_specials.c').then(response => response.text());

    let grassStarterSpecies = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_BULBASAUR");
    let waterStarterSpecies = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_SQUIRTLE");
    let fireStarterSpecies = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_CHARMANDER");

    // Replace the default starter name with the favorite grass starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies);
    starter_message_text = starter_message_text.replace(/BULBASAUR/g, grassStarterSpecies.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies);
    roamer_text = roamer_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies);
    field_specials_text = field_specials_text.replace(/SPECIES_BULBASAUR/g, grassStarterSpecies);
    let entei_pokemon_species_replacement = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MOLTRES");
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_ENTEI/g, entei_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_ENTEI/g, entei_pokemon_species_replacement);

    // Replace the default starter name with the favorite fire starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies);
    starter_message_text = starter_message_text.replace(/CHARMANDER/g, fireStarterSpecies.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies);
    roamer_text = roamer_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies);
    field_specials_text = field_specials_text.replace(/SPECIES_CHARMANDER/g, fireStarterSpecies);
    let suicune_pokemon_species_replacement = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ARTICUNO");
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_SUICUNE/g, suicune_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_SUICUNE/g, suicune_pokemon_species_replacement);

    // Replace the default starter name with the favorite water starter
    starter_choose_text = starter_choose_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies);
    starter_message_text = starter_message_text.replace(/SQUIRTLE/g, waterStarterSpecies.replace("SPECIES_", ""));
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies);
    roamer_text = roamer_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies);
    field_specials_text = field_specials_text.replace(/SPECIES_SQUIRTLE/g, waterStarterSpecies);
    let raikou_pokemon_species_replacement = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ZAPDOS");
    wild_pokemon_area_text = wild_pokemon_area_text.replace(/SPECIES_RAIKOU/g, raikou_pokemon_species_replacement);
    roamer_text = roamer_text.replace(/SPECIES_RAIKOU/g, raikou_pokemon_species_replacement);

    zip.file(removeLeadingSlash(basePath) + '/data/maps/PalletTown_ProfessorOaksLab/scripts.inc', starter_choose_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/PalletTown_ProfessorOaksLab/text.inc', starter_message_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/wild_pokemon_area.c', wild_pokemon_area_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/roamer.c', roamer_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/field_specials.c', field_specials_text, { date: localDate });
};

const modifyAndZipWildEncountersText = async (zip, basePath, sortedUltimate151, uniqueWildEncounters) => {
    // Read the original wild_encounters_text.json file (from public/ folder)
    let wild_encounters_text = await fetch(basePath + '/src/data/wild_encounters.json').then(response => response.text());

    // Replace unique wild encounters with specified Replacement Pokémon species
    for (let i = 0; i < uniqueWildEncounters.length; i++) {
        const regex = new RegExp(`"${uniqueWildEncounters[i]}"`, 'g');
        wild_encounters_text = wild_encounters_text.replace(regex, `"${getUltimateReplacementSpecies(sortedUltimate151, uniqueWildEncounters[i])}"`);
    }

    zip.file(removeLeadingSlash(basePath) + '/src/data/wild_encounters.json', wild_encounters_text, { date: localDate });
};

const modifyAndZipIngameTradesText = async (zip, path, sortedUltimate151, uniqueIngameTrades, requestedUniqueIngameTrades) => {
    // Read the original ingame_trades.json file (from public/ folder)
    let ingame_trades_text = await fetch(path).then(response => response.text());

    // Replace unique in game trades with specified Replacement Pokémon species
    for (let i = 0; i < uniqueIngameTrades.length; i++) {
        const regex = new RegExp(`${uniqueIngameTrades[i]}`, 'g');
        ingame_trades_text = ingame_trades_text.replace(regex, `${getUltimateReplacementSpecies(sortedUltimate151, uniqueIngameTrades[i])}`);
    }

    // Replace unique requested in game trades with specified Replacement Pokémon species
    for (let i = 0; i < requestedUniqueIngameTrades.length; i++) {
        const regex = new RegExp(`${requestedUniqueIngameTrades[i]}`, 'g');
        ingame_trades_text = ingame_trades_text.replace(regex, `${getUltimateReplacementSpecies(sortedUltimate151, requestedUniqueIngameTrades[i])}`);
    }

    zip.file(removeLeadingSlash(path), ingame_trades_text, { date: localDate });
};

const modifyAndZipFireRedOtherPokemonText = async (zip, basePath, sortedUltimate151) => {
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
    let fiveisland_waterlabyrinth_text = await fetch(basePath + '/data/maps/FiveIsland_WaterLabyrinth/scripts.inc').then(response => response.text());
    let sixisland_waterpath_house1_script_text = await fetch(basePath + '/data/maps/SixIsland_WaterPath_House1/scripts.inc').then(response => response.text());
    let sixisland_waterpath_house1_text = await fetch(basePath + '/data/maps/SixIsland_WaterPath_House1/text.inc').then(response => response.text());
    let battle_setup_text = await fetch(basePath + '/src/battle_setup.c').then(response => response.text());
    let trainer_tower_sets_text = await fetch(basePath + '/src/trainer_tower_sets.c').then(response => response.text());
    let bt_lvl50_text = await fetch(basePath + '/src/data/battle_tower/level_50_mons.h').then(response => response.text());
    let bt_lvl100_text = await fetch(basePath + '/src/data/battle_tower/level_100_mons.h').then(response => response.text());

    celedon_condominiums_roofroom_text = celedon_condominiums_roofroom_text.replace(/SPECIES_EEVEE/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_EEVEE"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_ABRA/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ABRA"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_CLEFAIRY/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_CLEFAIRY"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_DRATINI/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_DRATINI"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_PINSIR/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_PINSIR"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_SCYTHER/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_SCYTHER"));
    celedon_gamecorner_prizeroom_text = celedon_gamecorner_prizeroom_text.replace(/SPECIES_PORYGON/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_PORYGON"));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_OMANYTE/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_OMANYTE"));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_KABUTO/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_KABUTO"));
    cinnabar_pokemonlab_experimentroom_text = cinnabar_pokemonlab_experimentroom_text.replace(/SPECIES_AERODACTYL/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_AERODACTYL"));
    pokemontower_6f_text = pokemontower_6f_text.replace(/SPECIES_MAROWAK/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MAROWAK"));
    powerplant_text = powerplant_text.replace(/SPECIES_ELECTRODE/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ELECTRODE"));
    let route4_pokemon_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MAGIKARP");
    route4_pokemoncenter_1f_script_text = route4_pokemoncenter_1f_script_text.replace(/SPECIES_MAGIKARP/g, route4_pokemon_species);
    route4_pokemoncenter_1f_text = route4_pokemoncenter_1f_text.replace(/MAGIKARP/g, route4_pokemon_species.replace("SPECIES_", ""));
    route12_text = route12_text.replace(/SPECIES_SNORLAX/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_SNORLAX"));
    let rout12_pokemon_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MAGIKARP")
    route12_fishinghouse_script_text = route12_fishinghouse_script_text.replace(/SPECIES_MAGIKARP/g, rout12_pokemon_species);
    route12_fishinghouse_text = route12_fishinghouse_text.replace(/MAGIKARP/g, rout12_pokemon_species.replace("SPECIES_", ""));
    route16_text = route16_text.replace(/SPECIES_SNORLAX/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_SNORLAX"));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_EEVEE/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_EEVEE"));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_FLAREON/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_FLAREON"));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_JOLTEON/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_JOLTEON"));
    route25_seacottage_text = route25_seacottage_text.replace(/SPECIES_VAPOREON/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_VAPOREON"));
    let dojo_hitmonlee_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_HITMONLEE");
    let dojo_hitmonchan_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_HITMONCHAN");
    saffroncity_dojo_script_text = saffroncity_dojo_script_text.replace(/SPECIES_HITMONLEE/g, dojo_hitmonlee_species);
    saffroncity_dojo_script_text = saffroncity_dojo_script_text.replace(/SPECIES_HITMONCHAN/g, dojo_hitmonchan_species);
    saffroncity_dojo_text = saffroncity_dojo_text.replace(/HITMONLEE/g, dojo_hitmonlee_species.replace("SPECIES_", ""));
    saffroncity_dojo_text = saffroncity_dojo_text.replace(/HITMONCHAN/g, dojo_hitmonchan_species.replace("SPECIES_", ""));
    let silphco_7f_pokemon_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_LAPRAS");
    silphco_7f_script_text = silphco_7f_script_text.replace(/SPECIES_LAPRAS/g, silphco_7f_pokemon_species);
    silphco_7f_text = silphco_7f_text.replace(/LAPRAS/g, silphco_7f_pokemon_species.replace("SPECIES_", ""));
    ssanne_2f_room1_text = ssanne_2f_room1_text.replace(/SPECIES_SNORLAX/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_SNORLAX"));
    threeisland_berryforest_text = threeisland_berryforest_text.replace(/SPECIES_HYPNO/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_HYPNO"));
    fiveisland_waterlabyrinth_text = fiveisland_waterlabyrinth_text.replace(/SPECIES_TOGEPI/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_TOGEPI"));
    let ssixisland_waterpath_house1_pokemon_species = getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_HERACROSS");
    sixisland_waterpath_house1_script_text = sixisland_waterpath_house1_script_text.replace(/SPECIES_HERACROSS/g, ssixisland_waterpath_house1_pokemon_species);
    sixisland_waterpath_house1_text = sixisland_waterpath_house1_text.replace(/HERACROSS/g, ssixisland_waterpath_house1_pokemon_species.replace("SPECIES_", ""));
    battle_setup_text = battle_setup_text.replace(/SPECIES_WEEDLE/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_WEEDLE"));
    battle_setup_text = battle_setup_text.replace(/SPECIES_MAROWAK/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MAROWAK"));
    trainer_tower_sets_text = trainer_tower_sets_text.replace(/SPECIES[^,]+(?=,)/g, (kantoSpecies) => getUltimateReplacementSpecies(sortedUltimate151, kantoSpecies));
    bt_lvl50_text = bt_lvl50_text.replace(/SPECIES[^,]+(?=,)/g, (kantoSpecies) => getUltimateReplacementSpecies(sortedUltimate151, kantoSpecies));
    bt_lvl100_text = bt_lvl100_text.replace(/SPECIES[^,]+(?=,)/g, (kantoSpecies) => getUltimateReplacementSpecies(sortedUltimate151, kantoSpecies));

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
    zip.file(removeLeadingSlash(basePath) + '/data/maps/FiveIsland_WaterLabyrinth/scripts.inc', fiveisland_waterlabyrinth_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SixIsland_WaterPath_House1/scripts.inc', sixisland_waterpath_house1_script_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/SixIsland_WaterPath_House1/text.inc', sixisland_waterpath_house1_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/battle_setup.c', battle_setup_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/trainer_tower_sets.c', trainer_tower_sets_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_tower/level_50_mons.h', bt_lvl50_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/src/data/battle_tower/level_100_mons.h', bt_lvl100_text, { date: localDate });
};

const modifyAndZipFireRedLegendaries = async (zip, basePath, sortedUltimate151) => {
    let seafoam_ilsands_b4f_text = await fetch(basePath + '/data/maps/SeafoamIslands_B4F/scripts.inc').then(response => response.text());
    let powerplant_text = await fetch(basePath + '/data/maps/PowerPlant/scripts.inc').then(response => response.text());
    let mtember_summit_text = await fetch(basePath + '/data/maps/MtEmber_Summit/scripts.inc').then(response => response.text());
    let ceruleancave_b1f_text = await fetch(basePath + '/data/maps/CeruleanCave_B1F/scripts.inc').then(response => response.text());
    let navelrock_base_text = await fetch(basePath + '/data/maps/NavelRock_Base/scripts.inc').then(response => response.text());
    let navelrock_summit_text = await fetch(basePath + '/data/maps/NavelRock_Summit/scripts.inc').then(response => response.text());
    let birthisland_exterior_text = await fetch(basePath + '/data/maps/BirthIsland_Exterior/scripts.inc').then(response => response.text());

    seafoam_ilsands_b4f_text = seafoam_ilsands_b4f_text.replace(/SPECIES_ARTICUNO/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ARTICUNO"));
    powerplant_text = powerplant_text.replace(/SPECIES_ZAPDOS/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_ZAPDOS"));
    mtember_summit_text = mtember_summit_text.replace(/SPECIES_MOLTRES/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MOLTRES"));
    ceruleancave_b1f_text = ceruleancave_b1f_text.replace(/SPECIES_MEWTWO/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MEWTWO"));
    navelrock_base_text = navelrock_base_text.replace(/SPECIES_LUGIA/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MEW"));
    navelrock_summit_text = navelrock_summit_text.replace(/SPECIES_HO_OH/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MEW"));
    birthisland_exterior_text = birthisland_exterior_text.replace(/SPECIES_DEOXYS/g, getUltimateReplacementSpecies(sortedUltimate151, "SPECIES_MEWTWO"));

    zip.file(removeLeadingSlash(basePath) + '/data/maps/SeafoamIslands_B4F/scripts.inc', seafoam_ilsands_b4f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/PowerPlant/scripts.inc', powerplant_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/MtEmber_Summit/scripts.inc', mtember_summit_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/CeruleanCave_B1F/scripts.inc', ceruleancave_b1f_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/NavelRock_Base/scripts.inc', navelrock_base_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/NavelRock_Summit/scripts.inc', navelrock_summit_text, { date: localDate });
    zip.file(removeLeadingSlash(basePath) + '/data/maps/BirthIsland_Exterior/scripts.inc', birthisland_exterior_text, { date: localDate });
};

async function modifyAndZipEvolutions(zip, basePath, sortedUltimate151) {
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

    const removePokemonEvolutions = (name) => {
        // Check if the pokemon has evolutions to remove
        if (getEvolutions(name).length > 0) {
            // Get the species name of the pokemon to remove
            const targetSpecies = speciesConversionArray[name].species;
            // Regex to match `[SPECIES_NAME]` and matching .evolutions text
            const speciesBlockRegex = new RegExp(`(\\[${targetSpecies}\\][\\s\\S]*?)\\.evolutions\\s*=\\s*EVOLUTION\\([^)]*\\),`, 'm');

            // Loop through all of the families texts to find the target species and remove its evolutions
            for (let family of familiesTexts) {
                const match = family.text.match(speciesBlockRegex);
                if (match) {
                    // Remove the evolutions block for the target species
                    family.text = family.text.replace(`${match[0]}`, `${match[1]}`);
                    break;
                }
            }
        }
    }

    const addEvolutionsText = (targetSpecies, newEvolutionsText) => {
        // Regex to match `[SPECIES_NAME]` and matching ending curly brace
        const speciesRegex = new RegExp(`(\\[${targetSpecies}\\] =\\s*{[\\s\\S]*?)(\\n\\s*}),`, 'm');

        // Loop through all of the families texts to find the target species and add its evolutions
        for (let family of familiesTexts) {
            const match = family.text.match(speciesRegex);
            if (match) {
                // Insert the new evolutions block before the closing curly brace
                family.text = family.text.replace(speciesRegex, `${match[1]}\n        ${newEvolutionsText}\n  },`);
                return true; // Indicate that the addition was successful
            }
        }

        return false; // Indicate that the target species was not found
    };

    const getNewEvolutionsText = (sortedUltimate151, ultimateEntry) => {
        // Get Origional Evolution Text of the kanto pokemon from original151Pokemon
        let originalPokemon = original151Pokemon.find(pokemon => pokemon.name === ultimateEntry.kanto.name);

        // Check if the original Pokémon entry is found
        if (!originalPokemon) {
            console.error(`Original Pokémon not found for name: ${ultimateEntry.kanto.name}`);
            return null;
        }

        // Get the original evolution text of the Kanto Pokémon
        let newEvolutionsText = originalPokemon.evolution;

        if (newEvolutionsText) {
            // Extract all unique kanto SPECIES_xxxx values
            const speciesMatches = newEvolutionsText.match(/SPECIES_\w+/g);
            const uniqueSpecies = [...new Set(speciesMatches)];
    
            // Update the newEvolutionsText for each unique kanto evolution SPECIES_xxxx with it's replacement favorite species
            uniqueSpecies.forEach(kantoEvolutionSpecies => {
                let kantoEvolutionName = getInitialNameFromSpecies(kantoEvolutionSpecies);
                // Find the corresponding entry in sortedUltimate151
                const newEvolutionEntry = sortedUltimate151.find(entry => entry.kanto.name === kantoEvolutionName);
                // Replace the evolution Species with the replacement favorite species
                if (newEvolutionEntry.favorite) {
                    newEvolutionsText = newEvolutionsText.replace(new RegExp(kantoEvolutionSpecies, 'g'), speciesConversionArray[newEvolutionEntry.favorite.name].species);
                }
            });
        }

        return newEvolutionsText;
    };


    // Loop through all of the sortedUltimate151 to update the replacement (favorite) evolutions to match the kanto evolution logic
    for (let entry of sortedUltimate151) {
        // Get the new evolution text of the current entry
        const newEvolutionsText = getNewEvolutionsText(sortedUltimate151, entry);
        // Remove the original evolution text for the replacement favorite pokemon
        if (entry.favorite) {
            removePokemonEvolutions(entry.favorite.name);
        } else {
            removePokemonEvolutions(entry.kanto.name);
        }
        // Add the new evolution text for the replacement favorite pokemon
        if (newEvolutionsText) {
            if (entry.favorite) {
                addEvolutionsText(speciesConversionArray[entry.favorite.name].species, newEvolutionsText);
            } else {
                addEvolutionsText(speciesConversionArray[entry.kanto.name].species, newEvolutionsText);
            }
        }
    }
        

    // Zip up the modified evolution files
    for (let family of familiesTexts) {
        zip.file(removeLeadingSlash(family.path), family.text, { date: localDate });
    }
}

const createAndZipFireRedTrainers = async (zip, basePath, sortedUltimate151) => {
    // Replace each instance of SPECIES_xxx with a specified Replacement Pokémon species
    let trainers_text = await fetch(basePath + '/src/data/trainers.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_brock_rock.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_misty_water.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_lt_surge_electric.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_erika_grass.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_koga_poison.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_sabrina_psychic.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_blaine_fire.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/gym_leader_giovanni_ground.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/elite_4_lorelei_ice.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/elite_4_bruno_fighting.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/elite_4_agatha_ghost.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/elite_4_lance_dragon.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_fire_stage1.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_fire_stage2.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_fire_stage3.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_grass_stage1.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_grass_stage2.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_grass_stage3.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_water_stage1.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_water_stage2.h').then(response => response.text());
    trainers_text += '\n' + await fetch(basePath + '/src/data/rival_water_stage3.h').then(response => response.text());

    trainers_text = trainers_text.replace(/SPECIES_\w+/g, (kantoPokemon) => getUltimateReplacementSpecies(sortedUltimate151, kantoPokemon));

    // Add the modified trainers_text to the zip file
    zip.file(removeLeadingSlash(basePath) + '/src/data/trainers.h', trainers_text, { date: localDate });
};


export const ExportUltimate151 = ({kantoPokemon, divRef}) => {
    const ultimate151 = useSelector(getUltimate151);
    const isUltimate151Loading = useSelector(getIsUltimate151Loading);
    const [loadingImage, setLoadingImage] = useState(false);

    if (isUltimate151Loading) {
        return <p>Loading...</p>;
    }
    
    // Add missing kantoPokemon to ultimate151
    const completeUltimate151 = [...ultimate151];
    // Ensure kantoPokemon is an array
    if (!Array.isArray(kantoPokemon)) {
        console.error("kantoPokemon is not an array:", kantoPokemon);
        return <p>Error: kantoPokemon is not an array.</p>;
    }
    kantoPokemon.forEach(kanto => {
        if (!ultimate151.some(entry => entry.kanto.id === kanto.id)) {
            completeUltimate151.push({ kanto, favorite: null });
        }
    });
    // Sort the ultimate151 array by entry.kanto.id
    const sortedUltimate151 = completeUltimate151.slice().sort((a, b) => a.kanto.id - b.kanto.id);

    const handleExportList = () => {
        if (ultimate151.length === 0) {
            alert('Please add some favorite Pokémon before exporting the text file.');
            return;
        }
        //console.log(sortedUltimate151);
        // Create a string with each ultimate Pokémon pair on a new line
        const ultimateList = sortedUltimate151.map(entry => {
            const favoriteName = entry.favorite ? ` => ${capitalizeFirstLetter(entry.favorite.name)}` : '';
            return `${capitalizeFirstLetter(entry.kanto.name)}${favoriteName}`;
        }).join('\n');

        // Create a Blob from the string
        const blob = new Blob([ultimateList], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ultimate151_pokemon.txt';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleExportImage = async () => {
        if (!divRef.current) return;
    
        try {
            setLoadingImage(true);
            // Get actual width & height of the div
            const { width } = divRef.current.getBoundingClientRect();
            const originalHeight = divRef.current.scrollHeight;
    
            // Clone the div
            const clonedDiv = divRef.current.cloneNode(true);
            clonedDiv.style.position = "absolute";
            clonedDiv.style.top = "-9999px";
            clonedDiv.style.left = "-9999px";
            clonedDiv.style.width = `${width * 2}px`; // 🔹 Double width
            clonedDiv.style.minWidth = `${width * 2}px`;
            clonedDiv.style.maxWidth = "none";
            clonedDiv.style.height = "auto"; // 🔹 Let height auto-adjust
            clonedDiv.style.overflow = "visible";
            clonedDiv.style.background = "white";
            clonedDiv.style.display = "block";
    
            // Append cloned div to the body
            document.body.appendChild(clonedDiv);
    
            // 🔹 Find the grid div dynamically
            const gridDiv = [...clonedDiv.querySelectorAll("div")].find((el) => {
                const computedStyle = window.getComputedStyle(el);
                return computedStyle.display === "grid" && computedStyle.gridTemplateColumns;
            });
    
            let heightMultiplier = 2.2; // Default if needed
            if (gridDiv) {
                // Get the original height before changing columns
                const preAdjustHeight = clonedDiv.scrollHeight;
    
                // 🔹 Force 12 columns and update width
                gridDiv.style.setProperty("grid-template-columns", "repeat(12, 1fr)", "important");
                gridDiv.style.setProperty("width", "100%", "important");
    
                // Allow reflow
                await new Promise((resolve) => setTimeout(resolve, 100));
    
                // 🔹 Get the new height after layout change
                const postAdjustHeight = clonedDiv.scrollHeight;
    
                // 🔹 Determine dynamic multiplier
                heightMultiplier = postAdjustHeight / preAdjustHeight;
            }
    
            // 🔹 Fix any elements with opacity 0.6
            clonedDiv.querySelectorAll("*").forEach((el) => {
                if (window.getComputedStyle(el).opacity === "0.6") {
                    el.style.opacity = "1.0"; // Override dimming effect
                }
            });
    
            // Allow time for rendering updates
            await new Promise((resolve) => setTimeout(resolve, 100));
    
            // 🔹 Get final width & height dynamically
            const finalWidth = clonedDiv.scrollWidth;
            const finalHeight = (originalHeight * heightMultiplier) + 50; // Use dynamic multiplier
    
            // Capture the div as an image
            const scaleFactor = 3;
            const canvas = await html2canvas(clonedDiv, {
                useCORS: true,
                scale: window.devicePixelRatio * scaleFactor,
                width: finalWidth,
                height: finalHeight,
            });
    
            // Remove the cloned div
            document.body.removeChild(clonedDiv);
    
            // Convert canvas to image
            const imgData = canvas.toDataURL("image/jpeg", 0.8);
    
            // Create a download link
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "ultimate151.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error capturing image:", error);
        } finally {
            setLoadingImage(false);
        }
    };

    const handleExportUltimateFireRedROM = async () => {
        if (ultimate151.length === 0) {
            alert('Please add some Pokémon to the Ultimate list before exporting the ROM.');
            return;
        }

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

        // Modify the starters to use the ultimate 151 replacement base starter pokemon of their type
        await modifyAndZipFireRedStarterText(zip, baseFireRedPath, sortedUltimate151);

        // Modify the wild encounters to use the ultimate 151 replacement pokemon (non base starters or legendaries)
        await modifyAndZipWildEncountersText(zip, baseFireRedPath, sortedUltimate151, fireRedUniqueWildEncounters);

        // Modify the ingame trades to use the ultimate 151 replacement pokemon (non base starters or legendaries)
        await modifyAndZipIngameTradesText(zip, baseFireRedPath + '/src/data/ingame_trades.h', sortedUltimate151, fireRedUniqueIngameTrades, fireRedRequestedUniqueIngameTrades);

        // Modify the shop/trap/world/other pokemon to use the ultimate 151 replacement pokemon (non base starters or legendaries)
        await modifyAndZipFireRedOtherPokemonText(zip, baseFireRedPath, sortedUltimate151);

        // Modify the legendary encounters to use the ultimate 151 replacement pokemon (fill with pseudo legendaries, and duplicates)
        await modifyAndZipFireRedLegendaries(zip, baseFireRedPath, sortedUltimate151);

        // Modify the evolutions to use the ultimate 151 replacement pokemon
        await modifyAndZipEvolutions(zip, baseFireRedPath, sortedUltimate151);

        // Create the trainers.h with random trainer pokemon, and gymleader/eliet 4 having random but same type pokemon
        await createAndZipFireRedTrainers(zip, baseFireRedPath, sortedUltimate151);

        // Generate the zip blob to download
        const content = await zip.generateAsync({ type: "blob" });

        // Trigger the download
        saveAs(content, "Ultimate151FireRedROMFiles.zip");
    };

    if (loadingImage) {
        return <LoadingOverlay />
    }

    return (
        <div className={styles.filterContainer}>
            <button onClick={handleExportList} className={styles.clearButton}>Export as Text</button>
            <button onClick={handleExportImage} className={styles.clearButton}>Export as Image</button>
            <button onClick={handleExportUltimateFireRedROM} className={styles.clearButton}>Export Ultimate FireRed ROM</button>
        </div>
    );
};

export default ExportUltimate151;
