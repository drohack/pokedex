import React from 'react';
import { useSelector } from 'react-redux';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './Favorites.module.css';
import { getFavoritePokemon } from "../../features/favorites/favoritesSlice";
import { capitalizeFirstLetter, Starters, SubLegendaries, Legendaries, Mythical, PseudoLegendaries } from "../../utils/index";
import { emeraldSpeciesConversionArray } from "../../utils/EmeraldSpeciesConversion";
import { emeraldUniqueWildEncounters } from '../../utils/EmeraldUniqueWildEncounters';

// Shuffle the unique wild encounters array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const getModifiedStarterText = async (favoritePokemon) => {
    // Read the original starter_choose.c file (from public/ folder)
    let starter_choose_text = await fetch('/EmeraldExportFiles/src/starter_choose.c').then(response => response.text());

    // Filter the list of favorite Pokémon to include only starters
    const starterIds = Object.values(Starters).map(starter => starter.id);
    const favoriteStarters = favoritePokemon.filter(pokemon => starterIds.includes(pokemon.id));

    // Replace the default starter name with the favorite grass starter
    const favoriteGrassStarters = favoriteStarters.filter(pokemon =>
        pokemon.types.some(typeObj => typeObj.type.name === "grass")
    );
    const grassStarterFavorite = favoriteGrassStarters.length > 0 ? favoriteGrassStarters[0].name : "treecko";
    const grassStarterSpecies = emeraldSpeciesConversionArray[grassStarterFavorite];
    const grassStarterSpeciesName = grassStarterSpecies ? grassStarterSpecies.species : "SPECIES_TREECKO";
    starter_choose_text = starter_choose_text.replace("SPECIES_TREECKO", grassStarterSpeciesName);

    // Replace the default starter name with the favorite fire starter
    const favoriteFireStarters = favoriteStarters.filter(pokemon =>
        pokemon.types.some(typeObj => typeObj.type.name === "fire")
    );
    const fireStarterFavorite = favoriteFireStarters.length > 0 ? favoriteFireStarters[0].name : "torchic";
    const fireStarterSpecies = emeraldSpeciesConversionArray[fireStarterFavorite];
    const fireStarterSpeciesName = fireStarterSpecies ? fireStarterSpecies.species : "SPECIES_TORCHIC";
    starter_choose_text = starter_choose_text.replace("SPECIES_TORCHIC", fireStarterSpeciesName);

    // Replace the default starter name with the favorite water starter
    const favoriteWaterStarters = favoriteStarters.filter(pokemon =>
        pokemon.types.some(typeObj => typeObj.type.name === "water")
    );
    const waterStarterFavorite = favoriteWaterStarters.length > 0 ? favoriteWaterStarters[0].name : "mudkip";
    const waterStarterSpecies = emeraldSpeciesConversionArray[waterStarterFavorite];
    const waterStarterSpeciesName = waterStarterSpecies ? waterStarterSpecies.species : "SPECIES_MUDKIP";
    starter_choose_text = starter_choose_text.replace("SPECIES_MUDKIP", waterStarterSpeciesName);

    return starter_choose_text;
};

