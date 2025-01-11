    [TRAINER_RIVAL_OAKS_LAB_SQUIRTLE] =
    {
        .trainerName = _("TERRY"),
        .trainerClass = TRAINER_CLASS_RIVAL_EARLY,
        .trainerPic = TRAINER_PIC_RIVAL_EARLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .partySize = 1,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_SQUIRTLE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(0, 0, 0, 0, 0, 0),
            .lvl = 5,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_TAIL_WHIP,
            },
            },
        },
    },
    [TRAINER_RIVAL_ROUTE22_EARLY_SQUIRTLE] =
    {
        .trainerName = _("TERRY"),
        .trainerClass = TRAINER_CLASS_RIVAL_EARLY,
        .trainerPic = TRAINER_PIC_RIVAL_EARLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .partySize = 2,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_PIDGEY,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(6, 6, 6, 6, 6, 6),
            .lvl = 9,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_SAND_ATTACK,
            },
            },
            {
            .species = SPECIES_SQUIRTLE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(6, 6, 6, 6, 6, 6),
            .lvl = 9,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_TAIL_WHIP,
            },
            },
        },
    },
    [TRAINER_RIVAL_CERULEAN_SQUIRTLE] =
    {
        .trainerName = _("TERRY"),
        .trainerClass = TRAINER_CLASS_RIVAL_EARLY,
        .trainerPic = TRAINER_PIC_RIVAL_EARLY,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_MALE,
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .partySize = 4,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_PIDGEOTTO,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(6, 6, 6, 6, 6, 6),
            .lvl = 17,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_SAND_ATTACK,
                MOVE_GUST,
                MOVE_QUICK_ATTACK,
            },
            },
            {
            .species = SPECIES_ABRA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(6, 6, 6, 6, 6, 6),
            .lvl = 16,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TELEPORT,
            },
            },
            {
            .species = SPECIES_RATTATA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(6, 6, 6, 6, 6, 6),
            .lvl = 15,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_TAIL_WHIP,
                MOVE_QUICK_ATTACK,
            },
            },
            {
            .species = SPECIES_SQUIRTLE,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(12, 12, 12, 12, 12, 12),
            .lvl = 18,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_TACKLE,
                MOVE_TAIL_WHIP,
                MOVE_WITHDRAW,
                MOVE_WATER_GUN,
            },
            },
        },
    },