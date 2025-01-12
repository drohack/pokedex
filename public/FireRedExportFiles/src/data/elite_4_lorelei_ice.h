    [TRAINER_ELITE_FOUR_LORELEI] =
    {
        .trainerName = _("LORELEI"),
        .trainerClass = TRAINER_CLASS_ELITE_FOUR,
        .trainerPic = TRAINER_PIC_ELITE_FOUR_LORELEI,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_ELITE_FOUR,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .mugshotEnabled = TRUE,
        .mugshotColor = MUGSHOT_COLOR_PURPLE,
        .partySize = 5,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_DEWGONG,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 52,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_HAIL,
                MOVE_SAFEGUARD,
            },
            },
            {
            .species = SPECIES_CLOYSTER,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 51,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_SPIKES,
                MOVE_PROTECT,
                MOVE_HAIL,
                MOVE_DIVE,
            },
            },
            {
            .species = SPECIES_SLOWBRO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 52,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_AMNESIA,
                MOVE_YAWN,
            },
            },
            {
            .species = SPECIES_JYNX,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 54,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_PUNCH,
                MOVE_DOUBLE_SLAP,
                MOVE_LOVELY_KISS,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_LAPRAS,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 54,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_CONFUSE_RAY,
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_BODY_SLAM,
            },
            },
        },
    },
    [TRAINER_ELITE_FOUR_LORELEI_2] =
    {
        .trainerName = _("LORELEI"),
        .trainerClass = TRAINER_CLASS_ELITE_FOUR,
        .trainerPic = TRAINER_PIC_ELITE_FOUR_LORELEI,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_ELITE_FOUR,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .mugshotEnabled = TRUE,
        .mugshotColor = MUGSHOT_COLOR_PURPLE,
        .partySize = 5,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_DEWGONG,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 64,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_SIGNAL_BEAM,
                MOVE_DOUBLE_TEAM,
            },
            },
            {
            .species = SPECIES_CLOYSTER,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 63,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_SUPERSONIC,
                MOVE_RAIN_DANCE,
            },
            },
            {
            .species = SPECIES_PILOSWINE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 63,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_BLIZZARD,
                MOVE_EARTHQUAKE,
                MOVE_DOUBLE_EDGE,
                MOVE_ROCK_SLIDE,
            },
            },
            {
            .species = SPECIES_JYNX,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 66,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_PSYCHIC,
                MOVE_LOVELY_KISS,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_LAPRAS,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_CHERI_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 66,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ICE_BEAM,
                MOVE_SURF,
                MOVE_PSYCHIC,
                MOVE_THUNDER,
            },
            },
        },
    },