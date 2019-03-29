export const SPINNING_TIME = 10 * 1000;
export const STAND_BY_TIME = 5 * 1000;

export const SLOTS_COUNT = 3;

export const WINNING_RULES = [
    ( slotsDist ) => {
        // ie if all slots match.
        return ( Object.keys(slotsDist).length === 1 )
            ? { match: true, amount: 100 }
            : { match: false };
    },
    ( slotsDist ) => {
        // if we have at least one consecutive symbol.
        return ( Object.values(slotsDist).find((slotDist) => slotDist.consecutive > 0) )
            ? { match: true, amount: 20 }
            : { match: false };
    },
    ( slotsDist ) => {
        // if we have at least one symbol with count > 1.
        return ( Object.values(slotsDist).find((slotDist) => slotDist.count > 1) )
            ? { match: true, amount: 10 }
            : { match: false };
    },
    // default case, we get 0
    () => ({ match: true, amount: 0 }),
];
