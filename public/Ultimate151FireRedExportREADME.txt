## Export Ultiamte 151 FireRed ROM

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