const getModifiedWildEncountersText = async (favoritePokemon) => {
    // Read the original wild_encounters_text.json file (from public/ folder)
    let wild_encounters_text = await fetch('/EmeraldExportFiles/src/data/wild_encounters.json').then(response => response.text());

    // Combine all IDs to be excluded
    const starterIds = Object.values(Starters).map(starter => starter.id);
    const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
    const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
    const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
    const exclusionIds = [...starterIds, ...subLegendaryIds, ...legendaryIds, ...mythicalIds];

    // Filter out the excluded Pokémon from the favorites list
    const filteredFavorites = favoritePokemon.filter(pokemon => !exclusionIds.includes(pokemon.id));
    
    // Get the list of unique wild encounters
    const uniqueWildEncounters = emeraldUniqueWildEncounters;

    shuffleArray(uniqueWildEncounters);

    // Replace unique wild encounters with favorite Pokémon species
    for (let i = 0; i < uniqueWildEncounters.length; i++) {
        if (i < filteredFavorites.length) {
            // Use a unique favorite Pokémon
            const favorite = filteredFavorites[i];
            const speciesEntry = emeraldSpeciesConversionArray[favorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : null;
            if (speciesName) {
                const regex = new RegExp(uniqueWildEncounters[i], 'g');
                wild_encounters_text = wild_encounters_text.replace(regex, speciesName);
            }
        } else {
            // Use a random favorite Pokémon for remaining encounters
            const randomFavorite = filteredFavorites[Math.floor(Math.random() * filteredFavorites.length)];
            const speciesEntry = emeraldSpeciesConversionArray[randomFavorite.name.toLowerCase()];
            const speciesName = speciesEntry ? speciesEntry.species : null;
            if (speciesName) {
                const regex = new RegExp(uniqueWildEncounters[i], 'g');
                wild_encounters_text = wild_encounters_text.replace(regex, speciesName);
            }
        }
    }

    return wild_encounters_text;
};

const modifyAndZipLegendaries = async (zip, favoritePokemon) => {
    // Combine all legendary IDs
    const subLegendaryIds = Object.values(SubLegendaries).map(subLegendary => subLegendary.id);
    const legendaryIds = Object.values(Legendaries).map(legendary => legendary.id);
    const mythicalIds = Object.values(Mythical).map(mythical => mythical.id);
    const allLegendaryIds = [...subLegendaryIds, ...legendaryIds, ...mythicalIds];

    // Filter the list of favorite Pokémon to include only legendaries
    const favoriteLegendaries = favoritePokemon.filter(pokemon => allLegendaryIds.includes(pokemon.id));
    shuffleArray(favoriteLegendaries);

    // You might need these later
    const pseudoLegendaryIds = Object.values(PseudoLegendaries).map(pseudoLegendary => pseudoLegendary.id);
    // Filter the list of favorite Pokémon to include only pseudo legendaries
    const favoritePseudoLegendaries = favoritePokemon.filter(pokemon => pseudoLegendaryIds.includes(pokemon.id));
    shuffleArray(favoritePseudoLegendaries);  
    
    // There are 12 unique legendary encounters in Emerald, Fill them first with Favorite Legendaries
    // Fill the remaining encounters with pseudo legendaries and duplicate legendaries (or pair down legendaries if over)
    if (favoriteLegendaries.length === 0 && favoritePseudoLegendaries.length === 0) {
        console.error('No favorite legendaries found');
        return;
    } else if (favoriteLegendaries.length < 12) {
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
            for (let i = 0; i < 12 - favoriteLegendaries.length; i++) {
                favoriteLegendaries.push(favoritePseudoLegendaries[i]);
            }
        } else {
            // There are no pseudo legendaries so add random legendaries one at a time to favoriteLegendaries till there's 12
            for (let i = 0; i < 12 - favoriteLegendaries.length; i++) {
                favoriteLegendaries.push(favoriteLegendaries[Math.floor(Math.random() * favoriteLegendaries.length)]);
            }
        }
    } else if (favoriteLegendaries.length > 12) {
        // Remove extra favorite legendaries randomly
        while (favoriteLegendaries.length > 12) {
            favoriteLegendaries.splice(Math.floor(Math.random() * favoriteLegendaries.length), 1);
        }
    }

    // SHOULD NOT GET HERE If favoriteLegendaries is empty log an error to the console and exit this function
    if (favoriteLegendaries.length != 12) {
        console.error('No favorite legendaries found');
        return;
    }

    console.log(favoriteLegendaries);

    const replaceLegendary = async(zip, path, replaceText, legendaryId, default_species) => {
        let script_text = await fetch('/'+path).then(response => response.text());
        const conversionPokemon = emeraldSpeciesConversionArray[favoriteLegendaries[legendaryId].name];
        const favoriteSpecies = conversionPokemon ? conversionPokemon.species : default_species;
        const newText = replaceText.replace(default_species, favoriteSpecies);
        script_text = script_text.replace(replaceText, newText);
        zip.file(path, script_text);
    };

    // Replace legendary encounters with favorite Legendaries
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/MarineCave_End/scripts.inc', "setwildbattle SPECIES_KYOGRE", 0, "SPECIES_KYOGRE");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/TerraCave_End/scripts.inc', "setwildbattle SPECIES_GROUDON", 1, "SPECIES_GROUDON");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/DesertRuins/scripts.inc', "setwildbattle SPECIES_REGIROCK", 2, "SPECIES_REGIROCK");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/IslandCave/scripts.inc', "setwildbattle SPECIES_REGICE", 3, "SPECIES_REGICE");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/AncientTomb/scripts.inc', "setwildbattle SPECIES_REGISTEEL", 4, "SPECIES_REGISTEEL");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/SkyPillar_Top/scripts.inc', "setwildbattle SPECIES_RAYQUAZA", 5, "SPECIES_RAYQUAZA");
    // Latias and Latios
    const latiasReplacementPokemon = emeraldSpeciesConversionArray[favoriteLegendaries[6].name];
    const latiasReplacementSpecies = latiasReplacementPokemon ? latiasReplacementPokemon.species : "SPECIES_LATIAS";
    const latiosReplacementPokemon = emeraldSpeciesConversionArray[favoriteLegendaries[7].name];
    const latiosReplacementSpecies = latiosReplacementPokemon ? latiosReplacementPokemon.species : "SPECIES_LATIOS";
    // Set the roaming encounter for Latias and Latios
    let roamer_text = await fetch('/EmeraldExportFiles/src/roamer.c').then(response => response.text());
    roamer_text = roamer_text.replace("SPECIES_LATIAS", latiasReplacementSpecies);
    roamer_text = roamer_text.replace("SPECIES_LATIOS", latiosReplacementSpecies);
    zip.file('EmeraldExportFiles/src/roamer.c', roamer_text);
    // Set static encounter for Latias and Latios
    let SouthernIsland_Interior_text = await fetch('/EmeraldExportFiles/data/maps/SouthernIsland_Interior/scripts.inc').then(response => response.text());
    SouthernIsland_Interior_text = SouthernIsland_Interior_text.replace("seteventmon SPECIES_LATIAS", "seteventmon " + latiasReplacementSpecies);
    SouthernIsland_Interior_text = SouthernIsland_Interior_text.replace("seteventmon SPECIES_LATIOS", "seteventmon " + latiosReplacementSpecies);
    zip.file('EmeraldExportFiles/data/maps/SouthernIsland_Interior/scripts.inc', SouthernIsland_Interior_text);
    // Set event legendary encounters with favorite Legendaries
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/FarawayIsland_Interior/scripts.inc', "seteventmon SPECIES_MEW", 8, "SPECIES_MEW");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/NavelRock_Bottom/scripts.inc', "seteventmon SPECIES_LUGIA", 9, "SPECIES_LUGIA");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/NavelRock_Top/scripts.inc', "seteventmon SPECIES_HO_OH", 10, "SPECIES_HO_OH");
    await replaceLegendary(zip, 'EmeraldExportFiles/data/maps/BirthIsland_Exterior/scripts.inc', "seteventmon SPECIES_DEOXYS_NORMAL", 11, "SPECIES_DEOXYS_NORMAL");

    return;
};


