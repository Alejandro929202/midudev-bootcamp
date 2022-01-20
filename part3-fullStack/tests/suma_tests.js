const suma = (a, b) => {
    return a - b
}

console.assert(
    suma(1,3) === 4,
    'Suma of 1 and 3 expected to be 4'
)

console.assert(
    suma(0,0) === 0,
    'Suma of 0 and 0 expected to be 0'
)