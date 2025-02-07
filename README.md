- an extension that showed bugs crawling across the screen
- kinda reminds me of a Bug's Life
        - hungry caterpillar
        - can use similar code from Snake to have the caterpillar slowly eat away at the webpage's random words
            - we can control the caterpillar to move it / get it to start eating the words
            - optional: as moves, its back should arch up and down
        - once it eats enough words, it can grow wings and fly away
            - caterpillar can start as a small head + small body parts
            - as it eats, it can grow larger and maybe also have additional body parts
            - wings?


// Class = we can work with Caterpillar to create a (pending growth) div
    // different methods we need 
        // grow() = grow the body of the Caterpillar
        // move() = show the Caterpillar move forward as it eats
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