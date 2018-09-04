# RxRs - Reactive Responsive

A library enabling the easy use of reactive responsive design in any project!

The idea behind responsive reactive design is that we should stop writing media queries in our css and move that management to our JS. The benifits for doing this include gains in readability, maintainability, testability, and performance.


### installation

```bash
npm install rxrs

# or

yarn add rxrs
```

### Usage

To use RxRs you will want to establish what breakpoints you want in your app (media queries). Then I would reccomend tying RxRs into your frameworks DI engine. Other wise you can create a service class to manage access to RxRs. You just will want to treat RxRs as a singleton.

```js
// Your service class
import { RxRs } from 'rxrs';

export ServiceClass {
  rxrs: RxRs;

  constructor() {
    // Create an instance of RxRs.
    // If your JS framework provides DI you can tie RxRs directly into it.
    this.rxrs = new RxRs();
  }

}
```

The key behind RxRs is the RxJs Observable. So what happens is you call the observe function on RxRs with a media query and subscribe to the result.

```js
const small = rxrs.observe('(max-width: 480px)'); // returns an Observable<boolean>

small.subscribe((mediaQueryMatched) => {
  // This will return true anytime the query is matched and
  // false anytime it is not mached
  console.log(mediaQueryMatched);
})
```