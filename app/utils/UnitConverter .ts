enum Unit {
  M3 = 'm³',
  TON = 'ton',
  LITER = 'liter'
}
class UnitConverter {
  strategies: { 'm³': (value: any) => any; ton: (value: any) => number; liter: (value: any) => number; };
  unit: Unit;
  constructor(unit: Unit) {

    this.strategies = {
      'm³': value => value,
      'ton': value => value * 1.0,
      'liter': value => value * 1000
    };
    this.unit = unit;
  }
  convert(value: number) {
    return this.strategies[this.unit](value);
  }
}
export default new UnitConverter(Unit.M3)
