    [TRAINER_LEADER_ERIKA] =
    {
        .trainerName = _("ERIKA"),
        .trainerClass = TRAINER_CLASS_LEADER,
        .trainerPic = TRAINER_PIC_LEADER_ERIKA,
        .encounterMusic_gender = 
            TRAINER_ENCOUNTER_MUSIC_FEMALE,
        .items = { ITEM_HYPER_POTION, ITEM_FULL_HEAL },
        .doubleBattle = FALSE,
        .aiFlags = AI_FLAG_CHECK_BAD_MOVE | AI_FLAG_TRY_TO_FAINT | AI_FLAG_CHECK_VIABILITY,
        .partySize = 3,
        .party = (const struct TrainerMon[])
        {
            {
            .species = SPECIES_VICTREEBEL,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(0, 0, 0, 0, 0, 0),
            .lvl = 29,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_STUN_SPORE,
                MOVE_ACID,
                MOVE_POISON_POWDER,
                MOVE_GIGA_DRAIN,
            },
            },
            {
            .species = SPECIES_TANGELA,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(0, 0, 0, 0, 0, 0),
            .lvl = 24,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_POISON_POWDER,
                MOVE_CONSTRICT,
                MOVE_INGRAIN,
                MOVE_GIGA_DRAIN,
            },
            },
            {
            .species = SPECIES_VILEPLUME,
            .gender = TRAINER_MON_RANDOM_GENDER,
            .iv = TRAINER_PARTY_IVS(0, 0, 0, 0, 0, 0),
            .lvl = 29,
            .nature = NATURE_HARDY,
            .dynamaxLevel = MAX_DYNAMAX_LEVEL,
            .moves = {
                MOVE_SLEEP_POWDER,
                MOVE_ACID,
                MOVE_STUN_SPORE,
                MOVE_GIGA_DRAIN,
            },
            },
        },
    },