// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import { BehaviorSubject, Observable } from 'rxjs';

export default class RxRs {
  private topWindow: Window;
  private windowSizeSubjects: SizeSubjects = {};

  constructor() {
    this.topWindow = this.getWindow();
  }

  observe(query: string): Observable<boolean> {
    const querystring = this.uglifyQuery(query);
    let subject = this.windowSizeSubjects[querystring];

    if (!subject) {
      const mql = this.topWindow.matchMedia(query);
      this.windowSizeSubjects[querystring] = new BehaviorSubject(mql.matches);
      mql.addListener(this.testQuery);
      subject = this.windowSizeSubjects[querystring];
    }

    return subject.asObservable();
  }

  private uglifyQuery(query: string): string {
    return query.toLowerCase().replace(/\s/g, '');
  }

  private testQuery(e: any): void {
    const subject = this.windowSizeSubjects[this.uglifyQuery(e.media)];
    if (subject) {
      subject.next(e.matches);
    }
  }

  private getWindow(): Window {
    return window.top;
  }

  // var mql = window.matchMedia('(max-width: 600px)');

  // function screenTest(e) {
  //   if (e.matches) {
  //     /* the viewport is 600 pixels wide or less */
  //     console.log('This is a narrow screen — less than 600px wide.');
  //   } else {
  //     /* the viewport is more than than 600 pixels wide */
  //     console.log('This is a wide screen — more than 600px wide.');
  //   }
  // }

  // mql.addListener(screenTest);
}

interface SizeSubjects {
  [key: string]: BehaviorSubject<boolean>;
}
