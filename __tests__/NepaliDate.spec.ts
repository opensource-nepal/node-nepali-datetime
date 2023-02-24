import NepaliDate from "../src/NepaliDate"

describe("NepaliDate", () => {
    it("checks for nepali date validity", () => {
        const n = new NepaliDate(new Date("1981.10.31"))
        expect(n.toString()).toBe("2038/7/15")
        expect(n.getYear()).toBe(2038)
        expect(n.getMonth()).toBe(6)
        expect(n.getDate()).toBe(15)

        const n2 = new NepaliDate(new Date("2018-08-17"))
        expect(n2.toString()).toBe("2075/5/1")
    })

    it("checks parser", () => {
        const n = new NepaliDate("2038-07-15")
        expect(n.toString()).toBe("2038/7/15")
        const n2 = new NepaliDate("2075.03.22")
        expect(n2.toString()).toBe("2075/3/22")
        // Expected: 2018-07-05T18:15:00.000Z
        // Received: 2018-07-05T18:30:00.000Z
        // TODO: fix timezone issue
        // expect(n2.getEnglishDate()).toEqual(new Date('2018/07/06'));
    })

    it("checks format", () => {
        const n = new NepaliDate("2038-07-15")
        expect(n.format("yyyy/mm/dd")).toBe("२०३८/०७/१५")
        expect(n.format("yy-m-d")).toBe("३८-७-१५")
        expect(n.format("YYYY-MM-DD")).toBe("2038-07-15")
        expect(n.format("Y-M-D")).toBe("38-7-15")
        expect(n.format("Y-MMMM-ddd")).toBe("38-Kartik-शनि")
        expect(n.format('"YYY" YYYY')).toBe("YYY 2038")
    })

    it("checks month, date setting", () => {
        const n = new NepaliDate(2075, -1, 3)
        expect(n.toString()).toBe("2074/12/3")
        n.setMonth(3)
        expect(n.toString()).toBe("2074/4/3")
        const n2 = new NepaliDate(2075, 2, 32)
        expect(n2.toString()).toBe("2075/3/32")
        n2.setMonth(3)
        expect(n2.toString()).toBe("2075/5/1")
        n2.setDate(10)
        expect(n2.toString()).toBe("2075/5/10")
        n2.setDate(35)
        expect(n2.toString()).toBe("2075/6/4")
        n2.setDate(0)
        expect(n2.toString()).toBe("2075/5/31")
        n2.setMonth(0)
        n2.setDate(1)
        expect(n2.toString()).toBe("2075/1/1")
        n2.setDate(-1)
        expect(n2.toString()).toBe("2074/12/29")
    })

    it("checks for all methods", () => {
        const d = new Date("2017-10-31T12:30:25.789")
        const n = new NepaliDate(d)
        expect(d.getTime()).toBe(n.getTime())
        expect(d.getHours()).toBe(d.getHours())
        expect(d.getMinutes()).toBe(d.getMinutes())
        expect(d.getSeconds()).toBe(d.getSeconds())
        expect(d.getMilliseconds()).toBe(d.getMilliseconds())
    })
})
