export const fizzbuzz = (input : number) => {
    if (input % 3 == 0 && input % 5 == 0){
        return "fizzbuzz"
    }else if (input % 3 == 0 && input % 5 != 0) {
        return "fizz"
    }else if (input % 3 != 0 && input % 5 == 0) {
        return "buzz"
    }else{
        return "How can you lose at life?!"
    }
};

//console.log(fizzbuzz(5));