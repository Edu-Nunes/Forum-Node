import { WatchedList } from "./watched-list";


class NumberWachtedList extends WatchedList<number>{
    compareItems(a: number, b: number): boolean {
        return a === b
    }
}
describe('watchedt list', () =>{
    it('it should be able to create a watched list with initial items ', () => {
        const list = new NumberWachtedList([1,2,3])
        expect(list.currentItems).toHaveLength(3)
    })

    it('it should be able to add new items to the list  ', () => {
        const list = new NumberWachtedList([1,2,3])

        list.add(4)

        expect(list.currentItems).toHaveLength(4)
        expect(list.getNewItems()).toEqual([4])
    })
    it('it should be able to remove items to the list  ', () => {
        const list = new NumberWachtedList([1,2,3])

        list.remove(2)

        expect(list.currentItems).toHaveLength(2)
        expect(list.getRemovedItems()).toEqual([2])
    })
    it('it should be able to add a items even if was remove before   ', () => {
        const list = new NumberWachtedList([1,2,3])

        list.remove(2)
        list.add(2)

        expect(list.getRemovedItems()).toEqual([])
        expect(list.getRemovedItems()).toEqual([])
    })
    it('it should be able to remove a items even if was added before   ', () => {
        const list = new NumberWachtedList([1,2,3])

        list.add(4)
        list.remove(4)

        expect(list.currentItems).toHaveLength(3)
        expect(list.getRemovedItems()).toEqual([])
        expect(list.getRemovedItems()).toEqual([])
    })
    it('it should be able to updated a watched list items', () => {
        const list = new NumberWachtedList([1,2,3])

        list.update([1, 3, 5])

        expect(list.getRemovedItems()).toEqual([2])
        expect(list.getNewItems()).toEqual([5])
       
    })
})