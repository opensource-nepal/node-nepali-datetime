import NepaliDate from '../src/NepaliDate';

describe('NepaliDate', () => {
  it('checks for nepali date validity', () => {
    const n = new NepaliDate(new Date('1981-10-31'));
    expect(n.toString()).toBe('2038/7/15');
    expect(n.getYear()).toBe(2038);
    expect(n.getMonth()).toBe(6);
    expect(n.getDate()).toBe(15);
  });

  it('checks parser', () => {
    const n = new NepaliDate('2038-07-15');
    expect(n.toString()).toBe('2038/7/15');
    const n2 = new NepaliDate('2075.03.22');
    expect(n2.toString()).toBe('2075/3/22');
    expect(n2.getEnglishDate()).toEqual(new Date('2018-07-06'));
  });

  it('checks format', () => {
    const n = new NepaliDate('2038-07-15');
    console.log(n.format('mmmm'))
    expect(n.format('yyyy/mm/dd')).toBe('२०३८/०७/१५');
    expect(n.format('yy-m-d')).toBe('३८-७-१५');
    expect(n.format('YYYY-MM-DD')).toBe('2038-07-15');
    expect(n.format('Y-M-D')).toBe('38-7-15');
    expect(n.format('Y-MMMM-ddd')).toBe('38-Kartik-शनि');
  });
});
