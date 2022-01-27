const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of alejandro', () =>{
    const result = palindrome('alejandro')

    expect(result).toBe('ordnajela')
})

test.skip('palindrome of empty string', () =>{
    const result = palindrome('')

    expect(result).toBe('')
})

test.skip('palindrome of undefined', () =>{
    const result = palindrome()

    expect(result).toBeUndefined()
}) 