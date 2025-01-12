    [TRAINER_BRAWLY_1] =
    {
        .trainerName = _("BRAWLY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_BRAWLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .items = { ITEM_SUPER_POTION, ITEM_SUPER_POTION },
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 3,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_MACHOP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(12, 12, 12, 12, 12, 12),
            .lvl = 16,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_KARATE_CHOP,
                MOVE_LOW_KICK,
                MOVE_SEISMIC_TOSS,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MEDITITE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(12, 12, 12, 12, 12, 12),
            .lvl = 16,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FOCUS_PUNCH,
                MOVE_LIGHT_SCREEN,
                MOVE_REFLECT,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MAKUHITA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(24, 24, 24, 24, 24, 24),
            .lvl = 19,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_ARM_THRUST,
                MOVE_VITAL_THROW,
                MOVE_REVERSAL,
                MOVE_BULK_UP,
            },
            },
        },
    },
    [TRAINER_BRAWLY_2] =
    {
        .trainerName = _("BRAWLY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_BRAWLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 4,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_MACHAMP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 33,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_KARATE_CHOP,
                MOVE_ROCK_SLIDE,
                MOVE_FOCUS_PUNCH,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MEDITITE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 33,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PSYCHIC,
                MOVE_LIGHT_SCREEN,
                MOVE_REFLECT,
                MOVE_FOCUS_PUNCH,
            },
            },
            {
            .species = SPECIES_HITMONTOP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 35,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PURSUIT,
                MOVE_COUNTER,
                MOVE_PROTECT,
                MOVE_TRIPLE_KICK,
            },
            },
            {
            .species = SPECIES_HARIYAMA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 37,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FAKE_OUT,
                MOVE_FOCUS_PUNCH,
                MOVE_BELLY_DRUM,
                MOVE_EARTHQUAKE,
            },
            },
        },
    },
    [TRAINER_BRAWLY_3] =
    {
        .trainerName = _("BRAWLY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_BRAWLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 4,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_MACHAMP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 38,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_KARATE_CHOP,
                MOVE_ROCK_SLIDE,
                MOVE_FOCUS_PUNCH,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MEDICHAM,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 38,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PSYCHIC,
                MOVE_LIGHT_SCREEN,
                MOVE_REFLECT,
                MOVE_FOCUS_PUNCH,
            },
            },
            {
            .species = SPECIES_HITMONTOP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 40,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PURSUIT,
                MOVE_COUNTER,
                MOVE_PROTECT,
                MOVE_TRIPLE_KICK,
            },
            },
            {
            .species = SPECIES_HARIYAMA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 42,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FAKE_OUT,
                MOVE_FOCUS_PUNCH,
                MOVE_BELLY_DRUM,
                MOVE_EARTHQUAKE,
            },
            },
        },
    },
    [TRAINER_BRAWLY_4] =
    {
        .trainerName = _("BRAWLY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_BRAWLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 5,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_HITMONCHAN,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 40,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_SKY_UPPERCUT,
                MOVE_PROTECT,
                MOVE_FIRE_PUNCH,
                MOVE_ICE_PUNCH,
            },
            },
            {
            .species = SPECIES_MACHAMP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 43,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_KARATE_CHOP,
                MOVE_ROCK_SLIDE,
                MOVE_FOCUS_PUNCH,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MEDICHAM,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 43,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FOCUS_PUNCH,
                MOVE_LIGHT_SCREEN,
                MOVE_REFLECT,
                MOVE_PSYCHIC,
            },
            },
            {
            .species = SPECIES_HITMONTOP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 45,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PURSUIT,
                MOVE_COUNTER,
                MOVE_PROTECT,
                MOVE_TRIPLE_KICK,
            },
            },
            {
            .species = SPECIES_HARIYAMA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 47,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FAKE_OUT,
                MOVE_FOCUS_PUNCH,
                MOVE_BELLY_DRUM,
                MOVE_EARTHQUAKE,
            },
            },
        },
    },
    [TRAINER_BRAWLY_5] =
    {
        .trainerName = _("BRAWLY"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_BRAWLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .items = { ITEM_FULL_RESTORE, ITEM_FULL_RESTORE, ITEM_FULL_RESTORE },
        .doubleBattle = TRUE,
        .aiFlags = AI_FLAG_BASIC_TRAINER,
        .partySize = 6,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_HITMONLEE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 46,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_MEGA_KICK,
                MOVE_FOCUS_PUNCH,
                MOVE_EARTHQUAKE,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_HITMONCHAN,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 46,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_SKY_UPPERCUT,
                MOVE_PROTECT,
                MOVE_FIRE_PUNCH,
                MOVE_ICE_PUNCH,
            },
            },
            {
            .species = SPECIES_MACHAMP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 48,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_CROSS_CHOP,
                MOVE_ROCK_SLIDE,
                MOVE_FOCUS_PUNCH,
                MOVE_BULK_UP,
            },
            },
            {
            .species = SPECIES_MEDICHAM,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 48,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FOCUS_PUNCH,
                MOVE_LIGHT_SCREEN,
                MOVE_REFLECT,
                MOVE_PSYCHIC,
            },
            },
            {
            .species = SPECIES_HITMONTOP,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 50,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_PURSUIT,
                MOVE_COUNTER,
                MOVE_PROTECT,
                MOVE_TRIPLE_KICK,
            },
            },
            {
            .species = SPECIES_HARIYAMA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .heldItem = ITEM_SITRUS_BERRY,
            .iv = TRAINER_PARTY_IVS(31, 31, 31, 31, 31, 31),
            .lvl = 52,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_FAKE_OUT,
                MOVE_FOCUS_PUNCH,
                MOVE_BELLY_DRUM,
                MOVE_EARTHQUAKE,
            },
            },
        },
    },