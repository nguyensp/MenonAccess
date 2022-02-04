# Menon Labs x CommonLit: A Mobile Application for Millions of Users in Latin America

https://expo.dev/@psngyn/CommonLit

Last Progress Snapshot:\
![](Menon_Progress.gif)
 
Hey Paul, just a heads up: I divided up the remaining features we could build into a list of priorities so that it's a little easier to get a sense of what to build next.

I've got the list down below split it up into three sections. As long as the first section is done, we'll have a very functional app that meets all the main requirements. If you want to pursue some of the features in the other two sections, feel free to. But if you're limited at all on time and energy, the most essential stuff for the completeness of the app is basically just the first two features of the first section.

Priorities for Development

////    Essential Stuff    ////

1. Backend That Stores Basic Event Logs (Maybe Firebase or Maybe Google Sheets)
Some backend database that we can essentially put aggregation counts for a certain event occurring across users using the app. For example, this database could have a field to track the number of times that any user has downloaded a given book. This works as a starting point for giving CommonLit analytics that it can use to keep track of how many people read each book.

2. Implementing the UI on to the Existing Components
This is just translating some of the design from the Figma into the actual end product (apologies for being a bit slow on translating the design files to a stylesheet, it's still a work in progress on my end)

3. Passage Tracking (unsure if this is redundant)
This would be an add-on to the reading view. Every word or paragraph should be associated with some number such that we can tell when a user has scrolled through 50% of a book, for example. This allows us to implement two other important features.

4. Return to Last Read Passage
This feature essentially means that even if a user has completely closed the app, their last location in the text should be saved temporarily so that users open up to that spot if they reopen that text again.


< At this point, we would have some rough, imperfect way to track the number of readers per text (one of CommonLit's needs). We would also have a working UI that makes it easy for students and teachers to find texts, read them, and return to them after exiting and reopening the app >



////    Really Good Stuff    ////

5. Event that confirms that a user has read a majority of a text and pings our backend
This feature essentially links (1)  and (2) together so that CommonLit can know when someone has actually completed reading a text rather than just downloading it or opening it one time and not reading it.

6. Implement Questions UI
Add the design UI to the comprehension questions associated with the text as well (it doesn't have to be super high fidelity, just formatted question and answer choices that light up green or red based on correctness)


< At this point, we would have a very accurate count of how many readers read each text (a key CommonLit need) and we would have the additional comprehension questions and all the main aspects of the full website experience >



////    Extra Stuff That Would Go Above and Beyond    ////

7. Set Up Deep Linking
Add a feature where someone could generate a link that if sent to another user, would cause the app to open up to a specific book specified in the link.

8. Add a Share Text Button
Add a button to the read view menus that allow someone to generate and copy a Deep Link to the same text. This is so that teachers and fellow students can share specific texts to read with each other over commonly used apps like WhatsApp.

9. Add a Highlight and Share Passage Feature
Add a feature where if users select some reading text, they have an option to "share the passage" and get a deep link. The deep link should allow another CommonLit app user to immediately navigate to the same text and the same passage by clicking the link.

10. Add a Fallback Option for Deep Links on Phones Without the App
Edit both deep link sharing features such that if a phone does not have the CommonLit app, they are still directed to the same text and (possibly) passage on the CommonLit mobile website.


< If we do manage to get this done, then our app will actually be uniquely useful for teachers rather than just another reading app. This one would directly address one of the big needs that CommonLit's team brought up during the Friday user test. This would probably differentiate us heavily from any other team, but it's also the most "nice to have" feature and would take a lot of time >
