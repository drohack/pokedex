# Pokedex App

Hosted here: https://drohack.github.io/pokedex/

A simple Pokedex application built with React, React Query, Redux Toolkit, React Router, and Dexie.js for persistent data. Uses data from PokeAPI https://pokeapi.co/. Forked from https://github.com/kevveth/pokedex.

This has been updated by drohack to allow a more detailed filtering of pokemon. A larger list of pokemon to search. And to export the Favorites list to either a text file OR for a semi randomized Pokemon FireRed or Emerald Extended ROM. And for the final challege create your own Ultimate 151 Pokémon list swapping out the original Kanto Pokémon 1 to 1 with your own. Do you want all Legendaries, just Little Guys, or have you and your friends decied. It's up to you. This was made for GACKcon 2025 panel "Narrowing down to the ultimate 151 pokemon" (There are so many pokemon, there must be some good ones in every generation. During this panel we will narrow down the 1000+ pokemon into the perfect 151. Come let your voice and terrible opinions be heard).

## Screenshots

![Sreenshot of the home page](images/home.png)

## Features

* **Browse Pokemon:** View a paginated list of Pokemon, fetched from the PokeAPI.
* **Search Pokemon:** Filter the Pokemon list by name (case-insensitive).
* **Pokemon Details (REMOVED):** View detailed information about each Pokemon.
* **Favorites:** Add and remove Pokemon from your favorites list, persisted locally using Dexie.js.
* **Navigation:** Seamless navigation between Home, Favorites, and Pokemon Details pages.
* **Loading and Error Handling:** Clear visual feedback during data loading and error states.
* **Responsive Design:** Works well on different screen sizes.

## Updated Features (by drohack)

* **Removed Details page:** The page only showed size and weight. And isn't needed for our use for picking the best 151 pokemon. Made the whole pokemon card clickable to Favorite/UnFavorite.
* **Cleaned up Navigation:** Removed extra titles, and shrunk down the Nav Bar. The Nav Bar now floats at the top.
* **Additional "Regions:** Added the following Regions for filtering
    * ALL: show all pokemon available from PokeAPI (including forms, region specific, hats, totems... etc.)
    * Mega
    * Alola Form
    * Galar Form
    * GMax
    * Hisui Form
* **Advance Search:** Additional dropdown to filter even more
    * Types: Only show pokemon that match the given type(s) selected
    * Legendaries: Broken down into Sub Legendaries, Legendaries, Mythical, and Pseudo Legendaries
    * Starters: Broken down into just base Starters, or Starters and their Evolutions
    * Locked: Favorites you've locked in
    * Exclusions: Remove these options from your list
        * Favorites
        * Locked
        * Starters (and Evolutions)
        * Legendaries (not including Pseudo Legendaries)
        * Types
* **Clear Filters:** Add a button to clear all filters
* **Show Types:** The main page now shows the pokemon's type(s) including having a colored background to match
* **Favorite Page Updates:**
    * Counter for number of Favorites
    * Counter for number of favorites on the current page (useful when filtered down)
    * Clear Favorites/Favorites & Locks button (with confirmation)
    * Filters work on Favorites page
    * Export/Import List: Exports a simple text file with all of your favorite pokemon, each on their own line
    * Export FireRed or Emerald ROM (see below for more details)
* **Lock favorites:**
    * Allow you to lock some of your more precious favirotes so they don't accidentally get unfavorited
* **Ultimate 151:**
    * Choose your Ultimate 151 Pokemon list, who you'd swap out for the original Kanto Pokemon with your selected Favorite pokemon
    * Export/Import as Text: Get an easy text list of all of your Ultimate 151 and what they swapped with
    * Export as Image: Create an easy image of your Ultiamte 151 that you can reference later
    * Export Ultiamte FireRed ROM: Create the nessesary files to build your own custom ROM to play your Ultimate 151 dreams

## Export FireRed or Emerald ROM

