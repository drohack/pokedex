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
                Enhanced by <strong>drohack</strong>, this tool provides advanced Pokémon filtering, <br/>
                an expanded search list, and the ability to export your <strong>Favorites list</strong> as a text file <br/>
                or for use in a <strong>semi-randomized Pokémon FireRed or Emerald Expanded ROM</strong>.
            </p>
            
            <h3>Key Features:</h3>
            <ul>
                <li><strong>Advanced Filtering:</strong> Search by region, type, and legendary status.</li>
                <li><strong>Favorites System:</strong> Add, remove, lock, and export Pokémon.</li>
                <li><strong>Custom ROM Export:</strong> Generate modified game files featuring your selected Pokémon to generate your ROM.<br/>
                (read the README included with your exported files for more information)</li>
            </ul>
            
            <p>
                This tool was created for the <strong>GACKcon 2025 panel</strong>: 
                <em> "Narrowing Down to the Ultimate 151 Pokémon!"</em><br/>
                With over 1000 Pokémon, there must be great ones in every generation. Join us as we refine the perfect 151!
            </p>
            <p>
                <a href="https://github.com/drohack/pokedex" target="_blank" rel="noopener noreferrer">
                    Visit the GitHub Repository
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;