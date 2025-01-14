    [TRAINER_FLANNERY_1] =
    {
        .trainerName = _("FLANNERY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_FLANNERY,
        .encounterMusic_gender = 
F_TRAINER_FEMALE | 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_HYPER_POTION, ITEM_HYPER_POTION },
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 4,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_NUMEL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(24, 24, 24, 24, 24, 24),
            .lvl = 24,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_TAKE_DOWN,
                MOVE_MAGNITUDE,
                MOVE_SUNNY_DAY,
            },
            },
            {
            .species = SPECIES_SLUGMA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(24, 24, 24, 24, 24, 24),
            .lvl = 24,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SMOG,
                MOVE_LIGHT_SCREEN,
                MOVE_SUNNY_DAY,
            },
            },
            {
            .species = SPECIES_CAMERUPT,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 26,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_TACKLE,
                MOVE_SUNNY_DAY,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_TORKOAL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(30, 30, 30, 30, 30, 30),
            .lvl = 29,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_BODY_SLAM,
                MOVE_ATTRACT,
            },
            },
        },
    },
    [TRAINER_FLANNERY_2] =
    {
        .trainerName = _("FLANNERY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_FLANNERY,
        .encounterMusic_gender = 
F_TRAINER_FEMALE | 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 4,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_MAGCARGO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 38,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_ATTRACT,
                MOVE_LIGHT_SCREEN,
                MOVE_ROCK_SLIDE,
            },
            },
            {
            .species = SPECIES_PONYTA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 36,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FLAMETHROWER,
                MOVE_ATTRACT,
                MOVE_SOLAR_BEAM,
                MOVE_BOUNCE,
            },
            },
            {
            .species = SPECIES_CAMERUPT,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 38,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EARTHQUAKE,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_TORKOAL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 40,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EXPLOSION,
                MOVE_ATTRACT,
            },
            },
        },
    },
    [TRAINER_FLANNERY_3] =
    {
        .trainerName = _("FLANNERY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_FLANNERY,
        .encounterMusic_gender = 
F_TRAINER_FEMALE | 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 5,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_GROWLITHE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 41,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_HELPING_HAND,
                MOVE_FLAMETHROWER,
                MOVE_ROAR,
                MOVE_SUNNY_DAY,
            },
            },
            {
            .species = SPECIES_MAGCARGO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 43,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_ATTRACT,
                MOVE_LIGHT_SCREEN,
                MOVE_ROCK_SLIDE,
            },
            },
            {
            .species = SPECIES_PONYTA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 41,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FLAMETHROWER,
                MOVE_ATTRACT,
                MOVE_SOLAR_BEAM,
                MOVE_BOUNCE,
            },
            },
            {
            .species = SPECIES_CAMERUPT,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 43,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EARTHQUAKE,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_TORKOAL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 45,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EXPLOSION,
                MOVE_ATTRACT,
            },
            },
        },
    },
    [TRAINER_FLANNERY_4] =
    {
        .trainerName = _("FLANNERY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_FLANNERY,
        .encounterMusic_gender = 
F_TRAINER_FEMALE | 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 6,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_HOUNDOUR,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 46,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ROAR,
                MOVE_SOLAR_BEAM,
                MOVE_TAUNT,
                MOVE_SUNNY_DAY,
            },
            },
            {
            .species = SPECIES_GROWLITHE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 46,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_HELPING_HAND,
                MOVE_FLAMETHROWER,
                MOVE_SUNNY_DAY,
                MOVE_ROAR,
            },
            },
            {
            .species = SPECIES_MAGCARGO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 48,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_ATTRACT,
                MOVE_LIGHT_SCREEN,
                MOVE_ROCK_SLIDE,
            },
            },
            {
            .species = SPECIES_RAPIDASH,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 46,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FLAMETHROWER,
                MOVE_ATTRACT,
                MOVE_SOLAR_BEAM,
                MOVE_BOUNCE,
            },
            },
            {
            .species = SPECIES_CAMERUPT,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 48,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EARTHQUAKE,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_TORKOAL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 50,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EXPLOSION,
                MOVE_ATTRACT,
            },
            },
        },
    },
    [TRAINER_FLANNERY_5] =
    {
        .trainerName = _("FLANNERY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_FLANNERY,
        .encounterMusic_gender = 
F_TRAINER_FEMALE | 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 6,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_ARCANINE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 51,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_HELPING_HAND,
                MOVE_FLAMETHROWER,
                MOVE_SUNNY_DAY,
                MOVE_ROAR,
            },
            },
            {
            .species = SPECIES_MAGCARGO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 53,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_ATTRACT,
                MOVE_LIGHT_SCREEN,
                MOVE_ROCK_SLIDE,
            },
            },
            {
            .species = SPECIES_HOUNDOOM,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 51,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ROAR,
                MOVE_SOLAR_BEAM,
                MOVE_TAUNT,
                MOVE_SUNNY_DAY,
            },
            },
            {
            .species = SPECIES_RAPIDASH,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 51,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FLAMETHROWER,
                MOVE_ATTRACT,
                MOVE_SOLAR_BEAM,
                MOVE_BOUNCE,
            },
            },
            {
            .species = SPECIES_CAMERUPT,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 53,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EARTHQUAKE,
                MOVE_ATTRACT,
            },
            },
            {
            .species = SPECIES_TORKOAL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_WHITE_HERB,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 55,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_OVERHEAT,
                MOVE_SUNNY_DAY,
                MOVE_EXPLOSION,
                MOVE_ATTRACT,
            },
            },
        },
    },