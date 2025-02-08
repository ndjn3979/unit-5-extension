// const board = document.querySelector('#board');

class Caterpillar {
    // Class = we can work with Caterpillar to create a (pending growth) div
    constructor (board){
        this.node = document.createElement('div')
        this.node.setAttribute('id', 'caterpillar')
        this.node.style.position = 'absolute';
        this.node.style.top = '0px'; // Place it at the top of the page or container
        this.node.style.left = '0px'; // Place it at the left of the page or container
        this.node.style.zIndex = '1000'; // To make sure it's on top of other elements
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

        
        this.getWord = this.getSelectPos.bind(this)
        this.teleport = this.moveTo.bind(this)
        this.feast = this.eatWord.bind(this)

        /*
        // Originally, we had the caterpillar move manually via keyboard
        this.boundMove = this.move.bind(this);  
        this.currentDirection = 'right'
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

    // move() = show the Caterpillar move forward as it eats 
    // (should be outside the constructor)
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
    */

    // When a user selects text by clicking and dragging with the mouse, 
    // we can capture the selection on the mouseup event.
    window.addEventListener("mouseup", () => {
      const selectionInfo = this.getWord()
      if (selectionInfo && selectionInfo.text.trim()) {
        console.log("Selected text:", selectionInfo.text);
        // For debugging: draw a border around the selected area
        // We may want to use this information to position the caterpillar
        this.moveTo(selectionInfo.left, selectionInfo.top, () => {
          this.eatWord(selectionInfo);
        });
      }
    });

    } // end of constructor definition

    // helper function to get the position
    getSelectPos() {
      //  window.getSelection() lets us access the selected text and its Range 
      const selection = window.getSelection();
      if (selection.rangeCount === 0) return null;
      //  which we can use to get its position
      const range = selection.getRangeAt(0);
      // https://developer.mozilla.org/en-US/docs/Web/API/Range/getBoundingClientRect
      const rect = range.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        text: selection.toString()
      };
    }

    // helper function for automatically moving the caterpillar towards the chosen word
    // once the caterpillar reaches the destination word, this function will execute eatWord()
    moveTo(targetX, targetY, callback) {
      const stepSize = 5; // Move 5px at a time
      const totalWidth = 60;
      // Calculate the adjusted targetX so the caterpillar will move to the left of the word
    const adjustedTargetX = targetX - totalWidth;

    const interval = setInterval(() => {
        let currentX = Number(this.node.style.left.replace('px',''));
        let currentY = Number(this.node.style.top.replace('px',''));

        // Move towards the target position
        if (currentX < adjustedTargetX) currentX += stepSize;
        if (currentX > adjustedTargetX) currentX -= stepSize;
        if (currentY < targetY) currentY += stepSize;
        if (currentY > targetY) currentY -= stepSize;

        // Update the position of the caterpillar container
        this.node.style.left = `${currentX}px`;
        this.node.style.top = `${currentY}px`;

        // Stop when reaching the target
        if (Math.abs(currentX - adjustedTargetX) <= stepSize && Math.abs(currentY - targetY) <= stepSize) {
            clearInterval(interval); // Stop the animation
            this.node.style.left = `${adjustedTargetX}px`;
            this.node.style.top = `${targetY}px`;
            if (callback) callback();
        }
    }, 30); // Move every 30ms
}

    eatWord(selectionInfo) {
      // Find the text node containing the word.
      const range = window.getSelection().getRangeAt(0);
      const textNode = range.startContainer;
      const originalText = textNode.textContent;
      
      // Find where the selected word is within the text node.
      const selectedWord = selectionInfo.text;
      const startIndex = originalText.indexOf(selectedWord);
      if (startIndex === -1) return; // safety check
  
      let currentWord = selectedWord;
      
      const eatInterval = setInterval(() => {
        if (currentWord.length === 0) {
          clearInterval(eatInterval);
        } else {
          // Remove one character (for example, the first character)
          currentWord = currentWord.substring(1);
          // Rebuild the text: before, current word (eaten part missing), and after.
          const newText =
            originalText.substring(0, startIndex) +
            currentWord +
            originalText.substring(startIndex + selectedWord.length);
          textNode.textContent = newText;
        }
      }, 1000); // Adjust timing as needed (1000ms per character)
      // and given a set period of time, it will delete one <char> in the <string>
    }
} // end of Class definition

/* Debugging with index.html
console.log(board)
console.log(typeof(board))
new Caterpillar(board)
*/

const board = document.body; // Use `document.body` if there's no `#board`
new Caterpillar(board)

        
        // transform() = final stage = turns into a butterfly
    // new Class of Butterfly, which will have a fly() method
        // eventually, the Butterfly should fly off screen in a pretty manner
        // optional: create a new Caterpillar class (after a certain period of time / manual input)
// once it eats 3 (placeholder) <char>, the Caterpillar will grow in width and height
