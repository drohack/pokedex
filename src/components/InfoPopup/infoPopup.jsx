import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from "./infoPopup.module.css";

const InfoPopup = ({ onClose }) => {
  return (
    <div className={styles.infoPopup} onClick={onClose}>
      <div className={styles.infoPopupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <div id="info-popup" className={styles.popup}>
            <h2 className={styles.centerText}>Drohack's Pokédex</h2>
            <p>
                This tool provides advanced Pokémon filtering, an expanded search list, and the ability to export your <strong>Favorites list</strong> as a text file 
                or for use in a <strong>semi-randomized Pokémon FireRed or Emerald Expanded ROM</strong>. And for the final challege create your own 
                <strong> Ultimate 151 Pokémon</strong> list swapping out the original Kanto Pokémon 1 to 1 with your own. Do you want all Legendaries, just Little Guys, 
                or have you and your friends decied. It's up to you.
            </p>
            
            <h3>Key Features:</h3>
            <ul>
                <li><strong>Advanced Filtering:</strong> Search by region, type, starter and legendary status.</li>
                <li><strong>Favorites System:</strong> Add, remove, lock, and export Pokémon.</li>
                  <ul>
                    <li>Export Custom ROM files to be used to generate a custom <a href="https://github.com/cawtds/pokefirered-expansion" target="_blank" rel="noopener noreferrer">FireRed</a>
                      or <a href="https://github.com/rh-hideout/pokeemerald-expansion" target="_blank" rel="noopener noreferrer">Emerlad</a> Expansion ROM.
                      Featuring a semi random selection of your Favorite Pokémon.</li>
                  </ul>
                <li><strong>Ultimate 151:</strong> Swap out Kanto region pokemon 1 to 1 for your favoties.</li>
                  <ul>
                    <li>Export Custom ROM files to be used to generate a custom <a href="https://github.com/cawtds/pokefirered-expansion" target="_blank" rel="noopener noreferrer">FireRed</a> Expansion ROM.
                    Swapping out 1 for 1 your selected Ultimate 151 for Kanto's. Including (but not limited to):<br/>
                    Your Starters, Wild Pokémon, Trainer's Pokémon, Gym Leaders/Elite 4 teams, Static Pokémon (in the wild, in stores, NPC trades)... etc.<br/>
                    Evolutions will follow the Kanto's Pokémon logic, but the Pokémon themselves will be swapped out with your Ultimate choice.
                    </li>
                  </ul>
            </ul>
            (read the README included with your exported files for more information)
            
            <p>
                This tool was created for the <strong>GACKcon 2025 panel</strong>: 
                <em> "Narrowing Down to the Ultimate 151 Pokémon!"</em><br/>
                --With over 1000 Pokémon, there must be great ones in every generation. Join us as we refine the perfect 151!--
            </p>
            <p>
                <a href="https://github.com/drohack/pokedex" target="_blank" rel="noopener noreferrer">
                    Visit the GitHub Repository
                </a>
                <br/>
                <a href="https://github.com/kevveth/pokedex" target="_blank" rel="noopener noreferrer">
                    Based on kevveth's GitHub Repository
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;