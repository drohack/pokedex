## Export Emerald ROM

If you want to play a custom ROM of Pokemon Emerald (Expansion) (https://github.com/rh-hideout/pokeemerald-expansion) of your selected Favorites there's no easy way to do it. But if you use this feature you'll get a .zip file with the nessesary files to change all Wild Encounters, Legendary Encounters, and your Starters into your selected Favorite pokemon. There are some caveats:

* It will only replace your Starter pokemon with other base Starter Favorites (else default back to Emerald Starters)
* It will only replace Legendary encounters with Sub Legendarys, Legendary, Mythics, and Pseudo Legendaries (if there's room). It'll fill extra slots with duplicate legendaries (default to base Emerald Legendaries if you didn't favorite any)
* It will randomize Wild Encounters from your Favorites list (excluding base Starters and Sub Legendaries/Legendaries/Mythics) (levels and encounter rates are the same as base Emerald)
* No other changes have been made (i.e. Moves, Trainers, Gyms, Events... etc.)

Steps:

1. Choose your favorites (hopefully at least 3 of the different type of base Starters, a few Legendaries, and some extra pokemon)
2. Go to the Favorites tab and click "Export Emerald ROM". This will download a EmeraldROMFiles.zip with your custom files. Unzip the folder.
3. Setup PokeEmerald Extension (https://github.com/rh-hideout/pokeemerald-expansion) (Full install instructions can be found here: https://rh-hideout.github.io/pokeemerald-expansion/INSTALL.html but I'll go over base setup for Windows) (do only once)
    1. Open command prompt/power shell and navigate to a folder you want to download the PokeEmerald Expansion to
    2. Download `git clone https://github.com/rh-hideout/pokeemerald-expansion`
    3. Change directory `cd pokeemerald-expansion`
    4. Install WSL on Windows (https://learn.microsoft.com/en-us/windows/wsl/install). Run `wsl --install`. Follow instructions (make username/password). This should start the WSL instance right away. Run the following command to install everything you need `sudo apt update && sudo apt install build-essential` (this allows you to run the `make` command).
    5. Keep this window open
4. Copy the unzipped "data" and "src" folder from EmeraldRomFiles into your "pokeemerald-expansion" folder and replace all 14 files.
5. Build your ROM: Back in the Command Promp / WSL instance run the command `make`. This will build your custom "pokeemerald.gba" file. This takes between 5 - 10 minutes to compile.

And you should be good to go! Have fun playing your custom Emerald Rom.