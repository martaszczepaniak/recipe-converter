import assert from 'assert';

const getWeights = (product) => (
  {
    milk: { cup: 200, tableSpoon: 20, spoon: 5 },
    flour: { cup: 250, tableSpoon: 25, spoon: 7 },
    cloves: { cup: 999, tableSpoon: 99, spoon: 9 }
  }[product]
)

const calculateAmounts = (product, weight) => {
  const weights = getWeights(product);
  let amounts = {};

  for (const weightType in weights) {
    amounts[weightType] = weight / weights[weightType];
  }

  return amounts;
}

const calculateWeights = (product, weightType, amount) => (
  getWeights(product)[weightType] * amount
)

describe('#getWeights()', () => {
  it('for milk returns an object with cup, tableSpoon and spoon weights', () => {
    const milkWeights = { cup: 200, tableSpoon: 20, spoon: 5 };
    assert.deepEqual(getWeights('milk'), milkWeights);
  });

  it('for flour returns an object with cup, tableSpoon and spoon weights', () => {
    const flourWeights = { cup: 250, tableSpoon: 25, spoon: 7 };
    assert.deepEqual(getWeights('flour'), flourWeights);
  });

  it('for cloves returns an object with cup, tableSpoon and spoon weights', () => {
    const clovesWeights = { cup: 999, tableSpoon: 99, spoon: 9 };
    assert.deepEqual(getWeights('cloves'), clovesWeights);
  });
});

describe('#calculateAmounts(product, weight)', () => {
  describe('for milk', () => {
    it('returns correct amounts', () => {
      const amountOfMilkFor50g = { cup: 0.25, tableSpoon: 2.5, spoon: 10 };
      const amountOfMilkFor100g = { cup: 0.5, tableSpoon: 5, spoon: 20 };
      assert.deepEqual(calculateAmounts('milk', 50), amountOfMilkFor50g);
      assert.deepEqual(calculateAmounts('milk', 100), amountOfMilkFor100g);
    })  
  })

  describe('for flour', () => {
    it('returns correct amounts', () => {
      const amountOfFlourFor50g = { cup: 0.2, tableSpoon: 2, spoon: 50/7 };
      const amountOfFlourFor100g = { cup: 0.4, tableSpoon: 4, spoon: 100/7 };
      assert.deepEqual(calculateAmounts('flour', 50), amountOfFlourFor50g);
      assert.deepEqual(calculateAmounts('flour', 100), amountOfFlourFor100g);
    })  
  })
});

describe('#calculateWeights(product, weightType, amount)', () => {
  describe('for flour', () => {
    describe('and cup', () => {
      it('returns correct weights', () => {
        const weightsOfFlourForHalfACup = 125;
        const weightsOfFlourForQuaterACup = 62.5;
        assert.deepEqual(calculateWeights('flour', 'cup', 1/2), weightsOfFlourForHalfACup);
        assert.deepEqual(calculateWeights('flour', 'cup', 1/4), weightsOfFlourForQuaterACup);
      });
    });

    describe('and spoon', () => {
      it('returns correct weights', () => {
        const weightsOfFlourFor1Spoon = 7;
        const weightsOfFlourFor5Spoons = 35;

        assert.deepEqual(calculateWeights('flour', 'spoon', 1), weightsOfFlourFor1Spoon);
        assert.deepEqual(calculateWeights('flour', 'spoon', 5), weightsOfFlourFor5Spoons);
      })
    })
  })
});
