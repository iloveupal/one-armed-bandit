import chance from 'Utils/chance';

/**
 * Will return a distribution of the slots by value.
 * 
 * @param {Array<string>} slots 
 */
export const findDistributionOfSlots = (slots) => {
    // see at which indices each of the slots occur in the row.
    // this structure can help us scale for a larger amount of slots.
    /*
    *   from the slots state ['banana', 'banana', 'orange']
    *   we should get a structure like {
            banana: {
                count: 2,
                indices: {
                    1: true,
                    0: true,
                },
                consecutive: 1,
            },
            orange: {
                count: 1,
                indices: {
                    2: true,
                },
                consecutive: 0,
            },
        }
    */
    return slots.reduce((acc, curr, index) => {
        if ( !acc[curr] ) {
            acc[curr] = {
                count: 0,
                indices: {},
                consecutive: 0,
            }
        }

        const currentAccumulator = acc[curr];

        acc[curr] = {
            count: currentAccumulator.count + 1,
            indices: {
                ...currentAccumulator.indices,
                [index]: true,
            },
            consecutive: ( currentAccumulator.indices[index - 1] )
                ? currentAccumulator.consecutive + 1
                : currentAccumulator.consecutive,
        }

        return acc;
    }, {});
};

/**
 * create a calculate function with custom distributor.
 * 
 * @param {Function} findDistributionOfSlotsFn function that is used to generate the dist from the slots
 */
export const createCalculatePointsFn = (findDistributionOfSlotsFn) => (slots, rules) => {
    const slotsDist = findDistributionOfSlotsFn(slots);
    // for-of seems a better approach because it can quit whenever we want it to 
    // (Array.prototype.forEach can't) and
    // isn't obliged to return anything Array.prototype.find or Array.prototype.some.
    // so semantically it seems a better fit in this case.
    for ( let rule of rules ) {
        const { match, amount } = rule(slotsDist);
        if ( match ) {
            return amount || 0;
        }
    }
}

/**
 * Will calculate the points by the rules. The last rule should always succeed.
 * 
 * @param {Array<string>} slots 
 * @param {Array<Function>} rules 
 */
export const calculatePoints = createCalculatePointsFn(findDistributionOfSlots);


/**
 * A pure function that can be tested.
 * 
 * @param {Function} pickFn A function that picks a random element from the array.
 */
export const createSelectRandomSlotValuesFn = (pickFn) => (count, possibleValues) => (new Array(count)).fill(0).map(() => pickFn(possibleValues));

/**
 * Selects random values for the slots from the possible ones.
 * @param {number} count Slots count
 * @param {Array<string>} possibleValues Possible values for the slot
 */
export const selectRandomSlotValues = createSelectRandomSlotValuesFn((...args) => chance.pickone(...args));

/**
 * A pure version for testing
 * 
 * @param {Function} getIntegerFn A function to get a random integer in the range of { min, max }
 * @param {*} setIntervalFn A function to create an interval timer 
 */
export const createInitializeSpinnerIntervalsFn = (getIntegerFn, setIntervalFn) => (count, updateFn) => {
    return (new Array(count)).fill(0).map((_, index) => setIntervalFn(() => updateFn(index), getIntegerFn({ min: 50, max: 100, })))
};

/**
 * Launches the intervals that will update the slots at independent frequencies.
 * @param {number} count Amount of independent slots to spin. I chose different speeds for each one, otherwise it makes no sense.
 * @param {Function} updateFn Function to call when it's time for the slot to update. Will be called with the index param.
 */
export const initializeSpinnerIntervals = createInitializeSpinnerIntervalsFn((...args) => chance.integer(...args), setInterval);

/**
 * Will return a new array of slots given the current array, the graph and an index of the slot to update.
 * 
 * @param {Array<string>} options.currentSlotsState
 * @param {Map<string, string>} options.slotGraph
 * @param {number} options.slotIndexToUpdate
 */
export const getNextSlotsState = ({
    currentSlotsState,
    slotGraph,
    slotIndexToUpdate,
}) => {
    return currentSlotsState.map((value, index) => (index === slotIndexToUpdate) ? slotGraph[value] : value);
};

/**
 * Will generate a structure that will allow a faster O(1) instead of O(n) lookup of the next element in the slot wheel.
 * @param {Array<string>} possibleSlots An *ordered* array of slots. 
 */
export const generateSlotGraph = (possibleSlots) => {
    return possibleSlots.reduce((acc, curr, index, arr) => {
        acc[curr] = (index === (arr.length - 1)) ? arr[0] : arr[index + 1];

        return acc;
    }, {});
};