Intended for use with:
* Pokemon FireRed (Expansion) (https://github.com/cawtds/pokefirered-expansion)
* Pokemon Emerald (Expansion) (https://github.com/rh-hideout/pokeemerald-expansion)

If you want to play a custom ROM of  of your selected Favorites there's no easy way to do it. But if you use this feature you'll get a .zip file with the nessesary files to change all Wild Encounters, Legendary Encounters, and your Starters into your selected Favorite pokemon. There are some caveats:

* Replace your Starter pokemon with other base Starter Favorites of the same type (else random Favorite of the same type)
* Replace Legendary encounters with Sub Legendarys, Legendary, Mythics, and Pseudo Legendaries (if there's room). It'll fill extra slots with duplicate legendaries (uses random Favorite pokemon if you didn't favorite any Legendaries)
* Randomize Wild Encounters from your Favorites list (excluding base Starters and Sub Legendaries/Legendaries/Mythics) (levels and encounter rates are the same as base game)
* Randomize Trainer pokemon (keep levels and stats)
* Randomize Gym Leader and Elite Four pokemon, but within their type. (if you did not favorite that type, then they get fully randomized)
* Evolutions are limited to what you have Favorited. This has some unique behaviour.
    * Starters will follow the path of your favorited starters. Meaning if you choose Mudkip as your base water starter, and Wartortal as your 2nd stage, and Primarina as your 3rd, Mudkip will evolve into Wartortal who will evolve into Primarina. This goes for all 3 stages of your 3 different typed starters (if there's multiple options it'll randomly choose a path).
    * Evolutions not favorited will be removed. i.e. if you have an Onyx as a favorite, but not a Steelix, the option to evolve Onyx will be removed from the game.
        * This includes branching Evolutions. i.e. if you have Slowpoke and Slowbrow favorited, but not Slowking, the option to evolve Slowpoke to Slowking will be removed.
    * If you skip a stage they will be removed, but the next stage will also be moved down. i.e. If you have Gastly and Gengar favorited, but not Haunter. Then Gastly will be updated so that when it would evolve into Haunter it will instead evolve into Gengar.
* Randomize competition pokemon
* Randomize world pokemon (i.e. static fights, bought, npc traded)
* Add item LINKING_CABLE to the Department Store (to be able to evolve pokemon that require trading)
* Start with Running Shoes
* Use National PokeDex
* No other changes have been made (i.e. Moves, Stats, Items... etc.)

### Export and build FireRed ROM

1. Choose your favorites (hopefully at least 3 of the different type of base Starters, a few Legendaries, and some extra pokemon)
2. Go to the Favorites tab and click "Export FireRed ROM". This will download a FireRedROMFiles.zip with your custom files. Unzip the folder.
3. Setup PokeFireRed Extension (https://github.com/cawtds/pokefirered-expansion) (Full install instructions can be found here: https://github.com/rh-hideout/pokeemerald-expansion/blob/upcoming/INSTALL.md but I'll go over base setup for Windows) (do only once)
    1. Open command prompt/power shell and navigate to a folder you want to download the PokeFireRed Expansion to
    2. Download `git clone https://github.com/cawtds/pokefirered-expansion`
    3. Change directory `cd pokefirered-expansion`
    4. Install WSL on Windows (https://learn.microsoft.com/en-us/windows/wsl/install). 
        1. Open PowerShell as Admin
        2. Run `wsl --install`
        3. Restart PC
        4. Open PowerShell as Admin and run `wsl`. Follow instructions (make username/password). This should start the WSL instance right away.
        5. Run `sudo apt update && sudo apt install build-essential` (this allows you to run the `make` command to build the ROM).
        6. You may need to run the following:
            1. `sudo apt update && sudo apt install gcc-arm-none-eabi pkg-config libpng-dev`
            2. `sudo apt update`
            3. `sudo apt upgrade`
        7. Navigate to your `pokefirered-expansion` folder
    5. Keep this window open (you can get back to your WSL instance in Power Shell by running `wsl`)
4. Copy the unzipped "data" and "src" folder from FireRedRomFiles into your "pokefirered-expansion" folder and replace all files.
5. Build your ROM: Back in the Command Promp / WSL instance run the command `make`. This will build your custom "pokefirered.gba" and "pokefirered.elf" files. This takes between 5 - 10 minutes to compile.

### Export and build Emerald ROM

1. Choose your favorites (hopefully at least 3 of the different type of base Starters, a few Legendaries, and some extra pokemon, hopefully a few of each type)
2. Go to the Favorites tab and click "Export Emerald ROM". This will download a EmeraldROMFiles.zip with your custom files. Unzip the folder.
3. Setup PokeEmerald Extension (https://github.com/rh-hideout/pokeemerald-expansion) (Full install instructions can be found here: https://rh-hideout.github.io/pokeemerald-expansion/INSTALL.html but I'll go over base setup for Windows) (do only once)
    1. Open command prompt/power shell and navigate to a folder you want to download the PokeEmerald Expansion to
    2. Download `git clone https://github.com/rh-hideout/pokeemerald-expansion`
    3. Change directory `cd pokeemerald-expansion`
        4. Install WSL on Windows (https://learn.microsoft.com/en-us/windows/wsl/install). 
        1. Open PowerShell as Admin
        2. Run `wsl --install`
        3. Restart PC
        4. Open PowerShell as Admin and run `wsl`. Follow instructions (make username/password). This should start the WSL instance right away.
        5. Run `sudo apt update && sudo apt install build-essential` (this allows you to run the `make` command to build the ROM).
        6. You may need to run the following:
            1. `sudo apt update && sudo apt install gcc-arm-none-eabi pkg-config libpng-dev`
            2. `sudo apt update`
            3. `sudo apt upgrade`
        7. Navigate to your `pokefirered-expansion` folder
    5. Keep this window open (you can get back to your WSL instance in Power Shell by running `wsl`)
4. Copy the unzipped "data" and "src" folder from EmeraldRomFiles into your "pokeemerald-expansion" folder and replace all files.
5. Build your ROM: Back in the Command Promp / WSL instance run the command `make`. This will build your custom "pokeemerald.gba" and "pokeemerald.elf" files. This takes between 5 - 10 minutes to compile.

And you should be good to go! Have fun playing your custom Pokemon Rom in your favorite emulator.

## Export Ultimate 151 FireRed Expansion ROM

Intended for use with:
* Pokemon FireRed (Expansion) (https://github.com/cawtds/pokefirered-expansion)

If you want to play a custom ROM of Pokemon FireRed (Expansion) (https://github.com/cawtds/pokefirered-expansion) of your selected Favorites there's no easy way to do it. But if you use this feature you'll get a .zip file with the nessesary files to change all 151 origional Pokemon (be it Starter, Wild, Trainer... etc.) with your selected Favorite pokemon. There are some caveats:

* All Pokemon are swapped 1 to 1 from your selected Ultimate 151 list. This includes swapping out the following:
    * Starters
    * Trainer's teams
    * Gym Leaders/Elite 4 teams
    * Battle Tower teams
    * Legendary encounters
    * Static Pokemon (i.e. Snorlax)
    * NPC Pokemon (including Trades, quests, etc.)
    * Bought Pokemon (gambling center)
* Evolutions will follow the origional 151 logic, but swapped out the Pokemon for your 1 to 1 trades. Example: If you kept Abra and Alakazam, but you swapped out Kadabra for Gothorita, then Abra will evolve into Gothorita at level 16, and Gothorita will evolve into Alakazam when traded (or use the New item Linking Cord) (following how Kadabra would have normally evolved into Alakazam).
* Add item LINKING_CABLE to the Department Store (to be able to evolve pokemon that require trading)
* Start with Running Shoes
* Use National PokeDex
* No other changes have been made (i.e. Moves, Stats, Items... etc.)

Steps:

1. Choose your favorites to help narrow down your list
2. Go to the Ultimate 151 tab and click "Export Ultimate FireRed ROM". This will download a Ultiamte151FireRedROMFiles.zip with your custom files. Unzip the folder.
3. Setup PokeFireRed Extension (https://github.com/cawtds/pokefirered-expansion) (Full install instructions can be found here: https://github.com/rh-hideout/pokeemerald-expansion/blob/upcoming/INSTALL.md but I'll go over base setup for Windows) (do only once)
    1. Open command prompt/power shell and navigate to a folder you want to download the PokeFireRed Expansion to
    2. Download `git clone https://github.com/cawtds/pokefirered-expansion`
    3. Change directory `cd pokefirered-expansion`
    4. Install WSL on Windows (https://learn.microsoft.com/en-us/windows/wsl/install). 
        1. Open PowerShell as Admin
        2. Run `wsl --install`
        3. Restart PC
        4. Open PowerShell as Admin and run `wsl`. Follow instructions (make username/password). This should start the WSL instance right away.
        5. Run `sudo apt update && sudo apt install build-essential` (this allows you to run the `make` command to build the ROM).
        6. You may need to run the following:
            1. `sudo apt update && sudo apt install gcc-arm-none-eabi pkg-config libpng-dev`
            2. `sudo apt update`
            3. `sudo apt upgrade`
        7. Navigate to your `pokefirered-expansion` folder
    5. Keep this window open (you can get back to your WSL instance in Power Shell by running `wsl`)
4. Copy the unzipped "data" and "src" folder from Ultimate151FireRedRomFiles into your "pokefirered-expansion" folder and replace all files.
5. Build your ROM: Back in the Command Promp / WSL instance run the command `make`. This will build your custom "pokefirered.gba" and "pokefirered.elf" files. This takes between 5 - 20 minutes to compile.

And you should be good to go! Have fun playing your custom FireRed Rom in your favorite emulator.

#### Ultimate 151 Screenshots

![Sreenshot of the ultiamte 151 page](images/ultimate.png)

![Sreenshot of the ultiamte 151 chosen by GACKcon 2025](images/ultimate151_GACKcon2025.jpg)

[GACKcon 2025 Ultimate 151 chosen](images/ultimate151_pokemon_GACKcon2025.txt)

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **React Query:** A powerful data-fetching and state management library for React, used to handle asynchronous data fetching, caching, and background updates from the PokeAPI.
* **Redux Toolkit:** A set of tools that simplify Redux development, used for managing application state related to UI interactions and user preferences (like favorites).
* **React Router:** A standard library for routing in React applications.
* **React Icons:** Easily include popular icons in your React projects.
* **Dexie.js:** A minimalist wrapper for IndexedDB, used for persistent storage of user's favorite Pokemon.

## State Management and Data Persistence

* **React Query:** Manages asynchronous state related to fetching Pokemon data from the PokeAPI, including caching and background updates.
* **Redux Toolkit:** Manages synchronous state, such as:
  * User's favorite Pokemon (acting as an in-memory cache).
  * Search term used to filter the Pokemon list.
  * Currently selected Pokemon for details view.
* **Dexie.js:** Provides persistent storage for the user's favorite Pokemon, ensuring that favorites are saved across page refreshes and browser restarts. The Redux store is initialized with data from Dexie on app load, and updates to favorites are synchronized between Redux and Dexie.

This combined approach provides optimal performance and a clean separation of concerns.

## Installation

1. Clone the repository:

    ```bash
    git clone [invalid URL removed]
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    # or
    yarn start
    # or
    pnpm start
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## License

MIT
