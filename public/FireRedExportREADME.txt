## Export FireRed ROM

If you want to play a custom ROM of Pokemon FireRed (Expansion) (https://github.com/cawtds/pokefirered-expansion) of your selected Favorites there's no easy way to do it. But if you use this feature you'll get a .zip file with the nessesary files to change all Wild Encounters, Legendary Encounters, and your Starters into your selected Favorite pokemon. There are some caveats:

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
* No other changes have been made (i.e. Moves, Stats, Items... etc.)

Steps:

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
        6. Navigate to your `pokefirered-expansion` folder
    5. Keep this window open (you can get back to your WSL instance in Power Shell by running `wsl`)
4. Copy the unzipped "data" and "src" folder from FireRedRomFiles into your "pokefirered-expansion" folder and replace all 23 files.
5. Build your ROM: Back in the Command Promp / WSL instance run the command `make`. This will build your custom "pokefirered.gba" and "pokefirered.elf" files. This takes between 5 - 10 minutes to compile.

And you should be good to go! Have fun playing your custom FireRed Rom in your favorite emulator.