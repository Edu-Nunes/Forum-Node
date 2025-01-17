import { Either, left, right } from "./either"


function doSomething(x: Boolean) : Either<string, number >{
    if (x){
        return right(10)
    }else{
        return left('Error')
    }
}
test('succss result', () =>{
    const result = doSomething(true)


    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
})
test('Error result', () =>{
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
})