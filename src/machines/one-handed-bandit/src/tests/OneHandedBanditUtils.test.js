import {
    findDistributionOfSlots,
    createCalculatePointsFn,
    createSelectRandomSlotValuesFn,
    createInitializeSpinnerIntervalsFn,
    getNextSlotsState,
    generateSlotGraph,
} from '../OneHandedBanditUtils';


describe('OneHandedBandit.Utils.findDistributionOfSlots', () => {
    it('should return a correct distribution', () => {
        const slots = ['banana', 'apple', 'banana', 'monkey', 'monkey', 'monkey'];
        const expectedDist = {
            banana: {
                indices: {
                    0: true,
                    2: true,
                },
                consecutive: 0,
                count: 2
            },
            apple: {
                indices: {
                    1: true,
                },
                consecutive: 0,
                count: 1,
            },
            monkey: {
                indices: {
                    3: true,
                    4: true,
                    5: true,
                },
                count: 3,
                consecutive: 2,
            }
        };

        expect(findDistributionOfSlots(slots)).toEqual(expectedDist);
    });
});

describe('OneHandedBandit.Utils.calculatePoints', () => {
    const rules = [
        (dist) => dist.first ? { match: true, amount: 200 } : { match: false },
        (dist) => dist.second ? { match: true, amount: 100 } : { match: false },
        () => ({ match: true, amount: 0 }),
    ];

    const calcFn1 = createCalculatePointsFn(() => ({ first: true }));
    const calcFn2 = createCalculatePointsFn(() => ({ second: true }));
    const calcFn3 = createCalculatePointsFn(() => ({}));

    
    it('should match the required rules and return the correct amount of points', () => {
        expect(calcFn1(null, rules)).toEqual(200);
        expect(calcFn2(null, rules)).toEqual(100);
        expect(calcFn3(null, rules)).toEqual(0);
    });
});

describe('OneHandedBandit.Utils.selectRandomSlotValues', () => {
    const ourRandomPickFn = (arr) => arr[0];

    const selectRandomSlotValues = createSelectRandomSlotValuesFn(ourRandomPickFn);

    it('should pick out n items from the array using the passed function', () => {
        expect(selectRandomSlotValues(3, ['a', 'b', 'c'])).toEqual(['a', 'a', 'a']);
    });
});

describe('OneHandedBandit.Utils.initializeSpinnerIntervals', () => {
    const getIntegerFn = () => 666;
    const intervalFn = jest.fn();
    const updateFn = jest.fn();
    const n = 5;
    const initializeSpinnerIntervals1 = createInitializeSpinnerIntervalsFn(getIntegerFn, intervalFn);
    const initializeSpinnerIntervals2 = createInitializeSpinnerIntervalsFn(() => 0, (fn) => fn());

    it('should call the setInterval n times with the specified delay', () => {
        initializeSpinnerIntervals1(n, () => {});

        expect(intervalFn).toHaveBeenCalledTimes(n);
        expect(intervalFn).toHaveBeenLastCalledWith(expect.any(Function), getIntegerFn());
    });

    it('should pass the index of the slot to the update fn', () => {
        initializeSpinnerIntervals2(1, updateFn);

        expect(updateFn).toHaveBeenCalledTimes(1);
        expect(updateFn).toHaveBeenLastCalledWith(0);
    });
});

describe('OneHandedBandit.Utils.getNextSlotsState', () => {
    const currentSlotsState = ['banana', 'monkey', 'apple'];
    const slotGraph = {
        monkey: 'apple'
    };
    const slotIndexToUpdate = 1;

    it('should perform the update correctly', () => {
        expect(getNextSlotsState({
            slotGraph,
            currentSlotsState,
            slotIndexToUpdate
        })).toEqual(['banana', 'apple', 'apple']);
    });
});

describe('OneHandedBandit.Utils.generateSlotGraph', () => {
    const slots = ['apple', 'monkey', 'banana'];
    const expectedGraph = {
        apple: 'monkey',
        monkey: 'banana',
        banana: 'apple',
    };
    
    it('should generate the graph correctly', () => {
        expect(generateSlotGraph(slots)).toEqual(expectedGraph);
    });
});