export const ExportFavorites = () => {
    const favoritePokemon = useSelector(getFavoritePokemon);

    const handleExportList = () => {
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
        const zip = new JSZip();

        // Manually grab each file to be copied to the zip
        const folderStructure = [
            'EmeraldExportFiles/',
            'EmeraldExportFiles/data/maps/AncientTomb/scripts.inc',
            'EmeraldExportFiles/data/maps/BirthIsland_Exterior/scripts.inc',
            'EmeraldExportFiles/data/maps/DesertRuins/scripts.inc',
            'EmeraldExportFiles/data/maps/FarawayIsland_Interior/scripts.inc',
            'EmeraldExportFiles/data/maps/IslandCave/scripts.inc',
            'EmeraldExportFiles/data/maps/MarineCave_End/scripts.inc',
            'EmeraldExportFiles/data/maps/NavelRock_Bottom/scripts.inc',
            'EmeraldExportFiles/data/maps/NavelRock_Top/scripts.inc',
            'EmeraldExportFiles/data/maps/SkyPillar_Top/scripts.inc',
            'EmeraldExportFiles/data/maps/SouthernIsland_Interior/scripts.inc',
            'EmeraldExportFiles/data/maps/TerraCave_End/scripts.inc',
            'EmeraldExportFiles/src/roamer.c',
            'EmeraldExportFiles/src/starter_choose.c',
            'EmeraldExportFiles/src/data/wild_encounters.json',
        ];

        // Fetch and add all files to the zip
        for (const path of folderStructure) {
            const response = await fetch(`/${path}`);
            if (response.ok) {
                const text = await response.text();
                zip.file(path, text);
            }
        }

        // Modify the starters to use the favorite's base starter pokemon of their type
        zip.file("EmeraldExportFiles/src/starter_choose.c", await getModifiedStarterText(favoritePokemon));

        // Modify the wild encounters to use the favorite's pokemon (non base starters or legendaries)
        zip.file("EmeraldExportFiles/src/data/wild_encounters.json", await getModifiedWildEncountersText(favoritePokemon));

        // Modify the legendary encounters to use the favorite's pokemon (fill with pseudo legendaries, and duplicates)
        await modifyAndZipLegendaries(zip, favoritePokemon);

        // Generate the zip file
        const content = await zip.generateAsync({ type: "blob" });

        // Trigger the download
        saveAs(content, "EmeraldROMFiles.zip");
    };

    return (
        <div className={styles.filterContainer}>
            <button onClick={handleExportList} className={styles.clearButton}>Export List</button>
            <button onClick={handleExportEmeraldROM} className={styles.clearButton}>Export Emerald ROM</button>
        </div>
    );
};

export default ExportFavorites;
