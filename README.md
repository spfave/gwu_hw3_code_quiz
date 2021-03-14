# **JavaScript Code Quiz**
![HTML](https://img.shields.io/badge/Uses-HTML-red.svg)
![CSS](https://img.shields.io/badge/Uses-CSS-blue.svg)
![JS](https://img.shields.io/badge/Uses-JS-yellow.svg)

&nbsp;
## **Description**
JavaScript Code Quiz serves up a timed knowledge assessment on JavaScript coding fundamentals. A user's quiz score is based on the number of questions they get correct and the time remaining upon their completion. User scores are saved to local storage and remain available for review until clear by a user.

The website is created with HTML and styled using the Bootstrap front-end toolkit plus additional custom CSS. JavaScript Code Quiz's dark theme is provided using the [free bootstrap theme darkly](https://bootswatch.com/darkly/). The site's dark theme is accented using [official JavaScript yellow](https://github.com/colorjs/javascript-yellow#:~:text=javascript-yellow%20The%20official%20color,of%20the%20JavaScript%20logo).

Site functionality exists across three pages. The landing (root/index) page, a quiz page, and the high scores page. From the landing page a user can start a new quiz or view the saved high scores from previous tries. The quiz page includes all logic to route a user through a series of JavaScript coding questions and submit their final score. The question and answer choices are dynamically changed in the HTML to cycle the user through the list of quiz questions. Upon an answer selection the user is provided another question and is shown an indication if their response to the previous question was correct or incorrect. The quiz completes when the user has answered all questions or if the quiz timer runs out, whichever comes first. With completion of the quiz the user can provide their initials and submit their quiz score to the high scores page or can try again for an improved score. The high scores page displays a table view of submitted user scores containing user initials, their quiz score, and additional information on their quiz performance. From the high scores page a user can return to the landing page or clear all saved scores. 


&nbsp;
## **[Live Application](https://spfave.github.io/javascript-code-quiz/)**

Demo interaction \
![Demo javaScript Code Quiz picture](./assets/img/demoshot_JS_quiz.png)


&nbsp;
## **Technologies and Services**
Web Technologies
- HTML5, CSS, and JavaScript
- Local and Session Storage
- Array sort method

External Services
- [Bootstrap](https://getbootstrap.com/) v4.6 for styling elements
- [Bootswatch Darkly Theme](https://bootswatch.com/darkly/) bootstrap theme
- [flaticon](https://www.flaticon.com/) vector icons (favicon)