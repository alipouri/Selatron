import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CARTEL_TIERS,
  TOTAL_INITIAL_SUPPLY,
  getSquadMathBreakdown,
  getVotingPowerForTier,
  calculateAscensionSupplyImpact,
  canAscend
} from './cartelLogic.ts';

test('total supply and tier distribution match project brief', () => {
  const sumSupply = Object.values(CARTEL_TIERS).reduce((acc, t) => acc + t.supply, 0);
  assert.equal(sumSupply, TOTAL_INITIAL_SUPPLY, 'Sum of all tiers must equal 3,333');
  assert.equal(CARTEL_TIERS.kingpin.supply, 33);
  assert.equal(CARTEL_TIERS.godmother.supply, 169);
  assert.equal(CARTEL_TIERS.member.supply, 469);
  assert.equal(CARTEL_TIERS.rookie.supply, 2662);
});

test('voting power multipliers match project specifications', () => {
  assert.equal(getVotingPowerForTier('kingpin'), 50);
  assert.equal(getVotingPowerForTier('godmother'), 15);
  assert.equal(getVotingPowerForTier('member'), 5);
  assert.equal(getVotingPowerForTier('rookie'), 1);
});

test('squad patronage mathematics exactly matches 2,662 rookies across 469 captains', () => {
  const math = getSquadMathBreakdown();
  assert.equal(math.totalCaptains, 469, 'Total captains must equal 469');
  assert.equal(math.squadsOf5, 152);
  assert.equal(math.squadsOf6, 317);
  assert.equal(math.totalRookies, 2662, 'Total supervised rookies must equal 2662');
});

test('3-for-1 ascension burn reduces supply by 2 per ascension', () => {
  // 1 ascension: burns 3 rookies, mints 1 member => net reduction 2
  const single = calculateAscensionSupplyImpact(3333, 1);
  assert.equal(single.burnedRookies, 3);
  assert.equal(single.mintedMembers, 1);
  assert.equal(single.netReduction, 2);
  assert.equal(single.newSupply, 3331);

  // 10 ascensions: burns 30, mints 10 => net reduction 20
  const multiple = calculateAscensionSupplyImpact(3333, 10);
  assert.equal(multiple.netReduction, 20);
  assert.equal(multiple.newSupply, 3313);
});

test('ascension validation rejects invalid rookie selections', () => {
  assert.equal(canAscend([101, 102]).valid, false, 'Needs exactly 3 rookies');
  assert.equal(canAscend([101, 102, 101]).valid, false, 'Rejects duplicates');
  assert.equal(canAscend([101, 102, 103]).valid, true, 'Valid with 3 distinct IDs');
});
