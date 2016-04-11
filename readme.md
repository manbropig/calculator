# Angular Calculator

To run this application, ensure you have grunt-cli installed globally and `npm install`.

Once that is complete, you can type `grunt` into the terminal and navigate to localhost:8080 in your browser to see the calculator running.

To run the tests, simply run `grunt test` in the terminal.

### Notes
* For the most part, the directives only handle view logic and defer business logic to the Calculator Class as much as possible.


* I chose to keep the Symbols Array as an Angular Constant so that all parts of the code could have access to those arrays if they needed, and we could keep the code DRY


* I chose to have a Calculator Class to handle all of the business logic and to try to keep controllers as slim as possible.
 * This could also come in handy if we wanted more than one Calculator on screen.


* Clicking an operation key after entering a full calculation will, like the iOS app, show the result of the completed calculation.
 * i.e. clicking 'x' after previously entering '3+5' will result in the monitor showing '8'.
 * entering another number and then the '=' or another operation key will then show the result of 8 * whatever number you enter next.


* Like the iOS app, 'changing your mind' after selecting an operation will override whatever operation you previously selected.
 * i.e. if you select '3' then '+' then 'x' then '2' then '=', the result will be (3x2) '6'.


* Selected Clear ('C') will act like the iOS app in that it will clear the last number entered if pressed after entering a number.
 * i.e. if you enter '3+4' then 'C' then '5' you will be calculating '3+5'.




### What's left
There are some parts we still have yet to implement such as:
* Highlighting the selected operation.
  * This can be done in the calculator directive.
  * If an operation key is clicked, the calculator directive can $broadcast an event to all of the ops keys identifying which one should be highlighted.
  * Each ops key would have an ng-class directive in the html along the lines of ng-class="{selected: iAmSelected}"
  * the .selected class would have a different color border.


* A nicer looking +/- button
  * I looked for an icon like the iOS in Font Awesome but couldn't find one.
 * Once found this icon could just be placed in with unicode and ng-html-bind
 * Otherwise we could conditionally style the button's content with the normal test '+/-'.


* Better styled borders
 * We could definitely do a better job making the borders look just like the iOS app.


* Handle user input through the (computer) keyboard
 * The iOS app allows the user to type into the keyboard.
 * To handle this, the calculator directive would:
   * listen for ng-keypress
   * create a 'key' based on the key that was pressed
   * call calculator.process(key), where 'key' is the key that was created from the key that was pressed
   * This should be relatively straightforward since all of the logic is in the Calculator Class.


* Division by 0 currently returns 'infinity' while the iOS app will return 'Not a number'.
 * To handle this, we could check for the string '/0' when processing a key and setting calculator.currNum to 'Not a number' instead of allowing it to be set to infinity.


* More test coverage!
  * We pretty much only have test coverage for the Calculator class. This is simply do to the amount of time I had. I didn't realize how booked my schedule would become over the week!


* The Calculator.processOp function is some messy code that needs to be cleaned up!
