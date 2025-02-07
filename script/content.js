// const body = document.querySelector("body");
// // `document.querySelector` may return null if the selector doesn't match anything.
// if (body) {
//   const text = body.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);

//   const cat = new Caterpillar()
//   // matchAll returns an iterator, convert to array to get word count  
// }

const board = document.querySelector('#board');

class Caterpillar {
    // Class = we can work with Caterpillar to create a (pending growth) div
    constructor (board){
        this.node = document.createElement('div')
        this.node.setAttribute('id', 'caterpillar')
        this.node.style.position = 'relative';
        this.currentDirection = 'right'
        // three separate body parts to be appended to line 12
        const head = document.createElement('div')
        head.setAttribute('id', 'head')
        head.style.width = '20px'
        head.style.height = '20px'
        head.style.position = 'absolute'
        head.style.backgroundColor = 'red'
        head.style.top = '0px';
        head.style.left = '40px';

        const belly = document.createElement('div')
        belly.setAttribute('id', 'belly')
        belly.style.width = '20px'
        belly.style.height = '20px'
        belly.style.position = 'absolute' 
        belly.style.backgroundColor = 'green'
        belly.style.top = '0px';
        belly.style.left = '20px';

        const tail = document.createElement('div')
        tail.setAttribute('id', 'tail')
        tail.style.width = '20px'
        tail.style.height = '20px'
        tail.style.position = 'absolute'
        tail.style.backgroundColor = 'yellow'
        this.node.style.top = '0px';
        this.node.style.left = '0px';

        this.node.append(head, belly, tail)
        board.appendChild(this.node)

        this.node.style.top = '0px';
        this.node.style.left = '0px';

        this.boundMove = this.move.bind(this);

        window.addEventListener("keydown", (event) => {
            switch (event.key) {
              case "ArrowLeft":
                this.currentDirection = 'left'
                console.log("Left was pressed")
                break;
              case "ArrowDown":
                this.currentDirection = 'down'
                console.log("Down was pressed")
                break;
              case "ArrowRight":
                this.currentDirection = 'right'
                console.log("Right was pressed")
                break;
              case "ArrowUp":
                this.currentDirection = 'up'
                console.log("Up was pressed")
                break;
            }
            this.boundMove()
    }) 

    } // end of constructor definition

    // grow() = grow the body of the Caterpillar
    // grow() {

    // }

    // move() = show the Caterpillar move forward as it eats
    // we will use our directional arrow keys to move the caterpillar around the webpage
    // press directional arrow to move the caterpillar by 20px
    // we should define a border area that the caterpillar cannot get out of
    move() {
        const head = document.querySelector('#head')
        const belly = document.querySelector('#belly')
        const tail = document.querySelector('#tail')
        const caterpillar = [head, belly, tail]
        const direction = this.currentDirection
        for (let i=0; i<caterpillar.length; i++) {
            let leftPos = Number(caterpillar[i].style.left.replace('px', ''))
            let topPos = Number(caterpillar[i].style.top.replace('px', ''))
            if (direction === 'right') leftPos += 10;
            if (direction === 'left') leftPos -= 10;
            if (direction === 'down') topPos += 10;
            if (direction === 'up') topPos -= 10;
            caterpillar[i].style.top = `${topPos}px`;
            caterpillar[i].style.left = `${leftPos}px`;
        }
    }
} // end of Class definition

    

console.log(board)
console.log(typeof(board))
new Caterpillar(board)   

        // eat() = depending on the key pressed (i.e. "e"), prompts the Caterpillar to start eating the word next to it
            // user should be able to click on a specific word to designate the <string> to be eaten
        // transform() = final stage = turns into a butterfly
    // new Class of Butterfly, which will have a fly() method
        // eventually, the Butterfly should fly off screen in a pretty manner
        // optional: create a new Caterpillar class (after a certain period of time / manual input)

// We will use DOM manipulation to place that Caterpillar inline with a <p> or a similar <div> that contains words

// Once we prod the Caterpillar with a keyboard button, the Caterpillar will eat one word at a time
// maybe we can even add a motion to show munching

// and given a set period of time, it will delete one <char> in the <string>

// once it eats 3 (placeholder) <char>, the Caterpillar will grow in width and height
// modeling after "The Very Hungry Caterpillar"
// I want it to have a red head and green body and yellow feet